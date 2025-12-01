import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PizzasService } from './pizzas/pizzas.service';
import { CreatePizzaDto } from './pizzas/dto/create-pizza.dto';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const pizzasService = app.get(PizzasService);

  const pizzas: CreatePizzaDto[] = [
    { nombre: 'Muzzarella', descripcion: 'Clásica con queso', precio: 13500, imagen: './imagenes/muzzarella.png' },
    { nombre: 'Calabresa', descripcion: 'Con salame picante', precio: 16900, imagen: './imagenes/calabresa.png' },
    { nombre: 'Tomate y Oliva', descripcion: 'Fresca con aceitunas', precio: 15000, imagen: './imagenes/aceituna y tomate.png' },
    { nombre: 'Champignones', descripcion: 'Con hongos salteados', precio: 20000, imagen: './imagenes/champignones.png' },
    { nombre: 'Cuatro Quesos', descripcion: 'Mezcla de quesos premium', precio: 25000, imagen: './imagenes/cuatroquesos.png' },
    { nombre: 'Hawaiana', descripcion: 'Con jamón y ananá', precio: 23000, imagen: './imagenes/Hawaiana.png' },
    { nombre: 'Especial Jamón', descripcion: 'Jamón cocido y mozzarella', precio: 22000, imagen: './imagenes/jamon.png' },
    { nombre: 'Pollo', descripcion: 'Con pollo grillado', precio: 21000, imagen: './imagenes/pollo.png' },
    { nombre: 'Tomate y Rúcula', descripcion: 'Fresca y liviana', precio: 20000, imagen: './imagenes/tomate y rucula.png' },
    { nombre: 'Vegetariana', descripcion: 'Con vegetales salteados', precio: 19000, imagen: './imagenes/vegetariana.png' },
    { nombre: 'Fugazzeta', descripcion: 'Con cebolla y queso', precio: 13900, imagen: './imagenes/figazzeta.png' },
    { nombre: 'Langostino', descripcion: 'Con mariscos premium', precio: 28000, imagen: './imagenes/langostino.png' },
  ];

  for (const pizza of pizzas) {
    try {
      await pizzasService.create(pizza);
      console.log(`✅ Pizza creada: ${pizza.nombre}`);
    } catch (error) {
      console.error(`❌ Error al crear pizza ${pizza.nombre}`, error.message);
    }
  }

  await app.close();
}

bootstrap();
