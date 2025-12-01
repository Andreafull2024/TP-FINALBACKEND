import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { DetallePedido } from '../../detalle_pedido/entities/detalle_pedido.entity';

@Entity()
export class Pizza {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  precio: number;

  @Column({ default: 0 })
  stock: number;

  @Column()
  imagen: string;

  @Column({ default: 0 })
  demand: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.pizzas, { nullable: true })
  cliente: Cliente;

  @OneToMany(() => DetallePedido, (detalle) => detalle.pizza)
  detallePedidos: DetallePedido[];
}
