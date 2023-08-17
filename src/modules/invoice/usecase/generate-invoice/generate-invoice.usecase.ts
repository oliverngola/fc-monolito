import Address from '../../../@shared/domain/value-object/address.value-object'
import Id from '../../../@shared/domain/value-object/id.value-object'
import UseCaseInterface from '../../../@shared/usecase/use-case.interface'
import Invoice from '../../domain/invoice.entity'
import InvoiceItems from '../../domain/invoice-items.entity'
import InvoiceGateway from '../../gateway/invoice.gateway'
import { GenerateInvoiceInputDto, GenerateInvoiceOutputDto } from './generate-invoice.dto'

export default class GenerateInvoiceUseCase implements UseCaseInterface {
  constructor (
    private readonly _invoiceRepository: InvoiceGateway
  ) {}

  async execute (input: GenerateInvoiceInputDto): Promise<GenerateInvoiceOutputDto> {
    const invoice = new Invoice({
      id: new Id(),
      name: input.name,
      document: input.document,
      address: new Address({
        street: input.street,
        number: input.number,
        complement: input.complement,
        city: input.city,
        state: input.state,
        zipCode: input.zipCode
      }),
      items: input.items.map(item => (new InvoiceItems({
        id: new Id(item.id),
        name: item.name,
        price: item.price
      })))
    })
    await this._invoiceRepository.generate(invoice)
    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: invoice.items.map(item => ({
        id: item.id.id,
        name: item.name,
        price: item.price
      })),
      total: invoice.total
    }
  }
}
