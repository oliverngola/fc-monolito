import { app, sequelize } from '../express'
import request from 'supertest'

describe('E2E test for checkout', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a checkout', async () => {
    const clientResponse = await request(app)
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
    const productResponse = await request(app)
      .post('/products')
      .send({
        name: 'product',
        description: 'description',
        purchasePrice: 100,
        stock: 10
      })
    const response = await request(app)
      .post('/checkout')
      .send({
        clientId: clientResponse.body.id,
        products: [
          {
            productId: productResponse.body.id
          }
        ]
      })

    expect(response.status).toBe(200)
    expect(response.body.id).toBeDefined()
    expect(response.body.invoiceId).toBeDefined()
    expect(response.body.status).toBe('pending')
  })
})
