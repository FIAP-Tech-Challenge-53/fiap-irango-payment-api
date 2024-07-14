import { ApiProperty } from '@nestjs/swagger'

import PedidoDto from '@/core/domain/dto/output/pedido.dto'

export default class RegisterPedidoResponse implements PedidoDto {
  @ApiProperty({ description: 'ID do Pedido', type: Number, example: 1 })
  readonly id: number

  @ApiProperty({ description: 'ID do Pagamento', type: String, example: 'f1453a0d-4b53-4ff9-8b17-709e089ca805' })
  readonly pagamentoId?: string

  @ApiProperty({ description: 'ID do Consumidor', type: String, required: false, example: 'f1453a0d-4b53-4ff9-8b17-709e089ca805' })
  readonly consumidorId?: string

  @ApiProperty({ description: 'Total do Pedido', type: Number, example: 123.45 })
  readonly total: number

  @ApiProperty({ description: 'Data de Criação', type: Date, example: '2024-09-01T00:00:00.000Z' })
  readonly createdAt: Date

  @ApiProperty({ description: 'Data de Atualização', type: Date, example: '2024-09-01T00:00:00.000Z' })
  readonly updatedAt: Date
}
