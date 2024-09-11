import UpdatePagamento from '@/core/application/usecase/pagamento/update-pagamento.use-case'
import PagamentoDto from '@/core/domain/dto/output/pagamento.dto'
import Pagamento from '@/core/domain/entities/pagamento'
import { PagamentoStatusEnum } from '@/core/domain/enums/pagamento-status.enum'
import PagamentoMapper from '@/core/domain/mappers/pagamento.mapper'
import IPagamentoRepository from '@/core/domain/repositories/ipagamento.repository'
import IGatewayPagamentoService from '@/core/domain/services/igateway-pagamento.service'
import { PagamentoController } from '@/core/operation/controllers/pagamento.controller'
import IRangoOrderService from '@/infra/persistence/service/irango-order.service'

describe('Test PagamentoController class', () => {
  let controller:PagamentoController

  let mockOrderService:jest.Mocked<IRangoOrderService>
  let mockPagamentoRepository:jest.Mocked<IPagamentoRepository>
  let mockPagamentoService:jest.Mocked<IGatewayPagamentoService>

  let mockUpdatePagamentoHandler:jest.Mock<any>
  let mockPagamentoMapper:jest.Mock<any>

  beforeEach(() => {
    mockUpdatePagamentoHandler = jest.fn()
    mockPagamentoMapper = jest.fn()

    mockPagamentoRepository = {
      findByPedidoId: jest.fn(),
      create: jest.fn(),
      save: jest.fn()
    }

    mockPagamentoService = {
      registerOrder: jest.fn()
    }

    mockOrderService = {
      createPayment: jest.fn(),
      confirmPayment: jest.fn()
    }

    UpdatePagamento.prototype.handle = mockUpdatePagamentoHandler
    PagamentoMapper.toDto = mockPagamentoMapper

    controller = new PagamentoController(mockPagamentoRepository, mockPagamentoService, mockOrderService)
  })

  it('constructor class test', async () => {
    expect(controller).toBeInstanceOf(PagamentoController)
  })

  it('handleWebhookMercadoPago class method test', async () => {
    const pagamento = new Pagamento({
      id: '1',
      pedidoId: 1,
      valor: 1,
      gatewayPagamentoId: '1',
      status: PagamentoStatusEnum.PENDENTE,
      createdAt: new Date(1),
      updatedAt: new Date(1)
    })

    const dto: PagamentoDto = {
      id: '1',
      pedidoId: 1,
      valor: 1,
      gatewayPagamentoId: '1',
      status: PagamentoStatusEnum.PENDENTE,
      createdAt: new Date(1),
      updatedAt: new Date(1)
    }

    mockUpdatePagamentoHandler.mockResolvedValue(pagamento)
    mockPagamentoMapper.mockReturnValue(dto)

    const result = await controller.handleWebhookMercadoPago(1, false)

    expect(mockUpdatePagamentoHandler).toHaveBeenCalledTimes(1)
    expect(mockPagamentoMapper).toHaveBeenCalledTimes(1)

    expect(mockUpdatePagamentoHandler).toHaveBeenCalledWith(1, false)
    expect(mockPagamentoMapper).toHaveBeenCalledWith(pagamento)
    expect(result).toEqual(dto)
  })
})
