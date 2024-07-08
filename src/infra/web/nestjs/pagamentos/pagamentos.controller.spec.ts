import { Test, TestingModule } from '@nestjs/testing'

import PagamentosController from '@/infra/web/nestjs/pagamentos/pagamentos.controller'

describe('PagamentosController', () => {
  let controller: PagamentosController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagamentosController],
    }).compile()

    controller = module.get<PagamentosController>(PagamentosController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
