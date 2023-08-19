import Id from '../../../@shared/domain/value-object/id.value-object'
import Transaction from '../../domain/transaction.entity'
import ProcessPaymentUseCase from './process-payment.usecase'

const transaction = new Transaction({
  id: new Id('1'),
  amount: 100,
  orderId: 'o1',
  status: 'approved'
})

const transaction2 = new Transaction({
  id: new Id('1'),
  amount: 100,
  orderId: 'o1',
  status: 'declined'
})

const MockRepositoryDeclined = () => {
  return {
    save: jest.fn().mockReturnValue(transaction2)
  }
}

const MockRepository = () => {
  return {
    save: jest.fn().mockReturnValue(transaction)
  }
}

describe('Process Payment usecase unit test', () => {
  it('should approve a transaction', async () => {
    const paymentRepository = MockRepository()
    const usecase = new ProcessPaymentUseCase(paymentRepository)
    const input = {
      orderId: 'o1',
      amount: 100
    }
    const output = await usecase.execute(input)
    expect(paymentRepository.save).toHaveBeenCalled()
    expect(output.transactionId).toBe(transaction.id.id)
    expect(output.status).toBe('approved')
    expect(output.orderId).toBe('o1')
    expect(output.createdAt).toBe(transaction.createdAt)
    expect(output.updatedAt).toBe(transaction.updatedAt)
  })

  it('should decline a transaction', async () => {
    const paymentRepository = MockRepositoryDeclined()
    const usecase = new ProcessPaymentUseCase(paymentRepository)
    const input = {
      orderId: 'o1',
      amount: 50
    }
    const output = await usecase.execute(input)
    expect(paymentRepository.save).toHaveBeenCalled()
    expect(output.transactionId).toBe(transaction2.id.id)
    expect(output.status).toBe('declined')
    expect(output.orderId).toBe('o1')
    expect(output.createdAt).toBe(transaction2.createdAt)
    expect(output.updatedAt).toBe(transaction2.updatedAt)
  })
})
