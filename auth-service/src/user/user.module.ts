import { Module } from '@nestjs/common';
import { AuthController } from './user.controller';
import { AuthService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ // ✅ BU YERGA JOYLANADI!
    ConfigModule.forRoot({ isGlobal: true }), // <--- ENV faylni avtomatik yuklaydi
    MongooseModule.forRoot(process.env.MONGO_URI), // MongoDB ga ulanish
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class UserModule {}
