import express, { Request, Response } from 'express'
import FindInvoiceUseCase from '../../modules/invoice/usecase/find-invoice/find-invoice.usecase'
import InvoiceRepository from '../../modules/invoice/repository/invoice.repository'

export const invoiceRoute = express.Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
invoiceRoute.get('/:id', async (request: Request, response: Response) => {
  const usecase = new FindInvoiceUseCase(new InvoiceRepository())
  try {
    const output = await usecase.execute({ id: request.params.id })
    response.send(output)
  } catch (error) {
    response.status(500).send(error)
  }
})
