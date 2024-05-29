import express, { Request, Response } from 'express'
import AddClientUseCase from '../../modules/client-adm/usecase/add-client/add-client.usecase'
import ClientRepository from '../../modules/client-adm/repository/client.repository'
import FindClientUseCase from '../../modules/client-adm/usecase/find-client/find-client.usecase'

export const clientRoute = express.Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
clientRoute.post('', async (request: Request, response: Response) => {
  const usecase = new AddClientUseCase(new ClientRepository())
  try {
    const clientDto = {
      name: request.body.name,
      email: request.body.email,
      document: request.body.document,
      street: request.body.street,
      number: request.body.number,
      complement: request.body.complement,
      city: request.body.city,
      state: request.body.state,
      zipCode: request.body.zipCode
    }
    const output = await usecase.execute(clientDto)
    response.send(output)
  } catch (error) {
    response.status(500).send(error)
  }
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
clientRoute.get('/:id', async (request: Request, response: Response) => {
  const usecase = new FindClientUseCase(new ClientRepository())
  try {
    const output = await usecase.execute({ id: request.params.id })
    response.send(output)
  } catch (error) {
    response.status(500).send(error)
  }
})
