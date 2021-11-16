import { FastifyReply, FastifyRequest, RouteHandler } from 'fastify'

export const HealthRoute = (): RouteHandler => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    reply.status(200)
    return 'ok'
  }
}
