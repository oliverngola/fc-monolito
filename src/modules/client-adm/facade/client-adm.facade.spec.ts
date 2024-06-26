import { Sequelize } from 'sequelize-typescript'
import ClientAdmFacadeFactory from '../factory/client-adm.facade.factory'
import ClientModel from '../repository/client.model'
import ClientRepository from '../repository/client.repository'
import AddClientUseCase from '../usecase/add-client/add-client.usecase'
import ClientAdmFacade from './client-adm.facade'

describe('ClientAdmFacade test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      logging: false,
      sync: { force: true }
    })
    sequelize.addModels([ClientModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a client', async () => {
    const repository = new ClientRepository()
    const addUsecase = new AddClientUseCase(repository)
    const facade = new ClientAdmFacade({
      addUsecase,
      findUsecase: undefined
    })
    const input = {
      id: '1',
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
    await facade.add(input)
    const client = await ClientModel.findOne({ where: { id: '1' } })
    expect(client).toBeDefined()
    expect(client.name).toBe(input.name)
    expect(client.email).toBe(input.email)
    expect(client.street).toBe(input.street)
    expect(client.number).toBe(input.number)
    expect(client.complement).toBe(input.complement)
    expect(client.city).toBe(input.city)
    expect(client.state).toBe(input.state)
    expect(client.zipCode).toBe(input.zipCode)
  })

  it('should find a client', async () => {
    const facade = ClientAdmFacadeFactory.create()
    const input = {
      id: '1',
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
    await facade.add(input)
    const client = await facade.find({ id: '1' })
    expect(client).toBeDefined()
    expect(client.id).toBe(input.id)
    expect(client.name).toBe(input.name)
    expect(client.email).toBe(input.email)
    expect(client.street).toBe(input.street)
    expect(client.number).toBe(input.number)
    expect(client.complement).toBe(input.complement)
    expect(client.city).toBe(input.city)
    expect(client.state).toBe(input.state)
    expect(client.zipCode).toBe(input.zipCode)
  })
})
