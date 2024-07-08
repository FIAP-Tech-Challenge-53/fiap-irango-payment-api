import { Column, Entity, Index, PrimaryColumn } from 'typeorm'

@Entity('Pedido')
export class Pedido {
  @PrimaryColumn()
  public readonly id: number

  @Column({ name: 'consumidor_id', length: 36, nullable: true })
  @Index()
  consumidorId?: string

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number

  @Column({ name: 'created_at' })
  createdAt: Date

  @Column({ name: 'updated_at' })
  updatedAt: Date

  @Column({ name: 'pagamento_id', length: 36, nullable: true })
  @Index()
  pagamentoId?: string
}
