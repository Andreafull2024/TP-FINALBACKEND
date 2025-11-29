/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middleware para forzar CORS en todas las rutas
  app.use((req, res, next) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.setHeader(
      'Access-Control-Allow-Origin',
      'https://tp-finalfrotend.vercel.app',
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization',
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (req.method === 'OPTIONS') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      res.status(200).end(); // 👈 responde correctamente al preflight
    } else {
      next();
    }
  });

  await app.listen(parseInt(process.env.PORT ?? '3000'));
}
void bootstrap();
