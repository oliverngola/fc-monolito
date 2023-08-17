import Address from '../../@shared/domain/value-object/address.value-object'
import Id from '../../@shared/domain/value-object/id.value-object'
import InvoiceItems from '../domain/invoice-items.entity'
import Invoice from '../domain/invoice.entity'
import InvoiceGateway from '../gateway/invoice.gateway'
import InvoiceItemModel from './invoice-item.model'
import InvoiceModel from './invoice.model'

export default class InvoiceRepository implements InvoiceGateway {
  async generate (invoice: Invoice): Promise<void> {
    await InvoiceModel.create({
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: invoice.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      })),
      total: invoice.total,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt
    }, {
      include: [{ model: InvoiceItemModel }]
    })
  }

  async find (id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({
      where: { id },
      include: ['items']
    })
    if (!invoice) {
      throw new Error(`Invoice with ${id} not found`)
    }
    const items = invoice.items.map(item =>
      new InvoiceItems({
        id: new Id(item.id),
        name: item.name,
        price: item.price
      })
    )
    return new Invoice({
      id: new Id(invoice.id),
      name: invoice.name,
      document: invoice.document,
      address: new Address({
        street: invoice.street,
        number: invoice.number,
        complement: invoice.complement,
        city: invoice.city,
        state: invoice.state,
        zipCode: invoice.zipCode
      }),
      items,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt
    })
  }
}
