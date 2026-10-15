import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as request from 'supertest';
import { AuthController } from '../src/auth/auth.controller';
import { AuthService } from '../src/auth/auth.service';
import { AuthGuard } from '../src/auth/auth.guard';
import { NoticesController } from '../src/notices/notices.controller';
import { NoticesService } from '../src/notices/notices.service';
import { User } from '../src/schemas/users/user.schema';
import { validateEnv } from '../src/config/env.validation';

const EMAIL = 'admin@example.com';
const PASSWORD = 'correct-horse-battery';

describe('Authentication and write protection', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const user = {
      id: 'u1',
      name: 'Admin',
      email: EMAIL,
      password: await bcrypt.hash(PASSWORD, 4),
    };
    const userModel = {
      findOne: ({ email }: { email: string }) => ({
        exec: async () => (email === EMAIL ? user : null),
      }),
      findById: () => ({ exec: async () => user }),
    };

    const moduleRef = await Test.createTestingModule({
      imports: [JwtModule.register({ global: true, secret: 'x'.repeat(48), signOptions: { expiresIn: '1h' } })],
      controllers: [AuthController, NoticesController],
      providers: [
        AuthService,
        { provide: ConfigService, useValue: { get: (_k: string, d?: string) => d } },
        { provide: getModelToken(User.name), useValue: userModel },
        { provide: NoticesService, useValue: { findAll: async () => [], create: async () => ({}), remove: async () => ({}) } },
        { provide: APP_GUARD, useClass: AuthGuard },
      ],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();

    const res = await request(app.getHttpServer()).post('/auth/login').send({ email: EMAIL, password: PASSWORD });
    token = res.body.accessToken;
  });
  afterAll(() => app.close());

  const http = () => request(app.getHttpServer());

  describe('login', () => {
    it('returns a token and the user for the right credentials', async () => {
      const res = await http().post('/auth/login').send({ email: EMAIL, password: PASSWORD }).expect(200);
      expect(res.body.accessToken).toEqual(expect.any(String));
      expect(res.body.user).toEqual({ name: 'Admin', email: EMAIL });
      expect(res.body.password).toBeUndefined();
    });
    it('uses the same message for a wrong password and an unknown email', async () => {
      const wrong = await http().post('/auth/login').send({ email: EMAIL, password: 'nope-nope-nope' }).expect(401);
      const unknown = await http().post('/auth/login').send({ email: 'x@example.com', password: PASSWORD }).expect(401);
      expect(wrong.body.message).toBe(unknown.body.message);
    });
    it('rejects object injection and malformed bodies', async () => {
      await http().post('/auth/login').send({ email: { $gt: '' }, password: { $gt: '' } }).expect(400);
      await http().post('/auth/login').send({}).expect(400);
      await http().post('/auth/login').send({ email: EMAIL, password: 'x'.repeat(500) }).expect(400);
    });
  });

  describe('guard', () => {
    it('lets anyone read', () => http().get('/notices').expect(200));
    it('blocks writes without a token', async () => {
      await http().post('/notices').field('title', 'x').expect(401);
      await http().delete('/notices/1').expect(401);
    });
    it('blocks writes with a bad or foreign token', async () => {
      await http().delete('/notices/1').set('Authorization', 'Bearer not.a.token').expect(401);
      await http().delete('/notices/1').set('Authorization', `Basic ${token}`).expect(401);
    });
    it('allows writes with a valid token', () =>
      http().delete('/notices/1').set('Authorization', `Bearer ${token}`).expect(200));
    it('protects /auth/me even though it is a GET', async () => {
      await http().get('/auth/me').expect(401);
      const res = await http().get('/auth/me').set('Authorization', `Bearer ${token}`).expect(200);
      expect(res.body).toEqual({ name: 'Admin', email: EMAIL });
    });
  });
});

describe('environment validation', () => {
  const good = { MONGO_URI: 'mongodb://x', JWT_SECRET: 'a'.repeat(40) };
  it('accepts a minimal valid environment', () => expect(() => validateEnv(good)).not.toThrow());
  it('requires MONGO_URI and a long JWT_SECRET', () => {
    expect(() => validateEnv({})).toThrow(/MONGO_URI/);
    expect(() => validateEnv({ ...good, JWT_SECRET: 'short' })).toThrow(/JWT_SECRET/);
  });
  it('requires a strong ADMIN_PASSWORD with an email', () => {
    expect(() => validateEnv({ ...good, ADMIN_PASSWORD: 'short', ADMIN_EMAIL: 'a@b.co' })).toThrow(/12 characters/);
    expect(() => validateEnv({ ...good, ADMIN_PASSWORD: 'long-enough-password' })).toThrow(/ADMIN_EMAIL/);
  });
  it('requires BASE_URL and CORS_ORIGINS in production', () => {
    expect(() => validateEnv({ ...good, NODE_ENV: 'production' })).toThrow(/CORS_ORIGINS/);
    expect(() => validateEnv({ ...good, NODE_ENV: 'production', BASE_URL: 'https://api.x.com', CORS_ORIGINS: 'https://x.com' })).not.toThrow();
  });
});
