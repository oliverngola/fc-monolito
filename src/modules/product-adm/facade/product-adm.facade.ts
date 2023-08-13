import UseCaseInterface from '../../@shared/usecase/use-case.interface'
import ProductAdmFacadeInterface, {
  AddProductFacadeInputDto,
  CheckStockFacadeInputDto,
  CheckStockFacadeOutputDto
} from './product-adm.facade.interface'

export interface UseCaseProps {
  addUseCase: UseCaseInterface
  checkStockUseCase: UseCaseInterface
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  private readonly _addUseCase: UseCaseInterface
  private readonly _checkStockUseCase: UseCaseInterface

  constructor (useCaseProps: UseCaseProps) {
    this._addUseCase = useCaseProps.addUseCase
    this._checkStockUseCase = useCaseProps.checkStockUseCase
  }

  async addProduct (input: AddProductFacadeInputDto): Promise<void> {
    await this._addUseCase.execute(input)
  }

  async checkStock (input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
    return await this._checkStockUseCase.execute(input)
  }
}
