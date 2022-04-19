const tap = require('tap')
const supertest = require('supertest')

const createServer = require('../src/service/http/service').default

tap.test('POST `/foo` route', async (t: any) => {
  const webserver = createServer({logLevel: process.env['LOG_LEVEL'] || 'debug'})
  t.beforeEach(() => webserver.start())
  t.teardown(() => webserver.close())

  await webserver.ready()
  const { httpservice } = webserver
  await supertest(httpservice.server)
    .post('/foo')
    .send({ 'name': '', 'values': [{ id: 123 }] })
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .then((res: any) => {
      const reqId = res.headers['x-request-id']
      t.same(res.body, { 'id': reqId, result: 'Foo Done' }, 'response is valid')
    })
})

tap.test('POST `/foo` route 400 Bad request', async (t: any) => {
  const webserver = createServer({logLevel: process.env['LOG_LEVEL'] || 'debug'})
  t.beforeEach(() => webserver.start())
  t.teardown(() => webserver.close())

  await webserver.ready()
  const { httpservice } = webserver
  await supertest(httpservice.server)
    .post('/foo')
    .send({ 'blah': '', 'values': [{ id: 123 }] })
    .expect(400)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .then((res: any) => {
      const exepectedErr = {
        "statusCode": 400,
        "error": "Bad Request",
        "message": "body should have required property 'name'"
      }
      t.same(res.body, exepectedErr, 'expected error message received')
    })
})

tap.test('GET `/healthcheck` route', async (t: any) => {
  const webserver = createServer({logLevel: process.env['LOG_LEVEL'] || 'debug'})
  t.beforeEach(() => webserver.start())
  t.teardown(() => webserver.close())

  await webserver.ready()
  const { httpservice } = webserver
  await supertest(httpservice.server)
    .get('/healthcheck')
    .expect(200)
    .then((res: any) => {
      t.same(res.text, 'ok', 'response is valid')
    })
})

tap.test('POST `/events` route', async (t: any) => {
  const webserver = createServer({logLevel: process.env['LOG_LEVEL'] || 'debug'})
  t.beforeEach(() => webserver.start())
  t.teardown(() => webserver.close())

  await webserver.ready()
  const { httpservice } = webserver
  await supertest(httpservice.server)
    .post('/events')
    .send({ 'events': [{ 'does': 'not matter' }] })
    .expect(200)
})

tap.test('POST `/events` route 400 Bad request', async (t: any) => {
  const webserver = createServer({logLevel: process.env['LOG_LEVEL'] || 'debug'})
  t.beforeEach(() => webserver.start())
  t.teardown(() => webserver.close())

  await webserver.ready()
  const { httpservice } = webserver
  await supertest(httpservice.server)
    .post('/events')
    .send({ 'blah': '', 'values': [{ id: 123 }] })
    .expect(400)
    .then((res: any) => {
      const exepectedErr = {
        "statusCode": 400,
        "error": "Bad Request",
        "message": "body should have required property 'events'"
      }
      t.same(res.body, exepectedErr, 'expected error message received')
    })
})
