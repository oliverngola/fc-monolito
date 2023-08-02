import AddProductUseCase from './add-product.usecase'

const MockRepository = () => {
  return {
    find: jest.fn(),
    add: jest.fn()
  }
}

describe('Add Product usecase unit test', () => {
  it('Should add a product', async () => {
    const productRepository = MockRepository()
    const usecase = new AddProductUseCase(productRepository)
    const input = {
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 20,
      stock: 30
    }
    const output = await usecase.execute(input)
    expect(productRepository.add).toHaveBeenCalled()
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      description: input.description,
      purchasePrice: input.purchasePrice,
      stock: input.stock,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    })
  })
})
