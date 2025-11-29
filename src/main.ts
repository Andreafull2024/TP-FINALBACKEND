import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middleware para forzar CORS en todas las rutas
  app.use((req, res, next) => {
    res.setHeader(
      'Access-Control-Allow-Origin',
      'https://tp-finalfrotend.vercel.app',
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization',
    );
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
      res.status(200).end(); // 👈 responde correctamente al preflight
    } else {
      next();
    }
  });

  await app.listen(parseInt(process.env.PORT ?? '3000'));
}
void bootstrap();
