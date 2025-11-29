/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middleware para forzar CORS
  app.use((req, res, next) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    res.header('Access-Control-Allow-Origin', 'https://tp-finalfrotend.vercel.app');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    res.header('Access-Control-Allow-Credentials', 'true');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (req.method === 'OPTIONS') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return res.sendStatus(200);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    next();
  });

  await app.listen(parseInt(process.env.PORT ?? '3000'));
}
void bootstrap();
