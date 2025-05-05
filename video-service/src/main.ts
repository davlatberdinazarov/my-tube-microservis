import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const port = parseInt(process.env.VIDEO_SERVICE_PORT || "4002");
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: port, // bu gatewaydagi Videos_service portiga mos bo'lishi kerak
    },
  });

  await app.listen();
  console.log(`Videos microservice is listening... on port ${port}`);
}
bootstrap();
