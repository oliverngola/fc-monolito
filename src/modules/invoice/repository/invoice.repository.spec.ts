import { Sequelize } from 'sequelize-typescript'
import InvoiceModel from './invoice.model'
import InvoiceItemModel from './invoice-item.model'
import InvoiceRepository from './invoice.repository'
import Id from '../../@shared/domain/value-object/id.value-object'
import Invoice from '../domain/entity/invoice.entity'
import InvoiceItems from '../domain/entity/invoice-items.entity'
import Address from '../../@shared/domain/value-object/address.value-object'

describe('Invoice Repository', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      logging: false,
      sync: { force: true }
    })
    sequelize.addModels([InvoiceModel, InvoiceItemModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should generate a invoice', async () => {
    const invoice = new Invoice({
      id: new Id('1'),
      name: 'Invoice',
      document: 'Document',
      address: new Address({
        street: 'Street',
        number: '123',
        complement: 'C1',
        city: 'City',
        state: 'State',
        zipCode: 'Zip'
      }),
      items: [new InvoiceItems({
        id: new Id('i1'),
        name: 'Item 1',
        price: 15
      })]
    })
    const repository = new InvoiceRepository()
    await repository.generate(invoice)
    const invoiceDb = await InvoiceModel.findOne({ where: { id: '1' }, include: ['items'] })
    expect(invoiceDb).toBeDefined()
    expect(invoiceDb.id).toBe(invoice.id.id)
    expect(invoiceDb.name).toBe(invoice.name)
    expect(invoiceDb.document).toBe(invoice.document)
    expect(invoiceDb.street).toBe(invoice.address.street)
    expect(invoiceDb.number).toBe(invoice.address.number)
    expect(invoiceDb.complement).toBe(invoice.address.complement)
    expect(invoiceDb.city).toBe(invoice.address.city)
    expect(invoiceDb.state).toBe(invoice.address.state)
    expect(invoiceDb.zipCode).toBe(invoice.address.zipCode)
    expect(invoiceDb.total).toEqual(invoice.total)
    expect(invoiceDb.items[0].id).toEqual(invoice.items[0].id.id)
    expect(invoiceDb.items[0].name).toEqual(invoice.items[0].name)
    expect(invoiceDb.items[0].price).toEqual(invoice.items[0].price)
    expect(invoiceDb.createdAt).toStrictEqual(invoice.createdAt)
    expect(invoiceDb.updatedAt).toStrictEqual(invoice.updatedAt)
  })

  it('should find a invoice', async () => {
    const invoice = await InvoiceModel.create({
      id: '1',
      name: 'Invoice',
      document: 'Documet',
      street: 'Street',
      number: '123',
      complement: 'Cazenga',
      city: 'Luanda',
      state: 'Luanda',
      zipCode: 'string',
      total: 20,
      items: [{
        id: 'i1',
        name: 'Item 1',
        price: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      }],
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      include: [{ model: InvoiceItemModel }]
    })
    const repository = new InvoiceRepository()
    const output = await repository.find(invoice.id)
    expect(output.id.id).toEqual(invoice.id)
    expect(output.name).toEqual(invoice.name)
    expect(output.document).toEqual(invoice.document)
    expect(output.address.street).toEqual(invoice.street)
    expect(output.address.number).toEqual(invoice.number)
    expect(output.address.complement).toEqual(invoice.complement)
    expect(output.address.city).toEqual(invoice.city)
    expect(output.address.state).toEqual(invoice.state)
    expect(output.address.zipCode).toEqual(invoice.zipCode)
    expect(output.total).toEqual(invoice.total)
    expect(output.items[0].id.id).toEqual(invoice.items[0].id)
    expect(output.items[0].name).toEqual(invoice.items[0].name)
    expect(output.items[0].price).toEqual(invoice.items[0].price)
    expect(output.createdAt).toStrictEqual(invoice.createdAt)
    expect(output.updatedAt).toStrictEqual(invoice.updatedAt)
  })
})
