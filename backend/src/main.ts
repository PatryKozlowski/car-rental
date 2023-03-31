import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap(): Promise<void> {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });

  app.enableCors({
    credentials: true,
    origin: process.env.PUBLIC_URL,
  });
  app.use(cookieParser());
  app.setGlobalPrefix('api/v1');

  try {
    await app.listen(PORT, () => console.log(`Rentals car API on ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
