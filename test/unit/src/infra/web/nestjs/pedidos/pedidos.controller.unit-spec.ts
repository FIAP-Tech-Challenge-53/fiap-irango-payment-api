import IPagamentoRepository from '@/core/domain/repositories/ipagamento.repository'
import IPedidoRepository from '@/core/domain/repositories/ipedido.repository'
import IGatewayPagamentoService from '@/core/domain/services/igateway-pagamento.service'
import { PedidoController } from '@/core/operation/controllers/pedido.controller'
import RegisterPedidoRequest from '@/infra/web/nestjs/pedidos/dto/register-pedido.request'
import RegisterPedidoResponse from '@/infra/web/nestjs/pedidos/dto/register-pedido.response'
import PedidosController from '@/infra/web/nestjs/pedidos/pedidos.controller'

describe('PedidosController class tests', () => {
  let controller:PedidosController

  let mockPedidoRepository:jest.Mocked<IPedidoRepository>
  let mockPagamentoRepository:jest.Mocked<IPagamentoRepository>
  let mockPagamentoService:jest.Mocked<IGatewayPagamentoService>

  let mockRegisterHandler:jest.Mock<any>

  beforeEach(() => {
    mockRegisterHandler = jest.fn()

    mockPagamentoRepository = {
      findByPedidoId: jest.fn(),
      create: jest.fn(),
      save: jest.fn()
    }

    mockPagamentoService = {
      registerOrder: jest.fn()
    }

    mockPedidoRepository = {
      create: jest.fn(),
      save: jest.fn()
    }

    PedidoController.prototype.register = mockRegisterHandler

    controller = new PedidosController(mockPedidoRepository, mockPagamentoRepository, mockPagamentoService)
  })

  it('constructor class test', async () => {
    expect(controller).toBeInstanceOf(PedidosController)
  })

  it('registerPedido method test', async () => {
    const input = new RegisterPedidoRequest()
    const response = new RegisterPedidoResponse()
    mockRegisterHandler.mockResolvedValue(response)
    const result = await controller.registerPedido(input)
    expect(mockRegisterHandler).toHaveBeenCalledTimes(1)
    expect(mockRegisterHandler).toHaveBeenCalledTimes(1)
    expect(mockRegisterHandler).toHaveBeenCalledWith(input)
    expect(result).toEqual(response)
  })
})
