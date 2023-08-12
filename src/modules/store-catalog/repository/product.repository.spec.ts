import { Sequelize } from 'sequelize-typescript'
import ProductModel from './product.model'
import ProductRepository from './product.repository'

describe('Product Repository', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      logging: false,
      sync: { force: true }
    })
    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('Should find all products', async () => {
    await ProductModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      salesPrice: 20
    })
    await ProductModel.create({
      id: '2',
      name: 'Product 2',
      description: 'Product 2 description',
      salesPrice: 10
    })
    const productRepository = new ProductRepository()
    const products = await productRepository.findAll()
    expect(products[0].id.id).toEqual('1')
    expect(products[0].name).toEqual('Product 1')
    expect(products[0].description).toEqual('Product 1 description')
    expect(products[0].salesPrice).toEqual(20)
    expect(products[1].id.id).toEqual('2')
    expect(products[1].name).toEqual('Product 2')
    expect(products[1].description).toEqual('Product 2 description')
    expect(products[1].salesPrice).toEqual(10)
  })

  it('Should find a product', async () => {
    const productRepository = new ProductRepository()
    await ProductModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      salesPrice: 20
    })
    const product = await productRepository.find('1')
    expect(product.id.id).toEqual('1')
    expect(product.name).toEqual('Product 1')
    expect(product.description).toEqual('Product 1 description')
    expect(product.salesPrice).toEqual(20)
  })
})
