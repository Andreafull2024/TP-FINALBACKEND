import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'https://tp-finalfrotend.vercel.app', // 👈 dominio de tu frontend en Vercel
    ],
    credentials: true,
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
