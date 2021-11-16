import { Command as CLICommand } from 'commander'
import httpserver from './service/http/service'
import eventservice from './service/eventservice/service'
import sendMessage from './cli/sendmessage'

const app = new CLICommand()

app
  .command('rest-api')
  .description('starts a REST API command server')
  .action(() => {
    (async function listen () {
      await httpserver().start()
    })()
  })

app
  .command('event-service')
  .description('starts a event pub/sub listener service')
  .action(() => {
    (async function listen () {
      await eventservice.start()
    })()
  })

app
  .command('send-message')
  .description('send a message to PUBSUB')
  .action(async() => {
      await sendMessage({foo: 'bar'})
  })

app.parse()
