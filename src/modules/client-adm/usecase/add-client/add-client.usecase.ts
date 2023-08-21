import Address from '../../../@shared/domain/value-object/address.value-object'
import Id from '../../../@shared/domain/value-object/id.value-object'
import UseCaseInterface from '../../../@shared/usecase/use-case.interface'
import Client from '../../domain/entity/client.entity'
import ClientGateway from '../../gateway/client.gateway'
import { AddClientInputDto, AddClientOutputDto } from './add-client.dto'

export default class AddClientUseCase implements UseCaseInterface {
  constructor (
    private readonly _clientRepository: ClientGateway
  ) {}

  async execute (input: AddClientInputDto): Promise<AddClientOutputDto> {
    const client = new Client({
      id: new Id(input.id) || new Id(),
      name: input.name,
      email: input.email,
      document: input.document,
      address: new Address({
        street: input.street,
        number: input.number,
        complement: input.complement,
        city: input.city,
        state: input.state,
        zipCode: input.zipCode
      })
    })
    await this._clientRepository.add(client)
    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      document: client.document,
      address: {
        street: client.address.street,
        number: client.address.number,
        complement: client.address.complement,
        city: client.address.city,
        state: client.address.state,
        zipCode: client.address.zipCode
      },
      createdAt: client.createdAt,
      updatedAt: client.updatedAt
    }
  }
}
