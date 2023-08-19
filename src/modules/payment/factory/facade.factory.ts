import PaymentFacade from '../facade/payment.facade'
import TransactionRepository from '../repository/transaction.repository'
import ProcessPaymentUseCase from '../usecase/process-payment/process-payment.usecase'

export default class PaymentFacadeFactory {
  static create () {
    const transactionRepository = new TransactionRepository()
    const processUseCase = new ProcessPaymentUseCase(transactionRepository)
    const facade = new PaymentFacade({ processUseCase })
    return facade
  }
}
