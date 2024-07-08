import UpdatePagamento from '@/core/application/usecase/pagamento/update-pagamento.use-case'
import PagamentoDto from '@/core/domain/dto/output/pagamento.dto'
import PagamentoMapper from '@/core/domain/mappers/pagamento.mapper'
import IPagamentoRepository from '@/core/domain/repositories/ipagamento.repository'
import IGatewayPagamentoService from '@/core/domain/services/igateway-pagamento.service'
import { PagamentoGateway } from '@/core/operation/gateway/pagamento.gateway'
import IRangoOrderService from '@/infra/persistence/service/irango-order.service'

export class PagamentoController {
  constructor (
   private readonly repository: IPagamentoRepository,
   private readonly gatewayPagamentoService: IGatewayPagamentoService,
   private readonly orderService: IRangoOrderService,
  ) {}

  async handleWebhookMercadoPago (
    pedidoId: number,
    paymentApproved: boolean
 ): Promise<PagamentoDto> {
    const useCase = new UpdatePagamento(
      new PagamentoGateway(
        this.repository,
        this.gatewayPagamentoService,
      ),
      this.orderService,
    )

    const pagamento = await useCase.handle(pedidoId, paymentApproved)

    return PagamentoMapper.toDto(pagamento)
  }
}
