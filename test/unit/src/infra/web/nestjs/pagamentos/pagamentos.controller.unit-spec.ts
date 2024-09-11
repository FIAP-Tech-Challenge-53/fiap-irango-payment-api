import PagamentoDto from '@/core/domain/dto/output/pagamento.dto'
import { PagamentoStatusEnum } from '@/core/domain/enums/pagamento-status.enum'
import IPagamentoRepository from '@/core/domain/repositories/ipagamento.repository'
import IGatewayPagamentoService from '@/core/domain/services/igateway-pagamento.service'
import IOrderService from '@/core/domain/services/iorder.service'
import { PagamentoController } from '@/core/operation/controllers/pagamento.controller'
import UpdatePagamentoPayload from '@/infra/web/mercado-pago/dto/update-pagamento-payload'
import PagamentosController from '@/infra/web/nestjs/pagamentos/pagamentos.controller'

describe('PagamentosController class tests', () => {
  let controller:PagamentosController

  let mockOrderService:jest.Mocked<IOrderService>
  let mockPagamentoRepository:jest.Mocked<IPagamentoRepository>
  let mockPagamentoService:jest.Mocked<IGatewayPagamentoService>

  let mockHandleWebhookMercadoPago:jest.Mock<any>

  beforeEach(() => {
    mockHandleWebhookMercadoPago = jest.fn()

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

    PagamentoController.prototype.handleWebhookMercadoPago = mockHandleWebhookMercadoPago

    controller = new PagamentosController(mockPagamentoRepository, mockPagamentoService, mockOrderService)
  })

  it('constructor class test', async () => {
    expect(controller).toBeInstanceOf(PagamentosController)
  })

  it('pagamentoWebhook method test', async () => {
    const input = new UpdatePagamentoPayload()

    const dto:PagamentoDto = {
      id: '1',
      pedidoId: 1,
      valor: 1,
      gatewayPagamentoId: '1',
      status: PagamentoStatusEnum.PENDENTE,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    mockHandleWebhookMercadoPago.mockResolvedValue(dto)

    const result = await controller.pagamentoWebhook(input)

    expect(mockHandleWebhookMercadoPago).toHaveBeenCalledTimes(1)
    expect(mockHandleWebhookMercadoPago).toHaveBeenCalledWith(parseInt(input.external_reference), !!input.date_approved)
    expect(result).toEqual(dto)
  })
})
