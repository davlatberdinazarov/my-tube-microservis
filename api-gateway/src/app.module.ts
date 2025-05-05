import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { VideosController } from './videos/videos.controller';
import { LikesController } from './likes/likes.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 4001 },
      },
      {
        name: 'VIDEO_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 4002 },
      },
      {
        name: 'LIKES_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 4003 },
      },
    ]),
  ],
  controllers: [AuthController, VideosController, LikesController],
})
export class AppModule {}
