import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user/entities/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://localhost:27017/auth-service`),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
