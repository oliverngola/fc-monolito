import express, { Express } from 'express'
import { Sequelize } from 'sequelize-typescript'
import ClientModel from '../modules/client-adm/repository/client.model'
import InvoiceModel from '../modules/invoice/repository/invoice.model'
import InvoiceItemModel from '../modules/invoice/repository/invoice-item.model'
import TransactionModel from '../modules/payment/repository/transaction.model'
import ProductModel from '../modules/product-adm/repository/product.model'
import ProductStoreModel from '../modules/store-catalog/repository/product.model'
import ClientOrder from '../modules/checkout/repository/client.order.model'
import ProductOrder from '../modules/checkout/repository/product.order.model'
import OrderModel from '../modules/checkout/repository/order.model'
import { productRoute } from './routes/product.route'
import { clientRoute } from './routes/clients.route'
import { invoiceRoute } from './routes/invoice.route'
import { checkoutRoute } from './routes/checkout.route'

export const app: Express = express()
app.use(express.json())
app.use('/clients', clientRoute)
app.use('/invoice', invoiceRoute)
app.use('/checkout', checkoutRoute)
app.use('/products', productRoute)

export let sequelize: Sequelize

async function setupDb () {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false
  })

  sequelize.addModels([
    ProductModel,
    ClientModel,
    ProductStoreModel,
    TransactionModel,
    OrderModel,
    ClientOrder,
    ProductModel,
    InvoiceModel,
    ProductOrder,
    InvoiceItemModel
  ])
  await sequelize.sync()
}

setupDb()
  .then(() => { console.log('DATABASE STARTED SUCCESSFULLY') })
  .catch(() => { console.log('DATABASE FAILED TO START') })
