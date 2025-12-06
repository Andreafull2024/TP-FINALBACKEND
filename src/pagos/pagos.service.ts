import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pago } from './entities/pago.entity';
import { Repository } from 'typeorm';
import { Pedido } from 'src/pedidos/entities/pedido.entity';

@Injectable()
export class PagosService {
  constructor(
    @InjectRepository(Pago)
    private readonly pagoRepository: Repository<Pago>,
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
  ) {}

  async create(createPagoDto: CreatePagoDto): Promise<Pago> {
    try {
      // Buscar el pedido asociado por ID
      const nuevoPedido = await this.pedidoRepository.findOne({
        where: { id: createPagoDto.pedidoId },
      });
      if (!nuevoPedido) {
        throw new NotFoundException('Pedido no encontrado');
      }

      // Crear el pago con los datos del DTO y asociarlo al pedido
      const nuevoPago = this.pagoRepository.create({
        monto: createPagoDto.monto,
        fecha: createPagoDto.fecha,
        pedido: nuevoPedido,
      });

      return await this.pagoRepository.save(nuevoPago);
    } catch (error) {
      console.error('Error al crear el pago', error);
      throw new InternalServerErrorException('Error al crear pago');
    }
  }

  async findAll(): Promise<Pago[]> {
    return await this.pagoRepository.find({ relations: ['pedido'] });
  }

  async findOne(id: number): Promise<Pago> {
    const pago = await this.pagoRepository.findOne({
      where: { id },
      relations: ['pedido'],
    });
    if (!pago) {
      throw new NotFoundException('Pago no encontrado');
    }
    return pago;
  }

  async update(id: number, updatePagoDto: UpdatePagoDto): Promise<Pago> {
    const pago = await this.pagoRepository.findOneBy({ id });
    if (!pago) {
      throw new NotFoundException('Pago no encontrado');
    }
    const actualizado = Object.assign(pago, updatePagoDto);
    return await this.pagoRepository.save(actualizado);
  }

  async remove(id: number): Promise<void> {
    const pago = await this.pagoRepository.findOne({ where: { id } });
    if (!pago) {
      throw new NotFoundException('Pago no encontrado');
    }
    await this.pagoRepository.remove(pago);
  }
}
