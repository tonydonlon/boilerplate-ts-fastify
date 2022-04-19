import { EventRequest } from './schema'

import logger from '../lib/logger'
import { FastifyRequest } from 'fastify'

const log = (context: any) => {
  return logger().child({ module: 'EventsManager', reqId: context?.id })
}

const EventsManager = (req: FastifyRequest) => {
  return {
    HandleEvents: async (e: EventRequest): Promise<void> => {
      const { events } = e
      log(req).info({msg: 'Events payload', events })
    }
  }
}

export default EventsManager
