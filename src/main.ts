import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middleware manual para CORS
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Origin',
      'https://tp-finalfrotend.vercel.app',
    );
    res.header(
      'Access-Control-Allow-Methods',
      'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    );
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
      return res.sendStatus(200); // 👈 responde al preflight
    }
    next();
  });

  await app.listen(parseInt(process.env.PORT ?? '3000'));
}
void bootstrap();
