import Fastify, { FastifyRequest } from 'fastify'
import { v4 as uuidgen } from 'uuid'
import { FooRequestSchema, FooResponseSchema } from '../../foo/schema'
import logger from '../../lib/logger'
import { HealthRoute } from './routehandlers/health'
import { FooRoute } from './routehandlers/foo'

const log = logger('webapp')

export interface WebApp {
  start(): Promise<string>
}

export interface WebAppConfig {
  logLevel?: string
  port?: string
}

/* TODO
  - route version prefixes: https://www.fastify.io/docs/latest/Routes/#route-prefixing
  - middleware to set for common request actions: headers, decorators, etc
*/
const createServer = (appConfig?: WebAppConfig): WebApp => {
  try {
    const logLevel = appConfig?.logLevel || 'debug'
    const fastify = Fastify({
      logger: {
        prettyPrint: logLevel === 'debug',
        level: logLevel
      },
      genReqId: (req: FastifyRequest): string => req.headers['x-request-id']?.toString() || uuidgen()
    })

    fastify.addHook('onSend', (request, reply, _payload, done) => {
      reply.header('x-request-id', request.id)
      done()
    })

    fastify.get('/healthcheck',
      {
        schema: {
          response: {
            200: {
              type: 'string'
            }
          }
        }
      },
      HealthRoute()
    )

    fastify.post('/foo',
      {
        schema: {
          body: FooRequestSchema,
          response: {
            200: FooResponseSchema
          }
        }
      }, FooRoute()
    )
    fastify.get('/foo/schema', {}, (_request, reply) => {
      reply.send(FooRequestSchema)
    })

    const listenPort = appConfig?.port || '3000'
    return {
      start: async () => await fastify.listen(listenPort)
    }
  } catch (err) {
    log.error(err)
    process.exit(1)
  }
}

export default createServer
