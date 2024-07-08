import Pagamento from '@/core/domain/entities/pagamento'

export default interface IPagamentoRepository {
  findByPedidoId(pedidoId: number): Promise<Pagamento | undefined>;
  create(input: Pagamento): Promise<Pagamento>;
  save(input: Pagamento): Promise<Pagamento>;
}

export const IPagamentoRepository = Symbol('IPagamentoRepository')
