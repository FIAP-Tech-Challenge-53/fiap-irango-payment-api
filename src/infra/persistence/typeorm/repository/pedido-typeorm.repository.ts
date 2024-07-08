import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import PedidoDto from '@/core/domain/dto/output/pedido.dto'
import Pedido from '@/core/domain/entities/pedido'
import PedidoMapper from '@/core/domain/mappers/pedido.mapper'
import IPedidoRepository from '@/core/domain/repositories/ipedido.repository'
import { Pedido as Entity } from '@/infra/persistence/typeorm/entities/pedido'

@Injectable()
export default class PedidoTypeormRepository implements IPedidoRepository {
  constructor (
    @InjectRepository(Entity) private readonly repository: Repository<Entity>
  ) {}

  async create (input: Pedido): Promise<Pedido> {
    let model = PedidoMapper.toDto(input)
    model = await this.repository.save(model)

    return PedidoMapper.toDomainEntity(model as PedidoDto)
  }

  async save (input: Pedido): Promise<Pedido> {
    let model = PedidoMapper.toDto(input)

    model = await this.repository.save(model)

    return PedidoMapper.toDomainEntity(model as PedidoDto)
  }
}
