import { Sequelize } from 'sequelize-typescript'
import TransactionModel from './transaction.model'
import Transaction from '../domain/transaction.entity'
import TransactionRepository from './transaction.repository'

describe('Transaction Repository', () => {
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

  it('should save a transaction', async () => {
    const transaction = new Transaction({
      orderId: 'o1',
      amount: 20
    })
    transaction.approve()
    const transactionRepository = new TransactionRepository()
    const output = await transactionRepository.save(transaction)
    expect(output).toBeDefined()
    expect(output.id).toBe(transaction.id)
    expect(output.amount).toBe(transaction.amount)
    expect(output.orderId).toBe(transaction.orderId)
    expect(output.createdAt).toBe(transaction.createdAt)
    expect(output.updatedAt).toBe(transaction.updatedAt)
  })
})
