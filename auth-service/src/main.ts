import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 4001, // bu gatewaydagi AUTH_SERVICE portiga mos bo'lishi kerak
    },
  });

  await app.listen();
  console.log('Auth microservice is listening...');
}
bootstrap();
