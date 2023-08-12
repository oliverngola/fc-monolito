export interface FindStoreCatalogFacadeInputDto {
  id: string
}

export interface FindStoreCatalogFacadeOutputDto {
  id: string
  name: string
  description: string
  salesPrice: string
}

export interface FindAllStoreCatalogFacadeOutputDto {
  products: Array<{
    id: string
    name: string
    description: string
    salesPrice: string
  }>
}

export default interface StoreCatalogFacadeInterface {
  find: (input: FindStoreCatalogFacadeInputDto) => Promise<FindStoreCatalogFacadeOutputDto>
  findAll: () => Promise<FindAllStoreCatalogFacadeOutputDto>
}
