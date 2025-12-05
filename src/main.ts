import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefijo global opcional (ej. todas las rutas empiezan con /api)
  app.setGlobalPrefix('api');

  // Validación automática de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Configuración de CORS
  app.enableCors({
    origin: [
      'http://localhost:5173',               // desarrollo local con Vite
      'https://pizzaconmigofinal.web.app',   // tu frontend en Firebase
      'https://pizzaconmigofinal.onrender.com', // opcional: si deployás frontend en Render
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], // 👈 métodos permitidos
    credentials: true, // true si necesitás enviar cookies o headers de autenticación
  });

  const port = Number(process.env.PORT) || 3000;
  await app.listen(port);
  console.log(`🚀 Backend corriendo en http://localhost:${port}`);
}
bootstrap();
