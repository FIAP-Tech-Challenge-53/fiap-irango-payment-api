import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { IPedidoRepository } from '@/core/domain/repositories/ipedido.repository'
import { IOrderService } from '@/core/domain/services/iorder.service'
import IRangoOrderService from '@/infra/persistence/service/irango-order.service'
import { Pedido } from '@/infra/persistence/typeorm/entities/pedido'
import PedidoTypeormRepository from '@/infra/persistence/typeorm/repository/pedido-typeorm.repository'
import { CreatedOrderHandler } from '@/infra/queue/handles/created-order.handles'
import PagamentosModule from '@/infra/web/nestjs/pagamentos/pagamentos.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pedido,
    ]),
    forwardRef(() => PagamentosModule),
  ],
  providers: [
    { provide: IPedidoRepository, useClass: PedidoTypeormRepository },
    { provide: IOrderService, useClass: IRangoOrderService },
    CreatedOrderHandler,
  ],
  controllers: [
  ],
})
export default class PedidosModule {}
