import { Injectable } from '@nestjs/common'

import { PublishCommand, SNSClient } from '@aws-sdk/client-sns'

import AwsConfig from '@/config/AwsConfig'
import Pagamento from '@/core/domain/entities/pagamento'
import IOrderService from '@/core/domain/services/iorder.service'
import { Environment as envs } from '@/infra/web/nestjs/environment'

@Injectable()
export default class IRangoOrderService implements IOrderService {
  constructor (
  ) {}

  async createPayment (pagamento: Pagamento): Promise<void> {
    console.log(`Create payment for pedido ${pagamento.pedidoId} at IRango Order Service`)

    try {
      const client = new SNSClient(AwsConfig)
      const command = new PublishCommand({
        TopicArn: envs.SNS_TOPIC_PAYMENT_CREATED,
        Message: JSON.stringify(pagamento)
      })

      await client.send(command)
    } catch (error) {
      console.error(`Error: ${error}`)
      console.error(error)
    }
  }

  async confirmPayment (pagamento: Pagamento): Promise<void> {
    console.log(`Confirm payment for pedido ${pagamento.pedidoId} at IRango Order Service`)

    try {
      const client = new SNSClient(AwsConfig)
      const command = new PublishCommand({
        TopicArn: envs.SNS_TOPIC_PAYMENT_CONFIRMED,
        Message: JSON.stringify(pagamento)
      })

      await client.send(command)
    } catch (error) {
      console.error(`Error: ${error}`)
      console.error(error)
    }
  }
}
