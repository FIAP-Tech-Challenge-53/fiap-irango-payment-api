import PagamentoDto from '@/core/domain/dto/output/pagamento.dto'
import Pagamento from '@/core/domain/entities/pagamento'

export default class PagamentoMapper {
  static toDto (pagamento: Pagamento): PagamentoDto {
    return {
      id: pagamento.id,
      pedidoId: pagamento.pedidoId,
      gatewayPagamentoId: pagamento.gatewayPagamentoId,
      valor: pagamento.valor,
      status: pagamento.status,
      createdAt: pagamento.createdAt,
      updatedAt: pagamento.updatedAt
    }
  }

  static toDomainEntity (input: PagamentoDto): Pagamento {
    return new Pagamento({
      id: input.id,
      pedidoId: input.pedidoId,
      valor: input.valor,
      status: input.status,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt
    })
  }
}
