import PagamentoDto from '@/core/domain/dto/output/pagamento.dto'
import Pagamento from '@/core/domain/entities/pagamento'
import { PagamentoStatusEnum } from '@/core/domain/enums/pagamento-status.enum'
import { PagamentoGateway } from '@/core/operation/gateway/pagamento.gateway'
import IRangoOrderService from '@/infra/persistence/service/irango-order.service'

export default class UpdatePagamento {
  constructor (
    private readonly gateway: PagamentoGateway,
    private readonly orderService: IRangoOrderService,
  ) {}

  async handle (pedidoId: number, paymentApproved: boolean): Promise<PagamentoDto> {
    console.log(`Update Payment with payment status ${paymentApproved} for Order ${pedidoId}`)

    const pagamento = await this.gateway.findByPedidoId(pedidoId)
    if (!pagamento) {
      throw new Error('Pagamento não encontrado')
    }

    if (!paymentApproved) {
      return pagamento
    }

    Pagamento.update(pagamento, PagamentoStatusEnum.CONFIRMADO)
    await this.gateway.save(pagamento)

    await this.orderService.confirmPayment(pagamento)

    return pagamento
  }
}
