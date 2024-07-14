import Pedido from '@/core/domain/entities/pedido'
import MercadoPagoGatewayPagamentoService from '@/infra/persistence/service/mercado-pago-gateway-pagamento.service'

describe('MercadoPagoGatewayPagamentoService class tests', () => {
  let gateway:MercadoPagoGatewayPagamentoService

  beforeEach(() => {
    gateway = new MercadoPagoGatewayPagamentoService()
  })

  it('class constructor test', async () => {
    expect(gateway).toBeInstanceOf(MercadoPagoGatewayPagamentoService)
  })

  it('class register method test', async () => {
    const pedido = new Pedido()
    const id = gateway.registerOrder(pedido)
    expect(id).not.toBeNull()
  })
})
