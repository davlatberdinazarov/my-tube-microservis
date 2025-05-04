import { Module } from '@nestjs/common';
import { AuthController } from './user.controller';
import { AuthService } from './user.service';


@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class UserModule {}