import express, { Request, Response } from 'express'
import ClientAdmFacadeFactory from '../../modules/client-adm/factory/client-adm.facade.factory'
import ProductAdmFacadeFactory from '../../modules/product-adm/factory/product-adm.facade.factory'
import StoreCatalogFacadeFactory from '../../modules/store-catalog/factory/store-catalog.facade.factory'
import PlaceOrderUseCase from '../../modules/checkout/usecase/place-order/place-order.usecase'
import OrderRepository from '../../modules/checkout/repository/order.repository'
import InvoiceFacadeFactory from '../../modules/invoice/factory/invoice.facade.factory'
import PaymentFacadeFactory from '../../modules/payment/factory/payment.facade.factory'

export const checkoutRoute = express.Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
checkoutRoute.post('', async (request: Request, response: Response) => {
  const usecase = new PlaceOrderUseCase(
    ClientAdmFacadeFactory.create(),
    ProductAdmFacadeFactory.create(),
    StoreCatalogFacadeFactory.create(),
    new OrderRepository(),
    InvoiceFacadeFactory.create(),
    PaymentFacadeFactory.create()
  )
  try {
    const checkoutDto = {
      clientId: request.body.clientId,
      products: request.body.products
        .map((p: { productId: any }) => { return { productId: p.productId } })
    }
    const output = await usecase.execute(checkoutDto)
    response.send(output)
  } catch (error) {
    response.status(500).send(error)
  }
})
