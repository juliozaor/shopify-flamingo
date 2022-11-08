import test from 'japa'
import supertest from 'supertest'
import { obtenerTokenAutorizacion } from '../TestsAuths'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api/v1/acciones`

test.group('Acciones', (group) => {

  group.timeout(10000)
  
  test('Espera que guarde una accion', async (assert) => {
    const { text } = await supertest(BASE_URL).post('/').set('Authorization', `Bearer ${await obtenerTokenAutorizacion()}`)
    .send({
        id: 4,
        nombre: "Consultar Accion",
        name: "Consultar Accion",
        filename: "filename",
        estado: true
    })
    .expect(200)
    assert.equal(true, text.includes('"mansaje":'))
  })
})