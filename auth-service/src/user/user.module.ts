import { Module } from '@nestjs/common';
import { AuthController } from './user.controller';
import { AuthService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.schema';

@Module({
  imports: [ // ✅ BU YERGA JOYLANADI!
    MongooseModule.forRoot('mongodb://localhost:27017/microservice-auth-service'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class UserModule {}
