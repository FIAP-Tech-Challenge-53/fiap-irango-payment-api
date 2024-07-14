import { Environment } from '@/infra/web/nestjs/environment'

describe('Test for static methods of Environment class', () => {
  it('test validate method when process.env.NODE_ENV is configured', () => {
    process.env.NODE_ENV = 'test'
    expect(() => { Environment.validate() }).not.toThrow(new Error('NODE_ENV is not defined'))
  })

  it('test validate method when process.env.NODE_ENV is not configured', () => {
    delete process.env.NODE_ENV
    expect(() => { Environment.validate() }).toThrow(new Error('NODE_ENV is not defined'))
  })

  it('test get NODE_ENV method', () => {
    process.env.NODE_ENV = 'test'
    expect(Environment.NODE_ENV).toEqual('test')
  })

  it('test get NODE_ENV method when NODE_ENV is not defined', () => {
    delete process.env.NODE_ENV
    expect(Environment.NODE_ENV).toEqual('development')
  })

  it('test get IS_DEV_ENV method', () => {
    process.env.NODE_ENV = 'local'
    expect(Environment.IS_DEV_ENV).toEqual(true)
  })

  it('test get PORT method', () => {
    process.env.PORT = '3000'
    expect(Environment.PORT).toEqual('3000')
  })

  it('test get PORT method when PORT is not defined', () => {
    delete process.env.PORT
    expect(Environment.PORT).toEqual(3002)
  })

  it('test get SENTRY_DSN method', () => {
    process.env.SENTRY_DSN = 'test'
    expect(Environment.SENTRY_DSN).toEqual('test')
  })

  it('test get SENTRY_DSN method when SENTRY_DSN is not defined', () => {
    delete process.env.SENTRY_DSN
    expect(Environment.SENTRY_DSN).toEqual('')
  })

  it('test get DB_HOSTNAME method', () => {
    process.env.DB_HOSTNAME = 'test'
    expect(Environment.DB_HOSTNAME).toEqual('test')
  })

  it('test get DB_HOSTNAME method when DB_HOSTNAME is not defined', () => {
    delete process.env.DB_HOSTNAME
    expect(Environment.DB_HOSTNAME).toEqual('localhost')
  })

  it('test get DB_PORT method', () => {
    process.env.DB_PORT = '3000'
    expect(Environment.DB_PORT).toEqual(3000)
  })

  it('test get DB_PORT method when DB_PORT is not defined', () => {
    delete process.env.DB_PORT
    expect(Environment.DB_PORT).toEqual(3306)
  })

  it('test get DB_USERNAME method', () => {
    process.env.DB_USERNAME = 'test'
    expect(Environment.DB_USERNAME).toEqual('test')
  })

  it('test get DB_USERNAME method when DB_USERNAME is not defined', () => {
    delete process.env.DB_USERNAME
    expect(Environment.DB_USERNAME).toEqual('root')
  })

  it('test get DB_PASSWORD method', () => {
    process.env.DB_PASSWORD = 'test'
    expect(Environment.DB_PASSWORD).toEqual('test')
  })

  it('test get DB_PASSWORD method when DB_PASSWORD is not defined', () => {
    delete process.env.DB_PASSWORD
    expect(Environment.DB_PASSWORD).toEqual('password')
  })

  it('test get DB_DATABASE method', () => {
    process.env.DB_DATABASE = 'test'
    expect(Environment.DB_DATABASE).toEqual('test')
  })

  it('test get DB_DATABASE method when DB_DATABASE is not defined', () => {
    delete process.env.DB_DATABASE
    expect(Environment.DB_DATABASE).toEqual('irango_payment')
  })

  it('test get DB_CONNECTION_LIMIT method', () => {
    process.env.DB_CONNECTION_LIMIT = '1000'
    expect(Environment.DB_CONNECTION_LIMIT).toEqual(1000)
  })

  it('test get DB_CONNECTION_LIMIT method when DB_CONNECTION_LIMIT is not defined', () => {
    delete process.env.DB_CONNECTION_LIMIT
    expect(Environment.DB_CONNECTION_LIMIT).toEqual(10000)
  })

  it('test get DB_CONNECTION_TIMEOUT method', () => {
    process.env.DB_CONNECTION_TIMEOUT = '1000'
    expect(Environment.DB_CONNECTION_TIMEOUT).toEqual(1000)
  })

  it('test get DB_CONNECTION_TIMEOUT method when DB_CONNECTION_TIMEOUT is not defined', () => {
    delete process.env.DB_CONNECTION_TIMEOUT
    expect(Environment.DB_CONNECTION_TIMEOUT).toEqual(30000)
  })

  it('test get SERVICE_IRANGO_ORDER_API method', () => {
    process.env.SERVICE_IRANGO_ORDER_API = 'test'
    expect(Environment.SERVICE_IRANGO_ORDER_API).toEqual('test')
  })

  it('test get SERVICE_IRANGO_ORDER_API method when SERVICE_IRANGO_ORDER_API is not defined', () => {
    delete process.env.SERVICE_IRANGO_ORDER_API
    expect(Environment.SERVICE_IRANGO_ORDER_API).toEqual('http://localhost:3001')
  })
})
