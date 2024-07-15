import UpdatePagamento from '@/core/application/usecase/pagamento/update-pagamento.use-case'
import Pagamento from '@/core/domain/entities/pagamento'
import { PagamentoStatusEnum } from '@/core/domain/enums/pagamento-status.enum'
import IPagamentoRepository from '@/core/domain/repositories/ipagamento.repository'
import IGatewayPagamentoService from '@/core/domain/services/igateway-pagamento.service'
import { PagamentoGateway } from '@/core/operation/gateway/pagamento.gateway'
import IRangoOrderService from '@/infra/persistence/service/irango-order.service'

describe('Test UpdatePagamento Class', () => {
  let usecase:UpdatePagamento

  let mockOrderService:jest.Mocked<IRangoOrderService>
  let mockPagamentoGateway:PagamentoGateway

  let mockPagamentoRepository:jest.Mocked<IPagamentoRepository>
  let mockPagamentoService:jest.Mocked<IGatewayPagamentoService>

  let mockCreatePagamento:jest.Mock<any>
  let mockRegisterOrderPagamento:jest.Mock<any>
  let mockFindByPedidoIdPagamento:jest.Mock<any>
  let mockSavePagamento:jest.Mock<any>

  beforeEach(() => {
    jest.mock('@/core/operation/gateway/pagamento.gateway')
    jest.mock('@/core/operation/gateway/pedido.gateway')

    mockCreatePagamento = jest.fn()
    mockRegisterOrderPagamento = jest.fn()
    mockFindByPedidoIdPagamento = jest.fn()
    mockSavePagamento = jest.fn()

    PagamentoGateway.prototype.create = mockCreatePagamento
    PagamentoGateway.prototype.findByPedidoId = mockFindByPedidoIdPagamento
    PagamentoGateway.prototype.registerOrder = mockRegisterOrderPagamento
    PagamentoGateway.prototype.save = mockSavePagamento

    mockPagamentoRepository = {
      findByPedidoId: jest.fn(),
      create: jest.fn(),
      save: jest.fn()
    }

    mockPagamentoService = {
      registerOrder: jest.fn()
    }

    mockOrderService = {
      confirmPayment: jest.fn()
    }

    mockPagamentoGateway = new PagamentoGateway(mockPagamentoRepository, mockPagamentoService)
    usecase = new UpdatePagamento(mockPagamentoGateway, mockOrderService)
  })

  it('test constructor class', async () => {
    expect(usecase).toBeInstanceOf(UpdatePagamento)
  })

  it('test handle class method using not found payment', async () => {
    mockFindByPedidoIdPagamento.mockResolvedValue(null)
    await expect(usecase.handle(1, true)).rejects.toThrow(new Error('Pagamento não encontrado'))
  })

  it('test handle class method using not approved payment', async () => {
    const pagamento = Pagamento.create(
      1,
      1,
      '1',
      PagamentoStatusEnum.PENDENTE,
    )

    mockFindByPedidoIdPagamento.mockResolvedValue(pagamento)

    const result = await usecase.handle(1, false)

    expect(mockFindByPedidoIdPagamento).toHaveBeenCalledTimes(1)

    expect(mockFindByPedidoIdPagamento).toHaveBeenCalledWith(1)
    expect(result).toEqual(pagamento)
  })

  it('test handle class method', async () => {
    const pagamento = Pagamento.create(
      1,
      1,
      '1',
      PagamentoStatusEnum.CONFIRMADO,
    )

    mockFindByPedidoIdPagamento.mockResolvedValue(pagamento)

    const result = await usecase.handle(1, true)

    expect(mockFindByPedidoIdPagamento).toHaveBeenCalledTimes(1)
    expect(mockSavePagamento).toHaveBeenCalledTimes(1)
    expect(mockOrderService.confirmPayment).toHaveBeenCalledTimes(1)

    expect(mockFindByPedidoIdPagamento).toHaveBeenCalledWith(1)
    expect(mockSavePagamento).toHaveBeenCalledWith(pagamento)
    expect(mockOrderService.confirmPayment).toHaveBeenCalledWith(1)

    expect(result).toEqual(pagamento)
  })
})
