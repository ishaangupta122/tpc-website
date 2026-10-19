import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrincipalController } from './principal.controller';
import { PrincipalService } from './principal.service';
import {
  Principal,
  PrincipalSchema,
} from '../schemas/principal/principal.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Principal.name, schema: PrincipalSchema },
    ]),
  ],
  controllers: [PrincipalController],
  providers: [PrincipalService],
})
export class PrincipalModule {}
