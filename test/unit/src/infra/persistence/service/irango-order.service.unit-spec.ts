import axios from 'axios'

import IRangoOrderService from '@/infra/persistence/service/irango-order.service'

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
})
