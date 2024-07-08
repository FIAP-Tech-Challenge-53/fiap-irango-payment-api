import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post
} from '@nestjs/common'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'

import PagamentoDto from '@/core/domain/dto/output/pagamento.dto'
import IPagamentoRepository, {
  IPagamentoRepository as IPagamentoRepositorySymbol,
} from '@/core/domain/repositories/ipagamento.repository'
import IGatewayPagamentoService, {
  IGatewayPagamentoService as IGatewayPagamentoServiceSymbol,
} from '@/core/domain/services/igateway-pagamento.service'
import IOrderService, {
  IOrderService as IOrderServiceSymbol,
} from '@/core/domain/services/iorder.service'
import { PagamentoController } from '@/core/operation/controllers/pagamento.controller'
import UpdatePagamentoPayload from '@/infra/web/mercado-pago/dto/update-pagamento-payload'

@Controller('v1/pagamentos')
@ApiTags('v1/pagamentos')
export default class PagamentosController {
  constructor (
    @Inject(IPagamentoRepositorySymbol) private readonly repository: IPagamentoRepository,
    @Inject(IGatewayPagamentoServiceSymbol) private readonly gatewayPagamentoService: IGatewayPagamentoService,
    @Inject(IOrderServiceSymbol) private readonly orderService: IOrderService,
  ) {}

  @Post('/webhook/mercado-pago')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Atualizar um Pedido a partir do evento do gateway de pagamento' })
  @ApiBody({ type: UpdatePagamentoPayload })
  pagamentoWebhook (
    @Body() input: UpdatePagamentoPayload
  ): Promise<PagamentoDto> {
    const pedidoId = parseInt(input.external_reference)
    const paymentApproved = !!input.date_approved

    const controller = new PagamentoController(
      this.repository,
      this.gatewayPagamentoService,
      this.orderService,
    )

    return controller.handleWebhookMercadoPago(pedidoId, paymentApproved)
  }
}
