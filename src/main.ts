import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
  origin: [
    'http://localhost:5173',
    'https://tp-finalfrontend-8g1r4ue.vercel.app',
      'https://tp-finalfrontend-l8gbnjwle-andrea-san-juans-projects.vercel.app',
  ],
  credentials: true,
});

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
