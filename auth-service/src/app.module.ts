import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user/entities/user.schema';

@Module({
  imports: [
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
