import Logger from '../../lib/logger'

const logger = Logger('pub-service')

const { PUBSUB_URL } = process.env
const service = {
  start: async() => new Promise((resolve) => {
    setTimeout(resolve, 3000)
  })
}

export default service
