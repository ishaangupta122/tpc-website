import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../schemas/users/user.schema';

/**
 * Creates the first admin from ADMIN_EMAIL / ADMIN_PASSWORD when that account
 * doesn't exist yet. An existing account is never changed. To reset the
 * password, delete the user document and restart.
 */
@Injectable()
export class AdminSeedService implements OnModuleInit {
  private readonly logger = new Logger(AdminSeedService.name);

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly config: ConfigService,
  ) {}

  async onModuleInit() {
    const email = this.config.get<string>('ADMIN_EMAIL')?.trim().toLowerCase();
    const password = this.config.get<string>('ADMIN_PASSWORD');

    if (!email || !password) {
      if ((await this.userModel.countDocuments()) === 0) {
        this.logger.warn(
          'No admin account exists. Set ADMIN_EMAIL and ADMIN_PASSWORD and restart to create one.',
        );
      }
      return;
    }

    if (await this.userModel.exists({ email })) return;

    await this.userModel.create({
      name: this.config.get<string>('ADMIN_NAME', 'Admin'),
      email,
      password: await bcrypt.hash(password, 12),
    });
    this.logger.log(`Admin account created for ${email}`);
  }
}
