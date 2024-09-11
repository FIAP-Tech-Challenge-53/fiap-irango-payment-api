import RegisterOrder from '@/core/application/usecase/pagamento/registerOrder.use-case'
import PedidoDto from '@/core/domain/dto/output/pedido.dto'
import PedidoMapper from '@/core/domain/mappers/pedido.mapper'
import IPagamentoRepository from '@/core/domain/repositories/ipagamento.repository'
import IPedidoRepository from '@/core/domain/repositories/ipedido.repository'
import IGatewayPagamentoService from '@/core/domain/services/igateway-pagamento.service'
import { PagamentoGateway } from '@/core/operation/gateway/pagamento.gateway'
import { PedidoGateway } from '@/core/operation/gateway/pedido.gateway'
import IRangoOrderService from '@/infra/persistence/service/irango-order.service'
import RegisterPedidoRequest from '@/infra/web/nestjs/pedidos/dto/register-pedido.request'

export class PedidoController {
  constructor (
   private readonly repository: IPedidoRepository,
   private readonly pagamentoRepository: IPagamentoRepository,
   private readonly gatewayPagamentoService: IGatewayPagamentoService,
   private readonly orderService: IRangoOrderService,
  ) {}

  async register (
    input: RegisterPedidoRequest
  ): Promise<PedidoDto> {
    const useCase = new RegisterOrder(
      new PedidoGateway(this.repository),
      new PagamentoGateway(this.pagamentoRepository, this.gatewayPagamentoService),
      this.orderService,
    )

    const pedido = await useCase.handle(input)

    return PedidoMapper.toDto(pedido)
  }
}
