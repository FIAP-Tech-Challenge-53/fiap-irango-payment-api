import RegisterOrder from '@/core/application/usecase/pagamento/registerOrder.use-case'
import Pagamento from '@/core/domain/entities/pagamento'
import Pedido from '@/core/domain/entities/pedido'
import { PagamentoStatusEnum } from '@/core/domain/enums/pagamento-status.enum'
import IPagamentoRepository from '@/core/domain/repositories/ipagamento.repository'
import IPedidoRepository from '@/core/domain/repositories/ipedido.repository'
import IGatewayPagamentoService from '@/core/domain/services/igateway-pagamento.service'
import IOrderService from '@/core/domain/services/iorder.service'
import { PagamentoGateway } from '@/core/operation/gateway/pagamento.gateway'
import { PedidoGateway } from '@/core/operation/gateway/pedido.gateway'
import RegisterPedidoRequest from '@/infra/web/nestjs/pedidos/dto/register-pedido.request'

describe('test RegisterOrder class', () => {
  let usecase:RegisterOrder

  let mockPedidoGateway:PedidoGateway
  let mockPagamentoGateway:PagamentoGateway
  let mockOrderService:jest.Mocked<IOrderService>

  let mockPedidoRepository:jest.Mocked<IPedidoRepository>
  let mockPagamentoRepository:jest.Mocked<IPagamentoRepository>
  let mockPagamentoService:jest.Mocked<IGatewayPagamentoService>

  let mockCreatePedido:jest.Mock<any>
  let mockSavePedido:jest.Mock<any>

  let mockCreatePagamento:jest.Mock<any>
  let mockRegisterOrderPagamento:jest.Mock<any>
  let mockFindByPedidoIdPagamento:jest.Mock<any>
  let mockSavePagamento:jest.Mock<any>

  beforeEach(() => {
    jest.mock('@/core/operation/gateway/pagamento.gateway')
    jest.mock('@/core/operation/gateway/pedido.gateway')

    mockCreatePedido = jest.fn()
    mockSavePedido = jest.fn()

    mockCreatePagamento = jest.fn()
    mockRegisterOrderPagamento = jest.fn()
    mockFindByPedidoIdPagamento = jest.fn()
    mockSavePagamento = jest.fn()

    PedidoGateway.prototype.create = mockCreatePedido
    PedidoGateway.prototype.save = mockSavePedido

    PagamentoGateway.prototype.create = mockCreatePagamento
    PagamentoGateway.prototype.findByPedidoId = mockFindByPedidoIdPagamento
    PagamentoGateway.prototype.registerOrder = mockRegisterOrderPagamento
    PagamentoGateway.prototype.save = mockSavePagamento

    mockPedidoRepository = {
      create: jest.fn(),
      save: jest.fn()
    }

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

    mockPedidoGateway = new PedidoGateway(mockPedidoRepository)
    mockPagamentoGateway = new PagamentoGateway(mockPagamentoRepository, mockPagamentoService)
    usecase = new RegisterOrder(mockPedidoGateway, mockPagamentoGateway, mockOrderService)
  })

  it('test class constructor', async () => {
    expect(usecase).toBeInstanceOf(RegisterOrder)
  })

  it('test class handle method', async () => {
    const input = new RegisterPedidoRequest()

    const { id, consumidorId, total, createdAt, updatedAt } = input

    const pedido = Pedido.create(
      id,
      consumidorId,
      total,
      createdAt,
      updatedAt,
    )

    const pagamento = Pagamento.create(
      pedido.id,
      pedido.total,
      '1',
      PagamentoStatusEnum.PENDENTE,
    )

    mockCreatePedido.mockResolvedValue(pedido)
    mockRegisterOrderPagamento.mockResolvedValue('1')
    mockCreatePagamento.mockResolvedValue(pagamento)

    await usecase.handle(input)

    expect(mockCreatePedido).toHaveBeenCalledTimes(1)
    expect(mockRegisterOrderPagamento).toHaveBeenCalledTimes(1)
    expect(mockCreatePagamento).toHaveBeenCalledTimes(1)
    expect(mockSavePedido).toHaveBeenCalledTimes(1)

    pedido.pagamentoId = undefined

    expect(mockCreatePedido).toHaveBeenCalledWith(pedido)
    expect(mockRegisterOrderPagamento).toHaveBeenCalledWith(pedido)
    pedido.pagamentoId = pagamento.id
    expect(mockSavePedido).toHaveBeenCalledWith(pedido)
  })
})
