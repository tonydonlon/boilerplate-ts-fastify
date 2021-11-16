// import t from 'tap'
// // import server from '../src/server'

// t.test('Array.indexOf', t => {
//   const array = [1, 2, 3]
//   t.test('when item is not found', t => {
//     t.test('does not throw an error', t => {
//       array.indexOf(4)
//       // server().then((c) => console.log("sdfa"))
//       t.end()
//     })
//     t.equal(array.indexOf(4), -1, 'returns -1')
//     t.end()
//   })
//   t.end()
// })
// t.pass('this is fine')





const tap = require('tap')
const supertest = require('supertest')
const buildFastify = require('../src/app')

tap.test('GET `/` route', async (t: any) => {
  const fastify = buildFastify()

  t.teardown(() => fastify.close())

  await fastify.ready()

  const response = await supertest(fastify.server)
    .get('/')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
  t.same(response.body, { hello: 'world' })
})
