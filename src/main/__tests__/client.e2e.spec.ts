import { app, sequelize } from '../express'
import request from 'supertest'

describe('E2E test for client', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a client', async () => {
    const response = await request(app)
      .post('/clients')
      .send({
        name: 'jose',
        email: 'email@email',
        document: '123',
        street: 'street',
        number: '123',
        city: 'city',
        zipCode: 'zipCode',
        state: 'state',
        complement: 'complement'
      })
    expect(response.status).toBe(200)
    expect(response.body.id).toBeDefined()
    expect(response.body.name).toBe('jose')
    expect(response.body.email).toBe('email@email')
    expect(response.body.address.street).toBe('street')
    expect(response.body.address.number).toBe('123')
    expect(response.body.address.city).toBe('city')
  })
})
