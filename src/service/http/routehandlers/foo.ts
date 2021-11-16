import { FastifyReply, FastifyRequest, RouteHandler } from 'fastify'
import FooManager from '../../../foo/manager'
import { FooRequest } from '../../../foo/schema'

export const FooRoute = (): RouteHandler => {
  return async (request: FastifyRequest, _reply: FastifyReply) => {
    const fooData = request.body as FooRequest
    const ret = await FooManager(request).DoFoo(fooData)
    return { id: request.id, result: ret }
  }
}
