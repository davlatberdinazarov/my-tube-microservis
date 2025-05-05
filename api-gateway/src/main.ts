import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 3001, // API Gateway TCP porti
    },
  });


  await app.startAllMicroservices();
  await app.listen(process.env.PORT); // HTTP REST API
  console.log(`API Gateway is listening on port ${process.env.PORT}`);
}
bootstrap();
