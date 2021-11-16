import { FastifyReply, FastifyRequest, RouteHandler } from 'fastify'
import FooManager from '../../../foo/manager'
import { FooRequest } from '../../../foo/schema'

export const FooRoute = (): RouteHandler => {
  return async (request: FastifyRequest, _reply: FastifyReply) => {
    const r = request.body as FooRequest
    const ret = await FooManager.DoFoo(r)
    return { id: request.id }
  }
}
