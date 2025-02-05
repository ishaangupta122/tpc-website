import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FacultyController } from './faculty.controller';
import { FacultyService } from './faculty.service';
import { Faculty, FacultySchema } from '../schemas/faculty/faculty.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: Faculty.name, schema: FacultySchema }]),
  JwtModule.register({
      secret: process.env.JWT_SECRET || '',
      signOptions: { expiresIn: '1h' }, 
    }),],
  controllers: [FacultyController],
  providers: [FacultyService],
})
export class FacultyModule {}
