import {
  Inject
  , Injectable
} from '@nestjs/common'

import { Message } from '@aws-sdk/client-sqs'
import { SqsConsumerEventHandler, SqsMessageHandler } from '@ssut/nestjs-sqs'

import IPagamentoRepository, {
  IPagamentoRepository as IPagamentoRepositorySymbol,
} from '@/core/domain/repositories/ipagamento.repository'
import IPedidoRepository, { IPedidoRepository as IPedidoRepositorySymbol } from '@/core/domain/repositories/ipedido.repository'
import IGatewayPagamentoService, {
  IGatewayPagamentoService as IGatewayPagamentoServiceSymbol,
} from '@/core/domain/services/igateway-pagamento.service'
import IOrderService, {
  IOrderService as IOrderServiceSymbol,
} from '@/core/domain/services/iorder.service'
import { PedidoController } from '@/core/operation/controllers/pedido.controller'
import { Environment } from '@/infra/web/nestjs/environment'

@Injectable()
export class CreatedOrderHandler {
  constructor (
    @Inject(IPagamentoRepositorySymbol) private readonly repository: IPagamentoRepository,
    @Inject(IPedidoRepositorySymbol) private readonly orderRepository: IPedidoRepository,
    @Inject(IGatewayPagamentoServiceSymbol) private readonly gatewayPagamentoService: IGatewayPagamentoService,
    @Inject(IOrderServiceSymbol) private readonly orderService: IOrderService,
  ) { }

  @SqsMessageHandler(/** name: */ Environment.CREATED_ORDER_QUEUE, /** batch: */ false)
  public async handleMessage (message: Message) {
    const obj: any = JSON.parse(message.Body ?? '')
    const controller = new PedidoController(
      this.orderRepository,
      this.repository,
      this.gatewayPagamentoService,
      this.orderService,
    )

    const message2: any = JSON.parse(obj.Message ?? '')

    await controller.register(message2)
  }

  @SqsConsumerEventHandler(/** name: */ Environment.CREATED_ORDER_QUEUE, /** eventName: */ 'processing_error')
  public onProcessingError (error: Error, message: Message) {
    // report errors here

    console.log(error, message)
  }
}
