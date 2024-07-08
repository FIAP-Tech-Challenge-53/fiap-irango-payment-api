import Pedido from '@/core/domain/entities/pedido'

export default interface IPedidoRepository {
  create(input: Pedido): Promise<Pedido>;
  save(input: Pedido): Promise<Pedido>;
}

export const IPedidoRepository = Symbol('IPedidoRepository')
