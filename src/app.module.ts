import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PedidosModule } from './pedidos/pedidos.module';
import { PagosModule } from './pagos/pagos.module';
import { ClientesModule } from './clientes/clientes.module';
import { EstadoPedidoModule } from './estado_pedido/estado_pedido.module';
import { DetallePedidoModule } from './detalle_pedido/detalle_pedido.module';
import { PizzasModule } from './pizzas/pizzas.module';
import { PersonalizarPizzasModule } from './personalizar-pizzas/personalizar-pizzas.module';

@Module({
  imports: [
    // ConfigModule lee el archivo .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // TypeORM usa las variables de entorno
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST') ?? 'localhost',
        port: parseInt(config.get<string>('DB_PORT') ?? '3306'),
        username: config.get<string>('DB_USER') ?? 'root',
        // eslint-disable-next-line prettier/prettier
        password: config.get<string>('DB_PASSWORD') ?? '',
        database: config.get<string>('DB_NAME') ?? 'test',

        autoLoadEntities: true,
        synchronize: true, // ⚠️ solo para desarrollo
        ssl: {
          rejectUnauthorized: false, // Railway usa SSL, esto evita errores de certificado
        },
      }),
    }),

    // Tus módulos
    PedidosModule,
    PagosModule,
    ClientesModule,
    EstadoPedidoModule,
    DetallePedidoModule,
    PizzasModule,
    PersonalizarPizzasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
