import Pagamento from '@/core/domain/entities/pagamento'
import Pedido from '@/core/domain/entities/pedido'
import { PagamentoStatusEnum } from '@/core/domain/enums/pagamento-status.enum'
import { PagamentoGateway } from '@/core/operation/gateway/pagamento.gateway'
import { PedidoGateway } from '@/core/operation/gateway/pedido.gateway'
import IRangoOrderService from '@/infra/persistence/service/irango-order.service'
import RegisterPedidoRequest from '@/infra/web/nestjs/pedidos/dto/register-pedido.request'

export default class RegisterOrder {
  constructor (
    private readonly pedidoGateway: PedidoGateway,
    private readonly pagamentoGateway: PagamentoGateway,
    private readonly orderService: IRangoOrderService,
  ) {}

  async handle (input: RegisterPedidoRequest): Promise<Pagamento> {
    console.log(`Register new payment of order with id ${input.id}`)

    const { id, consumidorId, total, createdAt, updatedAt } = input
    let pedido = Pedido.create(
      id,
      consumidorId,
      total,
      createdAt,
      updatedAt,
    )

    pedido = await this.pedidoGateway.create(pedido)
    const gatewayPagamentoId = await this.pagamentoGateway.registerOrder(pedido)

    let pagamento = Pagamento.create(
      pedido.id,
      pedido.total,
      gatewayPagamentoId,
      PagamentoStatusEnum.PENDENTE,
    )

    pagamento = await this.pagamentoGateway.create(pagamento)

    pedido.pagamentoId = pagamento.id

    await this.pedidoGateway.save(pedido)

    await this.orderService.confirmPayment(pagamento)

    return pagamento
  }
}
