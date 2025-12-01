import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Pedido } from '../../pedidos/entities/pedido.entity';

@Entity()
export class EstadoPedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string; // ejemplo: "pendiente", "en preparación", "entregado"

  @OneToOne(() => Pedido, (pedido) => pedido.estadoPedido, { onDelete: 'CASCADE' })
  pedido: Pedido;
}
