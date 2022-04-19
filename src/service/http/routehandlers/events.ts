import { FastifyReply, FastifyRequest, RouteHandler } from 'fastify'
import EventsManager from '../../../events/manager'
import { EventRequest } from '../../../events/schema'

export const EventsRoute = (): RouteHandler => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const eventsData = request.body as EventRequest
    const ret = await EventsManager(request).HandleEvents(eventsData)
    reply.status(200).send()
  }
}
