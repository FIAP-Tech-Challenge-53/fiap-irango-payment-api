import { v4 as uuidv4 } from 'uuid'

import { PagamentoStatusEnum } from '@/core/domain/enums/pagamento-status.enum'

export default class Pagamento {
  readonly id: string
  pedidoId: number
  valor: number
  gatewayPagamentoId: string
  status: PagamentoStatusEnum
  createdAt?: Date
  updatedAt?: Date

  public constructor (params?: Partial<Pagamento>) {
    Object.assign(this, params)
  }

  static create (
    pedidoId: number,
    valor: number,
    gatewayPagamentoId: string,
    status: PagamentoStatusEnum,
  ): Pagamento {
    const id = uuidv4()
    const pagamento = new Pagamento({
      id,
      pedidoId,
      gatewayPagamentoId,
      valor,
      status,
    })

    return pagamento
  }

  static update (pagamento: Pagamento, status: PagamentoStatusEnum): void {
    pagamento.status = status
  }
}
