export interface FindStoreCatalogFacadeInputDto {
  id: string
}

export interface FindStoreCatalogFacadeOutputDto {
  id: string
  name: string
  description: string
  salesPrice: number
}

export interface FindAllStoreCatalogFacadeInputDto {}

export interface FindAllStoreCatalogFacadeOutputDto {
  products: Array<{
    id: string
    name: string
    description: string
    salesPrice: number
  }>
}

export default interface StoreCatalogFacadeInterface {
  find: (input: FindStoreCatalogFacadeInputDto) => Promise<FindStoreCatalogFacadeOutputDto>
  findAll: (input: FindAllStoreCatalogFacadeInputDto) => Promise<FindAllStoreCatalogFacadeOutputDto>
}
