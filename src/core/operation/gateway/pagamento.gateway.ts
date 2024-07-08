import Pagamento from '@/core/domain/entities/pagamento'
import Pedido from '@/core/domain/entities/pedido'
import IPagamentoRepository from '@/core/domain/repositories/ipagamento.repository'
import IGatewayPagamentoService from '@/core/domain/services/igateway-pagamento.service'

export class PagamentoGateway {
  constructor (
    private readonly repository: IPagamentoRepository,
    private readonly gatewayPagamentoService: IGatewayPagamentoService,
    ) {
  }

  create (pagamento: Pagamento): Promise<Pagamento> {
    return this.repository.create(pagamento)
  }

  registerOrder (pedido: Pedido): Promise<string> {
    return this.gatewayPagamentoService.registerOrder(pedido)
  }

  findByPedidoId (pedidoId: number): Promise<Pagamento | undefined> {
    return this.repository.findByPedidoId(pedidoId)
  }

  save (pagamento: Pagamento): Promise<Pagamento> {
    return this.repository.save(pagamento)
  }
}
