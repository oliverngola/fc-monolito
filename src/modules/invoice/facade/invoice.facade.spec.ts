import { Sequelize } from 'sequelize-typescript'
import InvoiceModel from '../repository/invoice.model'
import InvoiceItemModel from '../repository/invoice-item.model'
import InvoiceFacadeFactory from '../factory/invoice.facade.factory'

describe('InvoiceFacade test', () => {
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

  it('should generate and find same invoice', async () => {
    const facade = InvoiceFacadeFactory.create()
    const input = {
      name: 'Invoice 1',
      document: 'Document 1',
      street: 'Street',
      number: '123',
      complement: 'Cazenga',
      city: 'Luanda',
      state: 'Luanda',
      zipCode: 'Zip',
      items: [{
        id: 'i1',
        name: 'Item 1',
        price: 20
      }]
    }
    const invoice = await facade.generateInvoice(input)
    const output = await facade.findInvoice({ id: invoice.invoiceId })
    expect(output).toBeDefined()
    expect(output.id).toBeDefined()
    expect(output.name).toBe(input.name)
    expect(output.document).toBe(input.document)
    expect(output.address).toEqual({
      street: input.street,
      number: input.number,
      complement: input.complement,
      city: input.city,
      state: input.state,
      zipCode: input.zipCode
    })
    expect(output.items).toHaveLength(1)
    expect(output.items).toEqual([{
      id: input.items[0].id,
      name: input.items[0].name,
      price: input.items[0].price
    }])
    expect(output.createdAt).toBeDefined()
  })
})
