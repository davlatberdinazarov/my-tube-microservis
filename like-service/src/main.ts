import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const port = parseInt(process.env.LIKES_PORT || '0', 10);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: port, // bu gatewaydagi AUTH_SERVICE portiga mos bo'lishi kerak
    },
  });

  await app.listen();
  console.log(`Likes microservice is listening... on port ${port}`);
}
bootstrap();
