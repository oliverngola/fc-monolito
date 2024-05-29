import express, { Request, Response } from 'express'
import AddProductUseCase from '../../modules/product-adm/usecase/add-product/add-product.usecase'
import ProductRepositoryAdm from '../../modules/product-adm/repository/product.repository'
import CheckStockUseCase from '../../modules/product-adm/usecase/check-stock/check-stock.usecase'
import FindAllProductsUseCase from '../../modules/store-catalog/usecase/find-all-products/find-all-products.usecase'
import ProductRepositoryStoreCatalog from '../../modules/store-catalog/repository/product.repository'
import FindProductUseCase from '../../modules/store-catalog/usecase/find-product/find-product.usecase'

export const productRoute = express.Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
productRoute.post('', async (request: Request, response: Response) => {
  const usecase = new AddProductUseCase(new ProductRepositoryAdm())
  try {
    const productDto = {
      name: request.body.name,
      description: request.body.description,
      purchasePrice: request.body.purchasePrice,
      stock: request.body.stock
    }
    const output = await usecase.execute(productDto)
    response.send(output)
  } catch (error) {
    response.status(500).send(error)
  }
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
productRoute.get('/:id/check-stock', async (request: Request, response: Response) => {
  const usecase = new CheckStockUseCase(new ProductRepositoryAdm())
  try {
    const productDto = {
      productId: request.params.id
    }
    const output = await usecase.execute(productDto)
    response.send(output)
  } catch (error) {
    response.status(500).send(error)
  }
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
productRoute.get('', async (request: Request, response: Response) => {
  const usecase = new FindAllProductsUseCase(new ProductRepositoryStoreCatalog())
  try {
    const output = await usecase.execute({})
    response.send(output)
  } catch (error) {
    response.status(500).send(error)
  }
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
productRoute.get('/:id', async (request: Request, response: Response) => {
  const usecase = new FindProductUseCase(new ProductRepositoryStoreCatalog())
  try {
    const output = await usecase.execute({ id: request.params.id })
    response.send(output)
  } catch (error) {
    response.status(500).send(error)
  }
})
