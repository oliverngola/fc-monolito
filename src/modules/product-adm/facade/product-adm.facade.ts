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
  private readonly _addUseCase: any
  private readonly _checkStockUseCase: any

  constructor (useCaseProps: UseCaseProps) {
    this._addUseCase = useCaseProps.addUseCase
    this._checkStockUseCase = useCaseProps.checkStockUseCase
  }

  async addProduct (input: AddProductFacadeInputDto): Promise<void> {
    return this._addUseCase.execute(input)
  }

  async checkStock (input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
    return this._checkStockUseCase.execute(input)
  }
}
