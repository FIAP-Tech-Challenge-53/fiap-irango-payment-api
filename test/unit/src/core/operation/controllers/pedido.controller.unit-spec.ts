import Register from '@/core/application/usecase/pedido/register.use-case'
import PedidoMapper from '@/core/domain/mappers/pedido.mapper'
import IPagamentoRepository from '@/core/domain/repositories/ipagamento.repository'
import IPedidoRepository from '@/core/domain/repositories/ipedido.repository'
import IGatewayPagamentoService from '@/core/domain/services/igateway-pagamento.service'
import RegisterPedidoRequest from '@/infra/web/nestjs/pedidos/dto/register-pedido.request'
import { PedidoController } from '@/core/operation/controllers/pedido.controller'
import Pedido from '@/core/domain/entities/pedido'

describe("Test for ProdutoController Class", () => {

    let controller:PedidoController;

    let mockPedidoRepository:jest.Mocked<IPedidoRepository>;
    let mockPagamentoRepository:jest.Mocked<IPagamentoRepository>;
    let mockPagamentoService:jest.Mocked<IGatewayPagamentoService>;

    let mockRegisterHandler:jest.Mock<any>;
    let mockDto:jest.Mock<any>;

    beforeEach(() => {   
        
        mockRegisterHandler = jest.fn()
        mockDto = jest.fn()

        mockPagamentoRepository = {
            findByPedidoId: jest.fn(),
            create: jest.fn(),
            save: jest.fn()
        };

        mockPagamentoService = {
            registerOrder: jest.fn()
        };

        mockPedidoRepository = {
            create: jest.fn(),
            save: jest.fn()
        };

        Register.prototype.handle = mockRegisterHandler;
        PedidoMapper.toDto = mockDto;

        controller = new PedidoController(mockPedidoRepository,mockPagamentoRepository,mockPagamentoService);
    });


    it("constructor class test", async () => {
        expect(controller).toBeInstanceOf(PedidoController);
    });

    it("register method test", async () => {
        const input = new RegisterPedidoRequest();

        const dto = {
            id: 1,
            consumidorId: '1',
            total: 1,
            pagamentoId: '1',
            createdAt: new Date(1),
            updatedAt: new Date(1)   
        };

        let pedido = new Pedido({
            id: 1,
            consumidorId: '1',
            total: 1,
            pagamentoId: '1',
            createdAt: new Date(1),
            updatedAt: new Date(1)
        });

        mockRegisterHandler.mockResolvedValue(pedido);
        mockDto.mockReturnValue(dto);

        let result = await controller.register(input);

        expect(mockRegisterHandler).toHaveBeenCalledTimes(1)
        expect(mockDto).toHaveBeenCalledTimes(1)

        expect(mockRegisterHandler).toHaveBeenCalledWith(input)
        expect(mockDto).toHaveBeenCalledWith(pedido)
        expect(result).toEqual(dto);

    });
});