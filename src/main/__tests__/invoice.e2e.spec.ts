import { app, sequelize } from '../express'
import request from 'supertest'

describe('E2E test for invoice', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should find an invoice', async () => {
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

    const checkout = await request(app)
      .post('/checkout')
      .send({
        clientId: clientResponse.body.id,
        products: [
          {
            productId: productResponse.body.id
          }
        ]
      })
    const response = await request(app)
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      .get(`/invoice/${checkout.body.invoiceId}`)
      .send()
    expect(response.body.id).toBeDefined()
    expect(response.body.name).toBe('jose')
    expect(response.body.items.length).toBe(1)
    expect(response.body.total).toBe(100)
  })
})
