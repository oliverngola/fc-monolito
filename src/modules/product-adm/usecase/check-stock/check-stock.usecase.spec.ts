import Id from '../../../@shared/domain/value-object/id.value-object'
import Product from '../../domain/entity/product.entity'
import CheckStockUseCase from './check-stock.usecase'

const product = new Product({
  id: new Id('1'),
  name: 'Produt 1',
  description: 'Product description',
  purchasePrice: 20,
  stock: 300
})

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product))
  }
}

describe('CheckStock usecase unit test', () => {
  it('Should get stock of a product', async () => {
    const productRepository = MockRepository()
    const usecase = new CheckStockUseCase(productRepository)
    const input = {
      productId: '1'
    }
    const output = await usecase.execute(input)
    expect(productRepository.find).toHaveBeenCalled()
    expect(output).toEqual({
      productId: product.id.id,
      stock: product.stock
    })
  })
})
