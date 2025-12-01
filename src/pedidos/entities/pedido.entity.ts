import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { DetallePedido } from '../../detalle_pedido/entities/detalle_pedido.entity';
import { Pago } from '../../pagos/entities/pago.entity';
import { EstadoPedido } from '../../estado_pedido/entities/estado_pedido.entity';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha: Date;

  @Column({ default: 'pendiente' })
  estado: string;

  @ManyToOne(() => Cliente, (cliente) => cliente.pedidos, { onDelete: 'CASCADE' })
  cliente: Cliente;

  @OneToMany(() => DetallePedido, (detalle) => detalle.pedido, { cascade: true })
  detallePedidos: DetallePedido[];

  @OneToOne(() => Pago, (pago) => pago.pedido, { cascade: true })
  @JoinColumn()
  pago: Pago;

  @OneToOne(() => EstadoPedido, (estado) => estado.pedido, { cascade: true })
  @JoinColumn()
  estadoPedido: EstadoPedido; // 👈 faltaba esta línea
}
