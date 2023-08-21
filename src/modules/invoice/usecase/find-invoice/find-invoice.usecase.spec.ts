import Invoice from '../../domain/entity/invoice.entity'
import InvoiceItems from '../../domain/entity/invoice-items.entity'
import Id from '../../../@shared/domain/value-object/id.value-object'
import Address from '../../../@shared/domain/value-object/address.value-object'
import FindInvoiceUseCase from './find-invoice.usecase'

const address = new Address({
  street: 'Street 1',
  number: '123',
  complement: 'string',
  city: 'string',
  state: 'string',
  zipCode: 'string'
})

const invoice = new Invoice({
  id: new Id('1'),
  name: 'Invoice 1',
  document: 'Document 1',
  address,
  items: [
    new InvoiceItems({
      id: new Id('i1'),
      name: 'Item 1',
      price: 10
    }),
    new InvoiceItems({
      id: new Id('i2'),
      name: 'Item 2',
      price: 20
    })
  ],
  createdAt: new Date(),
  updatedAt: new Date()
})

const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice))
  }
}

describe('Find Invoice usecase unit test', () => {
  it('Should find a invoice', async () => {
    const invoiceRepository = MockRepository()
    const usecase = new FindInvoiceUseCase(invoiceRepository)
    const input = { id: '1' }
    const output = await usecase.execute(input)
    expect(invoiceRepository.find).toHaveBeenCalled()
    expect(output).toBeDefined()
    expect(output.id).toBe(invoice.id.id)
    expect(output.name).toBe(invoice.name)
    expect(output.document).toBe(invoice.document)
    expect(output.address).toEqual({
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode
    })
    expect(output.items).toHaveLength(2)
    expect(output.items).toEqual([{
      id: invoice.items[0].id.id,
      name: invoice.items[0].name,
      price: invoice.items[0].price
    }, {
      id: invoice.items[1].id.id,
      name: invoice.items[1].name,
      price: invoice.items[1].price
    }])
    expect(output.createdAt).toBe(invoice.createdAt)
  })
})
