import Pedido from '@/core/domain/entities/pedido'
import IPedidoRepository from '@/core/domain/repositories/ipedido.repository'

export class PedidoGateway {
  constructor (
    private readonly repository: IPedidoRepository,
  ) {}

  create (pedido: Pedido): Promise<Pedido> {
    return this.repository.create(pedido)
  }

  save (pedido: Pedido): Promise<Pedido> {
    return this.repository.save(pedido)
  }
}
