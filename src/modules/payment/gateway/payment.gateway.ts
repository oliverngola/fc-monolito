import Transaction from '../domain/entity/transaction.entity'

export default interface PaymentGateway {
  save: (input: Transaction) => Promise<Transaction>
}
