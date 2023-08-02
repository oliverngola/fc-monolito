import { Sequelize } from 'sequelize-typescript'
import ProductModel from './product.model'
import ProductRepository from './product.repository'
import Product from '../domain/entity/product.entity'
import Id from '../../@shared/domain/value-object/id.value-object'

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

  it('Should create a product', async () => {
    const productRepository = new ProductRepository()
    const productProps = {
      id: new Id('1'),
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 20,
      stock: 200
    }
    const product = new Product(productProps)
    await productRepository.add(product)
    const productDb = await ProductModel.findOne({ where: { id: productProps.id.id } })
    expect(productProps.id.id).toEqual(productDb.id)
    expect(productProps.name).toEqual(productDb.name)
    expect(productProps.description).toEqual(productDb.description)
    expect(productProps.purchasePrice).toEqual(productDb.purchasePrice)
    expect(productProps.stock).toEqual(productDb.stock)
  })

  it('Should find a product', async () => {
    const productRepository = new ProductRepository()
    await ProductModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 20,
      stock: 200,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    const product = await productRepository.find('1')
    expect(product.id.id).toEqual('1')
    expect(product.name).toEqual('Product 1')
    expect(product.description).toEqual('Product 1 description')
    expect(product.purchasePrice).toEqual(20)
    expect(product.stock).toEqual(200)
  })
})
