import Id from '../../../@shared/domain/value-object/id.value-object'
import Client from '../../domain/entity/client.entity'
import FindClientUseCase from './find-client.usecase'

const client = new Client({
  id: new Id('1'),
  name: 'John Doe',
  email: 'x@x.com',
  address: 'Address 1'
})

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(client))
  }
}

describe('Find Client usecase unit test', () => {
  it('Should find a client', async () => {
    const clientRepository = MockRepository()
    const usecase = new FindClientUseCase(clientRepository)
    const input = { id: '1' }
    const output = await usecase.execute(input)
    expect(clientRepository.find).toHaveBeenCalled()
    expect(output).toEqual({
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt
    })
  })
})
