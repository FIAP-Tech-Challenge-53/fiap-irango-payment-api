import { Column, CreateDateColumn, Entity, Index, PrimaryColumn, UpdateDateColumn } from 'typeorm'

import { PagamentoStatusEnum } from '@/core/domain/enums/pagamento-status.enum'

@Entity('Pagamento')
export class Pagamento {
  @PrimaryColumn({ length: 36 })
  public readonly id: string

  @Column({ name: 'pedido_id' })
  @Index()
  pedidoId: number

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor: number

  @Column({ type: 'varchar', length: 20 })
  status: PagamentoStatusEnum

  @Column({ name: 'gateway_pagamento_id' })
  @Index()
  gatewayPagamentoId: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date
}
