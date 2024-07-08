import { PagamentoStatusEnum } from '@/core/domain/enums/pagamento-status.enum'

export default interface PagamentoDto {
  readonly id: string;
  readonly pedidoId: number;
  readonly valor: number;
  readonly gatewayPagamentoId: string;
  readonly status: PagamentoStatusEnum;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
