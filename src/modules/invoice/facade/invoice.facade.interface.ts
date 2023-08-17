export interface GenerateInvoiceFacadeInputDto {
  name: string
  document: string
  street: string
  number: string
  complement: string
  city: string
  state: string
  zipCode: string
  items: Array<{
    id: string
    name: string
    price: number
  }>
}

export interface GenerateInvoiceFacadeOutputDto {
  invoiceId: string
}

export interface FindInvoiceFacadeInputDto {
  id: string
}

export interface FindInvoiceFacadeOutputDto {
  id: string
  name: string
  document: string
  address: {
    street: string
    number: string
    complement: string
    city: string
    state: string
    zipCode: string
  }
  items: Array<{
    id: string
    name: string
    price: number
  }>
  total: number
  createdAt: Date
}

export default interface InvoiceFacadeInterface {
  generateInvoice: (input: GenerateInvoiceFacadeInputDto) => Promise<GenerateInvoiceFacadeOutputDto>
  findInvoice: (input: FindInvoiceFacadeInputDto) => Promise<FindInvoiceFacadeOutputDto>
}
