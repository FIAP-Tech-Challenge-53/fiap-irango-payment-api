import Pagamento from '@/core/domain/entities/pagamento'
import Pedido from '@/core/domain/entities/pedido'
import { PagamentoStatusEnum } from '@/core/domain/enums/pagamento-status.enum'
import { PagamentoGateway } from '@/core/operation/gateway/pagamento.gateway'
import { PedidoGateway } from '@/core/operation/gateway/pedido.gateway'
import RegisterPedidoRequest from '@/infra/web/nestjs/pedidos/dto/register-pedido.request'

export default class Register {
  constructor (
    private readonly gateway: PedidoGateway,
    private readonly pagamentoGateway: PagamentoGateway,
  ) {}

  async handle (input: RegisterPedidoRequest): Promise<Pedido> {
    console.log(`Register new Order with id ${input.id}`)

    let pedido = Pedido.create(
      input.id,
      input.consumidorId,
      input.total,
      input.createdAt,
      input.updatedAt,
    )

    pedido = await this.gateway.create(pedido)

    const gatewayPagamentoId = await this.pagamentoGateway.registerOrder(pedido)

    let pagamento = Pagamento.create(
      pedido.id,
      input.total,
      gatewayPagamentoId,
      PagamentoStatusEnum.PENDENTE,
    )
    pagamento = await this.pagamentoGateway.create(pagamento)

    pedido.pagamentoId = pagamento.id

    return pedido
  }
}
