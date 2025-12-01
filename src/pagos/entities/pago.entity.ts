import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Pedido } from '../../pedidos/entities/pedido.entity';

@Entity()
export class Pago {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  metodo: string;

  @Column()
  monto: number;

  @OneToOne(() => Pedido, (pedido) => pedido.pago, { onDelete: 'CASCADE' })
  @JoinColumn()
  pedido: Pedido;
}
