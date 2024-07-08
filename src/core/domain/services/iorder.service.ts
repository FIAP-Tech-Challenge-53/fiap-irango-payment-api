export default interface IOrderService {
  confirmPayment(pedidoId: number): Promise<void>;
}

export const IOrderService = Symbol('IOrderService')
