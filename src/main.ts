import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'https://tp-finalfrotend.vercel.app', // tu frontend en Vercel
      'http://localhost:5173'// tu frontend en desarrollo
    ],
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT || 8080);
}
void bootstrap();
