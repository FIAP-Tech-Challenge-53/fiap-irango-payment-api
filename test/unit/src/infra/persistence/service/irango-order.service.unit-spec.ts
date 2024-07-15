import axios from 'axios'

import IRangoOrderService from '@/infra/persistence/service/irango-order.service'
import { Environment as envs } from '@/infra/web/nestjs/environment'

describe('Test IRangoOrderService class', () => {
  let service:IRangoOrderService
  let mockPost:jest.Mock<any>

  beforeEach(() => {
    jest.mock('axios')
    mockPost = jest.fn()
    axios.post = mockPost
    service = new IRangoOrderService()
  })

  it('constructor class test', async () => {
    expect(service).toBeInstanceOf(IRangoOrderService)
  })

  it('confirmPayment method test without failing', async () => {
    const pedidoId = 1
    const url = `${envs.SERVICE_IRANGO_ORDER_API}/v1/pedidos/payment-webhook/confirm/${pedidoId}`
    mockPost.mockImplementation(() => {})
    await service.confirmPayment(pedidoId)
    expect(mockPost).toHaveBeenCalledTimes(1)
    expect(mockPost).toHaveBeenCalledWith(url)
  })

  it('confirmPayment method test with failing', async () => {
    const pedidoId = 1
    const url = `${envs.SERVICE_IRANGO_ORDER_API}/v1/pedidos/payment-webhook/confirm/${pedidoId}`
    mockPost.mockImplementation(() => {
      throw new Error('Mocked Error')
    })
    await service.confirmPayment(pedidoId)
    expect(mockPost).toHaveBeenCalledTimes(1)
    expect(mockPost).toHaveBeenCalledWith(url)
  })
})
