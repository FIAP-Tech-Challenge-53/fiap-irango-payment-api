import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SqsModule } from '@ssut/nestjs-sqs'

import QueueConfig from '@/config/QueueConfig'
import TypeOrmConfig from '@/config/typeorm/TypeOrmConfig'
import AppController from '@/infra/web/nestjs/app.controller'
import PagamentosModule from '@/infra/web/nestjs/pagamentos/pagamentos.module'
import PedidosModule from '@/infra/web/nestjs/pedidos/pedidos.module'

export const appModules = [
  PagamentosModule,
  PedidosModule,
]

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    SqsModule.register(QueueConfig),
    ...appModules
  ],
  controllers: [
    AppController
  ],
  providers: [
  ],
  exports: [
  ]
})
export default class AppModule {
}
