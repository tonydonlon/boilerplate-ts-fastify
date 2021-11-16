const tap = require('tap')
const supertest = require('supertest')

const createServer = require('../src/service/http/service').default

tap.test('GET `/foo` route', async (t: any) => {
  console.log(createServer)
  const webserver = createServer()
  t.beforeEach(() => webserver.start())
  t.teardown(() => webserver.close())

  await webserver.ready()
  const { httpservice } = webserver
  await supertest(httpservice.server)
    .post('/foo')
    .send({'name': '', 'values': [{id: 123}]})
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .then((res: any) => {
       const reqId = res.headers['x-request-id']
       t.same(res.body, {'id': reqId})
     })
})
