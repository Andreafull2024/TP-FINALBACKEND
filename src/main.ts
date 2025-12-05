import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Usar el middleware cors en lugar de app.enableCors
  app.use(
    cors({
      origin: [
        'http://localhost:5173', // desarrollo local
        'https://pizzaconmigofinal.web.app', // producción en Firebase
      ],
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      credentials: true,
    }),
  );
  console.log('✅ CORS aplicado correctamente'); // 👈 Log extra

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const port = Number(process.env.PORT) || 3000;
  await app.listen(port);
  console.log(`🚀 Backend corriendo en http://localhost:${port}`);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
