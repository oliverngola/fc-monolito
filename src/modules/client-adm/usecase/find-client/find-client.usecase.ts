import UseCaseInterface from '../../../@shared/usecase/use-case.interface'
import ClientGateway from '../../gateway/client.gateway'
import { FindClientInputDto, FindClientOutputDto } from './find-client.dto'

export default class FindClientUseCase implements UseCaseInterface {
  constructor (
    private readonly _clientRepository: ClientGateway
  ) {}

  async execute (input: FindClientInputDto): Promise<FindClientOutputDto> {
    const client = await this._clientRepository.find(input.id)
    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      document: client.document,
      street: client.address.street,
      number: client.address.number,
      complement: client.address.complement,
      city: client.address.city,
      state: client.address.state,
      zipCode: client.address.zipCode,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt
    }
  }
}
