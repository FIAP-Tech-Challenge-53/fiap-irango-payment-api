
export default class Pedido {
  readonly id: number
  consumidorId?: string
  total: number
  pagamentoId?: string
  createdAt: Date
  updatedAt: Date

  public constructor (params?: Partial<Pedido>) {
    Object.assign(this, params)
  }

  static create (
    id: number,
    consumidorId: string | undefined,
    total: number,
    createdAt: Date,
    updatedAt: Date,
  ): Pedido {
    const pagamento = new Pedido({
      id,
      consumidorId,
      total,
      createdAt,
      updatedAt
    })

    return pagamento
  }
}
