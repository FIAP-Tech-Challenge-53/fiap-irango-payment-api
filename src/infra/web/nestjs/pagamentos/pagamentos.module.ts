import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { IPagamentoRepository } from '@/core/domain/repositories/ipagamento.repository'
import { IGatewayPagamentoService } from '@/core/domain/services/igateway-pagamento.service'
import { IOrderService } from '@/core/domain/services/iorder.service'
import IRangoOrderService from '@/infra/persistence/service/irango-order.service'
import MercadoPagoGatewayPagamentoService from '@/infra/persistence/service/mercado-pago-gateway-pagamento.service'
import { Pagamento } from '@/infra/persistence/typeorm/entities/pagamento'
import PagamentoTypeormRepository from '@/infra/persistence/typeorm/repository/pagamento-typeorm.repository'
import PagamentosController from '@/infra/web/nestjs/pagamentos/pagamentos.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pagamento,
    ]),
  ],
  providers: [
    { provide: IPagamentoRepository, useClass: PagamentoTypeormRepository },
    { provide: IOrderService, useClass: IRangoOrderService },
    { provide: IGatewayPagamentoService, useClass: MercadoPagoGatewayPagamentoService },

  ],
  controllers: [
    PagamentosController,
  ],
  exports: [
    IPagamentoRepository,
    IGatewayPagamentoService,
  ],
})
export default class PagamentosModule {}
