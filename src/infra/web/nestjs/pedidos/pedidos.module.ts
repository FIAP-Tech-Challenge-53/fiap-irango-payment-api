import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { IPedidoRepository } from '@/core/domain/repositories/ipedido.repository'
import { Pedido } from '@/infra/persistence/typeorm/entities/pedido'
import PedidoTypeormRepository from '@/infra/persistence/typeorm/repository/pedido-typeorm.repository'
import PagamentosModule from '@/infra/web/nestjs/pagamentos/pagamentos.module'
import PedidosController from '@/infra/web/nestjs/pedidos/pedidos.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pedido,
    ]),
    forwardRef(() => PagamentosModule),
  ],
  providers: [
    { provide: IPedidoRepository, useClass: PedidoTypeormRepository },
  ],
  controllers: [
    PedidosController,
  ],
})
export default class PedidosModule {}
