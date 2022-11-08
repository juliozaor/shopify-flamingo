import test from 'japa'
import supertest from 'supertest'
import { obtenerTokenAutorizacion } from '../TestsAuths'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api/v1/acciones`

test.group('Acciones', (group) => {

  group.timeout(10000)

  test('Espera que actualice una accion', async (assert) => {
    const { text } = await supertest(BASE_URL).put('/1').set('Authorization', `Bearer ${await obtenerTokenAutorizacion()}`)
    .send({
        nombre: "Consultar Accion",
        name: "Consultar Accion",
        filename: "filename",
        estado: true
    })
    .expect(200)
    assert.equal(true, text.includes('"mansaje":'))
  })
})