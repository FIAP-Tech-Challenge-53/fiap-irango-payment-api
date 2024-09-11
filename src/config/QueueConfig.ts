
import { SqsOptions } from '@ssut/nestjs-sqs/dist/sqs.types'

import { Environment } from '@/infra/web/nestjs/environment'

const config = {
  consumers: [
    {
      name: Environment.CREATED_ORDER_QUEUE,
      queueUrl: Environment.URL_QUEUE.concat(Environment.CREATED_ORDER_QUEUE),
      region: Environment.AWS_REGION,
    },
  ],
  producers: [
  ],
} as SqsOptions

export default config
