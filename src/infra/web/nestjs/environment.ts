export class Environment {
  static validate () {
    if (!process.env.NODE_ENV) throw new Error('NODE_ENV is not defined')
  }

  static get NODE_ENV () {
    return process.env.NODE_ENV || 'development'
  }

  static get IS_DEV_ENV () {
    const devEnvs = ['development', 'local']
    return devEnvs.includes(Environment.NODE_ENV)
  }

  static get PORT () {
    return process.env.PORT || 3002
  }

  static get SENTRY_DSN () {
    return process.env.SENTRY_DSN || ''
  }

  static get DB_HOSTNAME () {
    return process.env.DB_HOSTNAME || 'localhost'
  }

  static get DB_PORT (): number {
    return Number(process.env.DB_PORT) || 3306
  }

  static get DB_USERNAME () {
    return process.env.DB_USERNAME || 'root'
  }

  static get DB_PASSWORD () {
    return process.env.DB_PASSWORD || 'password'
  }

  static get DB_DATABASE () {
    return process.env.DB_DATABASE || 'irango_payment'
  }

  static get DB_CONNECTION_LIMIT (): number {
    return Number(process.env.DB_CONNECTION_LIMIT) || 10000
  }

  static get DB_CONNECTION_TIMEOUT (): number {
    return Number(process.env.DB_CONNECTION_TIMEOUT) || 30000
  }

  static get AWS_REGION () {
    return process.env.AWS_REGION || 'us-east-1'
  }

  static get AWS_ACCESS_KEY_ID () {
    return process.env.AWS_ACCESS_KEY_ID || 'qualquercoisa'
  }

  static get AWS_SECRET_ACCESS_KEY () {
    return process.env.AWS_SECRET_ACCESS_KEY || 'qualquercoisa'
  }

  static get SNS_TOPIC_PAYMENT_CREATED () {
    return process.env.SNS_TOPIC_PAYMENT_CREATED || 'arn:aws:sns:us-east-1:000000000000:fiap-irango-payment_payment-created_dev'
  }

  static get SNS_TOPIC_PAYMENT_CONFIRMED () {
    return process.env.SNS_TOPIC_PAYMENT_CONFIRMED || 'arn:aws:sns:us-east-1:000000000000:fiap-irango-payment_payment-confirmed_dev'
  }

  static get CREATED_ORDER_QUEUE () {
    return process.env.CREATED_ORDER_QUEUE || 'fiap-irango-payment_order-created_dev'
  }

  static get URL_QUEUE () {
    return process.env.URL_QUEUE || 'http://localstack:4566/000000000000/'
  }
}
