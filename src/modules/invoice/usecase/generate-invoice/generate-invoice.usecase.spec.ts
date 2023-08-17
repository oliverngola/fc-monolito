import GenerateInvoiceUseCase from './generate-invoice.usecase'

const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn()
  }
}

describe('Generate Invoice usecase unit test', () => {
  it('Should add a invoice', async () => {
    const invoiceRepository = MockRepository()
    const usecase = new GenerateInvoiceUseCase(invoiceRepository)
    const input = {
      name: 'Invoice 1',
      document: 'Document 1',
      street: 'Street',
      number: '123',
      complement: 'Cazenga',
      city: 'Luanda',
      state: 'Luanda',
      zipCode: 'string',
      items: [{
        id: 'i1',
        name: 'Item 1',
        price: 20
      }, {
        id: 'i2',
        name: 'Item 2',
        price: 5
      }]
    }
    const output = await usecase.execute(input)
    expect(invoiceRepository.generate).toHaveBeenCalled()
    expect(output).toBeDefined()
    expect(output.id).toBeDefined()
    expect(output.name).toBe(input.name)
    expect(output.street).toBe(input.street)
    expect(output.number).toBe(input.number)
    expect(output.complement).toBe(input.complement)
    expect(output.city).toBe(input.city)
    expect(output.state).toBe(input.state)
    expect(output.zipCode).toBe(input.zipCode)
    expect(output.items).toHaveLength(2)
    expect(output.items[0].id).toBe(input.items[0].id)
    expect(output.items[0].name).toBe(input.items[0].name)
    expect(output.items[0].price).toBe(input.items[0].price)
    expect(output.items[1].id).toBe(input.items[1].id)
    expect(output.items[1].name).toBe(input.items[1].name)
    expect(output.items[1].price).toBe(input.items[1].price)
  })
})
