import Pedido from "@/core/domain/entities/pedido";

describe("Pedido class tests", () => {
    it("constructor class test", async () => {
        let param = {
            id: 1,
            consumidorId: '1',
            total: 1,
            pagamentoId: '1'
        };

        let pedido = new Pedido(param);

        expect(pedido).toBeInstanceOf(Pedido);
    });

    it("create class test", async () => {
        let pedido = Pedido.create(1, '1', 1, new Date(1), new Date(1));
        expect(pedido).toBeInstanceOf(Pedido);
    });
});