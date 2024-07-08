import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post
} from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

import IPagamentoRepository, {
  IPagamentoRepository as IPagamentoRepositorySymbol,
} from '@/core/domain/repositories/ipagamento.repository'
import IPedidoRepository, {
  IPedidoRepository as IPedidoRepositorySymbol,
} from '@/core/domain/repositories/ipedido.repository'
import IGatewayPagamentoService, {
  IGatewayPagamentoService as IGatewayPagamentoServiceSymbol,
} from '@/core/domain/services/igateway-pagamento.service'
import { PedidoController } from '@/core/operation/controllers/pedido.controller'
import RegisterPedidoRequest from '@/infra/web/nestjs/pedidos/dto/register-pedido.request'
import RegisterPedidoResponse from '@/infra/web/nestjs/pedidos/dto/register-pedido.response'

@Controller('v1/pedidos')
@ApiTags('v1/pedidos')
export default class PedidosController {
  constructor (
    @Inject(IPedidoRepositorySymbol) private readonly repository: IPedidoRepository,
    @Inject(IPagamentoRepositorySymbol) private readonly pagamentoRepository: IPagamentoRepository,
    @Inject(IGatewayPagamentoServiceSymbol) private readonly gatewayPagamentoService: IGatewayPagamentoService,
  ) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registra um novo pedido e o associa a um novo Pagamento' })
  @ApiBody({ type: RegisterPedidoRequest })
  @ApiCreatedResponse({ description: 'Registro criado', type: RegisterPedidoResponse })
  registerPedido (
    @Body() input: RegisterPedidoRequest
  ): Promise<RegisterPedidoResponse> {
    const controller = new PedidoController(
      this.repository,
      this.pagamentoRepository,
      this.gatewayPagamentoService,
    )

    return controller.register(input)
  }
}
