import AddClientUseCase from './add-client.usecase'

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn()
  }
}

describe('Add Client usecase unit test', () => {
  it('Should add a client', async () => {
    const clientRepository = MockRepository()
    const usecase = new AddClientUseCase(clientRepository)
    const input = {
      name: 'John Doe',
      email: 'x@x.com',
      document: 'Document 1',
      street: 'Street',
      number: '123',
      complement: 'Cazenga',
      city: 'Luanda',
      state: 'Luanda',
      zipCode: 'string'
    }
    const output = await usecase.execute(input)
    expect(clientRepository.add).toHaveBeenCalled()
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      email: input.email,
      document: input.document,
      address: {
        street: input.street,
        number: input.number,
        complement: input.complement,
        city: input.city,
        state: input.state,
        zipCode: input.zipCode
      },
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    })
  })
})
