import { Sequelize } from 'sequelize-typescript'
import ProductModel from '../repository/product.model'
import StoreCatalogFacadeFactory from '../factory/facade.factory'

describe('ProductAdmFacade Test', () => {
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
    const storeCatalogFacade = StoreCatalogFacadeFactory.create()
    const output = await storeCatalogFacade.findAll({})
    expect(output.products).toHaveLength(2)
    expect(output.products[0].id).toEqual('1')
    expect(output.products[0].name).toEqual('Product 1')
    expect(output.products[0].description).toEqual('Product 1 description')
    expect(output.products[0].salesPrice).toEqual(20)
    expect(output.products[1].id).toEqual('2')
    expect(output.products[1].name).toEqual('Product 2')
    expect(output.products[1].description).toEqual('Product 2 description')
    expect(output.products[1].salesPrice).toEqual(10)
  })

  it('Should find a product', async () => {
    await ProductModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      salesPrice: 20
    })
    const storeCatalogFacade = StoreCatalogFacadeFactory.create()
    const input = { id: '1' }
    const output = await storeCatalogFacade.find(input)
    expect(output.id).toEqual('1')
    expect(output.name).toEqual('Product 1')
    expect(output.description).toEqual('Product 1 description')
    expect(output.salesPrice).toEqual(20)
  })
})
