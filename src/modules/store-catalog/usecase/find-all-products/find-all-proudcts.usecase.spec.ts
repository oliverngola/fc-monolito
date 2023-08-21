import Id from '../../../@shared/domain/value-object/id.value-object'
import Product from '../../domain/entity/product.entity'
import FindAllProductsUseCase from './find-all-products.usecase'

const product = new Product({
  id: new Id('1'),
  name: 'Product 1',
  description: 'Description 1',
  salesPrice: 2
})

const product2 = new Product({
  id: new Id('2'),
  name: 'Product 2',
  description: 'Description 2',
  salesPrice: 4
})

const MockRepository = () => ({
  find: jest.fn(),
  findAll: jest.fn().mockReturnValue(Promise.resolve([product, product2]))
})

describe('FindAllProducts usecase unit test', () => {
  it('should find all products', async () => {
    const productRepository = MockRepository()
    const usecase = new FindAllProductsUseCase(productRepository)
    const output = await usecase.execute({})
    expect(productRepository.findAll).toHaveBeenCalled()
    expect(output.products).toHaveLength(2)
    expect(output.products[0].id).toBe(product.id.id)
    expect(output.products[0].name).toBe(product.name)
    expect(output.products[0].description).toBe(product.description)
    expect(output.products[0].salesPrice).toBe(product.salesPrice)
    expect(output.products[1].id).toBe(product2.id.id)
    expect(output.products[1].name).toBe(product2.name)
    expect(output.products[1].description).toBe(product2.description)
    expect(output.products[1].salesPrice).toBe(product2.salesPrice)
  })
})
