
export default interface PedidoDto {
  readonly id: number;
  readonly consumidorId?: string;
  readonly pagamentoId?: string;
  readonly total: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
