import Pagamento from '@/core/domain/entities/pagamento'
import Pedido from '@/core/domain/entities/pedido'
import IPagamentoRepository from '@/core/domain/repositories/ipagamento.repository'
import IGatewayPagamentoService from '@/core/domain/services/igateway-pagamento.service'
import { PagamentoGateway } from '@/core/operation/gateway/pagamento.gateway'

describe('Test PagamentoGateway class', () => {
  let gateway:PagamentoGateway

  let mockPagamentoRepository:jest.Mocked<IPagamentoRepository>
  let mockPagamentoService:jest.Mocked<IGatewayPagamentoService>

  beforeEach(() => {
    mockPagamentoRepository = {
      findByPedidoId: jest.fn(),
      create: jest.fn(),
      save: jest.fn()
    }

    mockPagamentoService = {
      registerOrder: jest.fn()
    }

    gateway = new PagamentoGateway(mockPagamentoRepository, mockPagamentoService)
  })

  it('constructor class test', async () => {
    expect(gateway).toBeInstanceOf(PagamentoGateway)
  })

  it('create method test', async () => {
    const pagamento = new Pagamento()
    mockPagamentoRepository.create.mockResolvedValue(pagamento)
    const result = await gateway.create(pagamento)
    expect(mockPagamentoRepository.create).toHaveBeenCalledTimes(1)
    expect(mockPagamentoRepository.create).toHaveBeenCalledWith(pagamento)
    expect(result).toEqual(pagamento)
  })

  it('registerOrder method test', async () => {
    const pedido = new Pedido()
    mockPagamentoService.registerOrder.mockResolvedValue('test')
    const result = await gateway.registerOrder(pedido)
    expect(mockPagamentoService.registerOrder).toHaveBeenCalledTimes(1)
    expect(mockPagamentoService.registerOrder).toHaveBeenCalledWith(pedido)
    expect(result).toEqual('test')
  })

  it('findByPedidoId method test', async () => {
    const pagamento = new Pagamento()
    mockPagamentoRepository.findByPedidoId.mockResolvedValue(pagamento)
    const result = await gateway.findByPedidoId(1)
    expect(mockPagamentoRepository.findByPedidoId).toHaveBeenCalledTimes(1)
    expect(mockPagamentoRepository.findByPedidoId).toHaveBeenCalledWith(1)
    expect(result).toEqual(pagamento)
  })

  it('save method test', async () => {
    const pagamento = new Pagamento()
    mockPagamentoRepository.save.mockResolvedValue(pagamento)
    const result = await gateway.save(pagamento)
    expect(mockPagamentoRepository.save).toHaveBeenCalledTimes(1)
    expect(mockPagamentoRepository.save).toHaveBeenCalledWith(pagamento)
    expect(result).toEqual(pagamento)
  })
})
