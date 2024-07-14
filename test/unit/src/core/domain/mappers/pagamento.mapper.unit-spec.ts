import Pagamento from '@/core/domain/entities/pagamento'
import { PagamentoStatusEnum } from '@/core/domain/enums/pagamento-status.enum'
import PagamentoMapper from '@/core/domain/mappers/pagamento.mapper'

describe('PagamentoMapper class test', () => {
  it('toDto class test', async () => {
    const pagamento = Pagamento.create(1, 1, '1', PagamentoStatusEnum.PENDENTE)

    const dto = {
      id: '1',
      pedidoId: 1,
      valor: 1,
      gatewayPagamentoId: '1',
      status: PagamentoStatusEnum.PENDENTE
    }

    const result = PagamentoMapper.toDto(pagamento)

    expect(result.gatewayPagamentoId).toEqual(dto.gatewayPagamentoId)
    expect(result.pedidoId).toEqual(dto.pedidoId)
    expect(result.status).toEqual(dto.status)
    expect(result.valor).toEqual(dto.valor)
  })

  it('toDomainEntity class test', async () => {
    const pagamento = Pagamento.create(1, 1, '1', PagamentoStatusEnum.PENDENTE)

    const dto = {
      id: '1',
      pedidoId: 1,
      valor: 1,
      gatewayPagamentoId: '1',
      status: PagamentoStatusEnum.PENDENTE
    }

    const result = PagamentoMapper.toDomainEntity(dto)

    expect(result.pedidoId).toEqual(pagamento.pedidoId)
    expect(result.status).toEqual(pagamento.status)
    expect(result.valor).toEqual(pagamento.valor)
  })
})
