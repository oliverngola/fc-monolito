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
      address: 'Address 1'
    }
    const output = await usecase.execute(input)
    expect(clientRepository.add).toHaveBeenCalled()
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      email: input.email,
      address: input.address,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    })
  })
})
