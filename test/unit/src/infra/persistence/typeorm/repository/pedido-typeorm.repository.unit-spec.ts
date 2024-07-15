import { Repository } from 'typeorm'

import PedidoDto from '@/core/domain/dto/output/pedido.dto'
import Pedido from '@/core/domain/entities/pedido'
import PedidoMapper from '@/core/domain/mappers/pedido.mapper'
import { Pedido as Entity } from '@/infra/persistence/typeorm/entities/pedido'
import PedidoTypeormRepository from '@/infra/persistence/typeorm/repository/pedido-typeorm.repository'

describe('PedidoTypeormRepository class tests', () => {
  let pedidoTypeormRepository:PedidoTypeormRepository

  let repository:jest.Mocked<Repository<Entity>>

  let mockToDto:jest.Mock<any>
  let toDomainEntity:jest.Mock<any>

  beforeEach(() => {
    mockToDto = jest.fn()
    toDomainEntity = jest.fn()

    repository = {
      save: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      find: jest.fn()
    } as unknown as jest.Mocked<Repository<Entity>>

    PedidoMapper.toDto = mockToDto
    PedidoMapper.toDomainEntity = toDomainEntity

    pedidoTypeormRepository = new PedidoTypeormRepository(repository)
  })

  it('constructor class test', async () => {
    expect(pedidoTypeormRepository).toBeInstanceOf(PedidoTypeormRepository)
  })

  it('create method test', async () => {
    const dto:PedidoDto = {
      id: 1,
      consumidorId: '1',
      pagamentoId: '1',
      total: 1,
      createdAt: new Date(1),
      updatedAt: new Date(1)
    }

    const pedido = new Pedido()

    const entity = new Entity()
    entity.consumidorId = '1'
    entity.pagamentoId = '1'
    entity.total = 1
    entity.createdAt = new Date(1)
    entity.updatedAt = new Date(1)

    mockToDto.mockReturnValue(dto)
    toDomainEntity.mockReturnValue(pedido)
    repository.save.mockResolvedValue(entity)

    const result = await pedidoTypeormRepository.create(pedido)
    expect(mockToDto).toHaveBeenCalledTimes(1)
    expect(toDomainEntity).toHaveBeenCalledTimes(1)
    expect(repository.save).toHaveBeenCalledTimes(1)
    expect(mockToDto).toHaveBeenCalledWith(pedido)
    expect(toDomainEntity).toHaveBeenCalledWith(entity)
    expect(repository.save).toHaveBeenCalledWith(dto)
    expect(result).toEqual(pedido)
  })

  it('save method test', async () => {
    const dto:PedidoDto = {
      id: 1,
      consumidorId: '1',
      pagamentoId: '1',
      total: 1,
      createdAt: new Date(1),
      updatedAt: new Date(1)
    }

    const pedido = new Pedido()

    const entity = new Entity()
    entity.consumidorId = '1'
    entity.pagamentoId = '1'
    entity.total = 1
    entity.createdAt = new Date(1)
    entity.updatedAt = new Date(1)

    mockToDto.mockReturnValue(dto)
    toDomainEntity.mockReturnValue(pedido)
    repository.save.mockResolvedValue(entity)

    const result = await pedidoTypeormRepository.save(pedido)
    expect(mockToDto).toHaveBeenCalledTimes(1)
    expect(toDomainEntity).toHaveBeenCalledTimes(1)
    expect(repository.save).toHaveBeenCalledTimes(1)
    expect(mockToDto).toHaveBeenCalledWith(pedido)
    expect(toDomainEntity).toHaveBeenCalledWith(entity)
    expect(repository.save).toHaveBeenCalledWith(dto)
    expect(result).toEqual(pedido)
  })
})
