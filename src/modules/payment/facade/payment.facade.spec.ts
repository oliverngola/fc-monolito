import { Sequelize } from 'sequelize-typescript'
import PaymentFacadeFactory from '../factory/facade.factory'
import TransactionModel from '../repository/transaction.model'

describe('PaymentFacade test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      logging: false,
      sync: { force: true }
    })
    sequelize.addModels([TransactionModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a transaction', async () => {
    const facade = PaymentFacadeFactory.create()
    const input = {
      orderId: 'o1',
      amount: 100
    }
    const output = await facade.process(input)
    expect(output.transactionId).toBeDefined()
    expect(output.status).toBe('approved')
    expect(output.orderId).toBe('o1')
    expect(output.createdAt).toBeDefined()
    expect(output.updatedAt).toBeDefined()
  })
})
