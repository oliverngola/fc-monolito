import UseCaseInterface from '../../@shared/usecase/use-case.interface'
import StoreCatalogFacadeInterface, {
  FindAllStoreCatalogFacadeInputDto,
  FindAllStoreCatalogFacadeOutputDto,
  FindStoreCatalogFacadeInputDto,
  FindStoreCatalogFacadeOutputDto
} from './store-catalog.facade.interface'

export interface UseCaseProps {
  find: UseCaseInterface
  findAll: UseCaseInterface
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  private readonly _findUseCase: UseCaseInterface
  private readonly _findAllUseCase: UseCaseInterface

  constructor (useCaseProps: UseCaseProps) {
    this._findUseCase = useCaseProps.find
    this._findAllUseCase = useCaseProps.findAll
  }

  async find (input: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {
    return await this._findUseCase.execute(input)
  }

  async findAll (input: FindAllStoreCatalogFacadeInputDto): Promise<FindAllStoreCatalogFacadeOutputDto> {
    return await this._findAllUseCase.execute(input)
  }
}
