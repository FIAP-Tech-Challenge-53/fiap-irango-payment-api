import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import PagamentoDto from '@/core/domain/dto/output/pagamento.dto'
import Pagamento from '@/core/domain/entities/pagamento'
import PagamentoMapper from '@/core/domain/mappers/pagamento.mapper'
import IPagamentoRepository from '@/core/domain/repositories/ipagamento.repository'
import { Pagamento as Entity } from '@/infra/persistence/typeorm/entities/pagamento'

@Injectable()
export default class PagamentoTypeormRepository implements IPagamentoRepository {
  constructor (
    @InjectRepository(Entity) private readonly repository: Repository<Entity>
  ) {}

  async create (input: Pagamento): Promise<Pagamento> {
    let model = PagamentoMapper.toDto(input)

    model = await this.repository.save(model)

    return PagamentoMapper.toDomainEntity(model as PagamentoDto)
  }

  async findByPedidoId (pedidoId: number): Promise<Pagamento | undefined> {
    const model = await this.repository.findOne({ where: { pedidoId } })

    return model ? PagamentoMapper.toDomainEntity(model) : undefined
  }

  async save (input: Pagamento): Promise<Pagamento> {
    let model = PagamentoMapper.toDto(input)

    model = await this.repository.save(model)

    return PagamentoMapper.toDomainEntity(model as PagamentoDto)
  }
}
