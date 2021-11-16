import { FooRequest } from './schema'

import logger from '../lib/logger'
import { FastifyRequest } from 'fastify'

const log = (context: any) => {
    return logger().child({ module: 'Foomanager', reqId: context?.id })
}

const FooManager = (req: FastifyRequest) => {
    return {
        DoFoo: async (f: FooRequest): Promise<string> => {
            log(req).info({ msg: `youre doing great, ${f.name}` })
            return 'Foo Done'
        }
    }
}

export default FooManager
