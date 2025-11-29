import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔓 CORS configurado para permitir acceso desde tu frontend en Vercel
  app.enableCors({
    origin: 'https://tp-finalfrotend.vercel.app/', // 👈 URL exacta de tu frontend
    credentials: true,
  });

  await app.listen(parseInt(process.env.PORT ?? '3000'));
}
void bootstrap();
