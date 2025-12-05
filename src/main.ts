import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Habilitar CORS para tu frontend en Firebase
app.enableCors({
  origin: [
    'http://localhost:5173',                 // desarrollo local
    'https://pizzaconmigofinal.web.app',     // producción en Firebase
  ],
  methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
  credentials: true,
});


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
bootstrap();
