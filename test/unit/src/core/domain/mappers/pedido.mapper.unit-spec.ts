import PedidoDto from '@/core/domain/dto/output/pedido.dto'
import Pedido from '@/core/domain/entities/pedido'
import PedidoMapper from '@/core/domain/mappers/pedido.mapper';

describe("Testing PedidoMapper Class", () => {
    it("toDto static method should receive Pedido Class and return PedidoDto class", () => {
        const pedido = Pedido.create(1, "1", 1, new Date(1), new Date(1));
        const dto = PedidoMapper.toDto(pedido);
        expect(dto.total).toEqual(1);
        expect(dto.id).toEqual(1);
        expect(dto.consumidorId).toEqual('1');
        expect(dto.createdAt).toEqual(new Date(1));
        expect(dto.updatedAt).toEqual(new Date(1));
    });

    it("toDomainEntity static method should receive PedidoDto Class and return Pedido class", () => {
        const dto:PedidoDto = {
            id: 1,
            consumidorId: '1',
            pagamentoId: '',
            total: 1,
            createdAt: new Date(1),
            updatedAt: new Date(1)
        };

        const pedido = PedidoMapper.toDomainEntity(dto);

        expect(pedido).toBeInstanceOf(Pedido);
        expect(pedido.total).toEqual(1);
        expect(pedido.id).toEqual(1);
        expect(pedido.consumidorId).toEqual('1');
        expect(pedido.createdAt).toEqual(new Date(1));
        expect(pedido.updatedAt).toEqual(new Date(1));
    });
});