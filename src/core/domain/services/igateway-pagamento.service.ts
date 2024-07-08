import Pedido from '@/core/domain/entities/pedido'

export default interface IGatewayPagamentoService {
  registerOrder(pedido: Pedido): Promise<string>;
}

export const IGatewayPagamentoService = Symbol('IGatewayPagamentoService')
