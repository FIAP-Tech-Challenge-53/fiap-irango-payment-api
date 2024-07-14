import { Repository } from 'typeorm'

import PagamentoDto from '@/core/domain/dto/output/pagamento.dto'
import Pagamento from '@/core/domain/entities/pagamento'
import PagamentoMapper from '@/core/domain/mappers/pagamento.mapper'
import { Pagamento as Entity } from '@/infra/persistence/typeorm/entities/pagamento'
import PagamentoTypeormRepository from '@/infra/persistence/typeorm/repository/pagamento-typeorm.repository'
import { PagamentoStatusEnum } from '@/core/domain/enums/pagamento-status.enum'

describe("PagamentoTypeormRepository class test", () => {

    let pagamentoTypeormRepository:PagamentoTypeormRepository

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
  
      PagamentoMapper.toDto = mockToDto
      PagamentoMapper.toDomainEntity = toDomainEntity
  
      pagamentoTypeormRepository = new PagamentoTypeormRepository(repository)
    })

    it("constructor class test", async () => {
        expect(pagamentoTypeormRepository).toBeInstanceOf(PagamentoTypeormRepository);
    });

    it("create method test", async () => {
        let dto:PagamentoDto = {
            id: '1',
            pedidoId: 1,
            valor: 1,
            gatewayPagamentoId: '1',
            status: PagamentoStatusEnum.CANCELADO,
            createdAt: new Date(1),
            updatedAt: new Date(1)
        };

        let pagamento = new Pagamento();

        let entity = new Entity();
        entity.pedidoId = 1;
        entity.valor = 1;
        entity.gatewayPagamentoId = '1';
        entity.status = PagamentoStatusEnum.CANCELADO;
        entity.createdAt = new Date(1);
        entity.updatedAt = new Date(1);

        mockToDto.mockReturnValue(dto);
        toDomainEntity.mockReturnValue(pagamento);
        repository.save.mockResolvedValue(entity);

        let result = await pagamentoTypeormRepository.create(pagamento);
        expect(mockToDto).toHaveBeenCalledTimes(1);
        expect(toDomainEntity).toHaveBeenCalledTimes(1);
        expect(repository.save).toHaveBeenCalledTimes(1);
        expect(mockToDto).toHaveBeenCalledWith(pagamento);
        expect(toDomainEntity).toHaveBeenCalledWith(entity);
        expect(repository.save).toHaveBeenCalledWith(dto);
        expect(result).toEqual(pagamento);
    });

    it("findByPedidoId method test", async () => {

        let pagamento = new Pagamento();

        let entity = new Entity();
        entity.pedidoId = 1;
        entity.valor = 1;
        entity.gatewayPagamentoId = '1';
        entity.status = PagamentoStatusEnum.CANCELADO;
        entity.createdAt = new Date(1);
        entity.updatedAt = new Date(1);

        toDomainEntity.mockReturnValue(pagamento);
        repository.findOne.mockResolvedValue(entity);

        let result = await pagamentoTypeormRepository.findByPedidoId(1);

        expect(toDomainEntity).toHaveBeenCalledTimes(1);
        expect(repository.findOne).toHaveBeenCalledTimes(1);

        expect(toDomainEntity).toHaveBeenCalledWith(entity);
        expect(repository.findOne).toHaveBeenCalledWith({ where: { pedidoId: 1 } });

        expect(result).toEqual(pagamento);
    });

    it("save method test", async () => {
        let dto:PagamentoDto = {
            id: '1',
            pedidoId: 1,
            valor: 1,
            gatewayPagamentoId: '1',
            status: PagamentoStatusEnum.CANCELADO,
            createdAt: new Date(1),
            updatedAt: new Date(1)
        };

        let pagamento = new Pagamento();

        let entity = new Entity();
        entity.pedidoId = 1;
        entity.valor = 1;
        entity.gatewayPagamentoId = '1';
        entity.status = PagamentoStatusEnum.CANCELADO;
        entity.createdAt = new Date(1);
        entity.updatedAt = new Date(1);

        mockToDto.mockReturnValue(dto);
        toDomainEntity.mockReturnValue(pagamento);
        repository.save.mockResolvedValue(entity);

        let result = await pagamentoTypeormRepository.save(pagamento);
        expect(mockToDto).toHaveBeenCalledTimes(1);
        expect(toDomainEntity).toHaveBeenCalledTimes(1);
        expect(repository.save).toHaveBeenCalledTimes(1);
        expect(mockToDto).toHaveBeenCalledWith(pagamento);
        expect(toDomainEntity).toHaveBeenCalledWith(entity);
        expect(repository.save).toHaveBeenCalledWith(dto);
        expect(result).toEqual(pagamento);
    });
});