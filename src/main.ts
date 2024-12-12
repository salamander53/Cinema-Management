import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      preflightContinue: false,
      optionsSuccessStatus: 204,
    }),
  );
  await app.listen(process.env.PORT || 8080); // Sử dụng biến môi trường hoặc port 8080
}
bootstrap();
