import { Sequelize } from 'sequelize-typescript'
import Id from '../../@shared/domain/value-object/id.value-object'
import ClientRepository from './client.repository'
import Client from '../domain/entity/client.entity'
import ClientModel from './client.model'
import Address from '../../@shared/domain/value-object/address.value-object'

describe('Client Repository', () => {
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
    const client = new Client({
      id: new Id('1'),
      name: 'Client 1',
      email: 'x@x.com',
      document: 'Document',
      address: new Address({
        street: 'Street',
        number: '123',
        complement: 'C1',
        city: 'City',
        state: 'State',
        zipCode: 'Zip'
      })
    })
    const repository = new ClientRepository()
    await repository.add(client)
    const clientDb = await ClientModel.findOne({ where: { id: '1' } })
    expect(clientDb).toBeDefined()
    expect(clientDb.id).toBe(client.id.id)
    expect(clientDb.name).toBe(client.name)
    expect(clientDb.email).toBe(client.email)
    expect(clientDb.document).toBe(client.document)
    expect(clientDb.street).toBe(client.address.street)
    expect(clientDb.number).toBe(client.address.number)
    expect(clientDb.complement).toBe(client.address.complement)
    expect(clientDb.city).toBe(client.address.city)
    expect(clientDb.state).toBe(client.address.state)
    expect(clientDb.zipCode).toBe(client.address.zipCode)
    expect(clientDb.createdAt).toStrictEqual(client.createdAt)
    expect(clientDb.updatedAt).toStrictEqual(client.updatedAt)
  })

  it('should find a client', async () => {
    const client = await ClientModel.create({
      id: '1',
      name: 'John Doe',
      email: 'x@x.com',
      document: 'Documet',
      street: 'Street',
      number: '123',
      complement: 'Cazenga',
      city: 'Luanda',
      state: 'Luanda',
      zipCode: 'string',
      createdAt: new Date(),
      updatedAt: new Date()
    })
    const repository = new ClientRepository()
    const output = await repository.find(client.id)
    expect(output.id.id).toEqual(client.id)
    expect(output.name).toEqual(client.name)
    expect(output.email).toEqual(client.email)
    expect(output.address.street).toEqual(client.street)
    expect(output.address.number).toEqual(client.number)
    expect(output.address.complement).toEqual(client.complement)
    expect(output.address.city).toEqual(client.city)
    expect(output.address.state).toEqual(client.state)
    expect(output.address.zipCode).toEqual(client.zipCode)
    expect(output.createdAt).toStrictEqual(client.createdAt)
    expect(output.updatedAt).toStrictEqual(client.updatedAt)
  })
})
