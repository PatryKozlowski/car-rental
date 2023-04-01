import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });

  app.enableCors({
    credentials: true,
    origin: process.env.PUBLIC_URL,
  });
  app.setGlobalPrefix('api/v1');

  try {
    await app.listen(PORT, () => console.log(`Rentals car API on ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
