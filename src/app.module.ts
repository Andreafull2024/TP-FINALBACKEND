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
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: 'mysql',
    host: config.get<string>('DB_HOST'),
    port: parseInt(config.get<string>('DB_PORT')),
    username: config.get<string>('DB_USER'),
    password: config.get<string>('DB_PASSWORD'),
    database: config.get<string>('DB_NAME'),
    autoLoadEntities: true,
    synchronize: true, // ⚠️ solo en desarrollo

    ssl: {
      rejectUnauthorized: false,
    },
  }),
}),


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
