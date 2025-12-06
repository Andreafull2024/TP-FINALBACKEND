// eslint-disable-next-line prettier/prettier
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Pedido } from 'src/pedidos/entities/pedido.entity';

@Entity()
export class Pago {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  monto: number;

  @Column({ type: 'timestamp' })
  fecha: Date;

  // eslint-disable-next-line prettier/prettier
  @ManyToOne(() => Pedido, pedido => pedido.pago, { eager: true })
  pedido: Pedido;
}
