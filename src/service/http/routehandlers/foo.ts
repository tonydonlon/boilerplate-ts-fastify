import { FastifyReply, FastifyRequest, RouteHandler } from 'fastify'

export const FooRoute = (): RouteHandler => {
  return async (request: FastifyRequest, _reply: FastifyReply) => {
    return { id: request.id }
  }
}
