import Pedido from '@/core/domain/entities/pedido'
import IPedidoRepository from '@/core/domain/repositories/ipedido.repository'
import { PedidoGateway } from '@/core/operation/gateway/pedido.gateway'

describe('Test PedidoGateway class', () => {
  let gateway:PedidoGateway

  let mockPedidoRepository:jest.Mocked<IPedidoRepository>

  beforeEach(() => {
    mockPedidoRepository = {
      create: jest.fn(),
      save: jest.fn()
    }

    gateway = new PedidoGateway(mockPedidoRepository)
  })

  it('Testing class constructor', () => {
    expect(gateway).toBeInstanceOf(PedidoGateway)
  })

  it('create method test', async () => {
    const pedido = new Pedido()
    mockPedidoRepository.create.mockResolvedValue(pedido)
    const result = await gateway.create(pedido)
    expect(mockPedidoRepository.create).toHaveBeenCalledTimes(1)
    expect(mockPedidoRepository.create).toHaveBeenCalledWith(pedido)
    expect(result).toEqual(pedido)
  })

  it('save method test', async () => {
    const pedido = new Pedido()
    mockPedidoRepository.save.mockResolvedValue(pedido)
    const result = await gateway.save(pedido)
    expect(mockPedidoRepository.save).toHaveBeenCalledTimes(1)
    expect(mockPedidoRepository.save).toHaveBeenCalledWith(pedido)
    expect(result).toEqual(pedido)
  })
})
