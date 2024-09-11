import Pagamento from '@/core/domain/entities/pagamento'

export default interface IOrderService {
  createPayment (pagamento: Pagamento): Promise<void>
  confirmPayment (pagamento: Pagamento): Promise<void>
}

export const IOrderService = Symbol('IOrderService')
