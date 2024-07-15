import Pagamento from '@/core/domain/entities/pagamento'
import { PagamentoStatusEnum } from '@/core/domain/enums/pagamento-status.enum'

describe('Tests for Pagamento class', () => {
  it('class constructor test', () => {
    const param = {
      id: '1',
      pedidoId: 1,
      valor: 1,
      gatewayPagamentoId: '1',
      status: PagamentoStatusEnum.CONFIRMADO
    }

    const pagamento = new Pagamento(param)

    expect(pagamento).toBeInstanceOf(Pagamento)
  })

  it('class create test', () => {
    const pagamento = Pagamento.create(
      1,
      1,
      '1',
      PagamentoStatusEnum.CONFIRMADO
    )

    expect(pagamento).toBeInstanceOf(Pagamento)
  })

  it('class update test', () => {
    const pagamento = Pagamento.create(
      1,
      1,
      '1',
      PagamentoStatusEnum.CANCELADO
    )

    Pagamento.update(pagamento, PagamentoStatusEnum.CONFIRMADO)

    expect(pagamento).toBeInstanceOf(Pagamento)
    expect(pagamento.status).toEqual(PagamentoStatusEnum.CONFIRMADO)
  })
})
