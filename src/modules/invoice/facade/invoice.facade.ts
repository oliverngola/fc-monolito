import UseCaseInterface from '../../@shared/usecase/use-case.interface'
import InvoiceFacadeInterface, {
  FindInvoiceFacadeInputDto,
  FindInvoiceFacadeOutputDto,
  GenerateInvoiceFacadeInputDto,
  GenerateInvoiceFacadeOutputDto
} from './invoice.facade.interface'

type UseCaseProps = {
  generateUsecase: UseCaseInterface
  findUsecase: UseCaseInterface
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
  private readonly _generateUsecase: UseCaseInterface
  private readonly _findUsecase: UseCaseInterface

  constructor (props: UseCaseProps) {
    this._findUsecase = props.findUsecase
    this._generateUsecase = props.generateUsecase
  }

  async generateInvoice (input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
    const invoice = await this._generateUsecase.execute(input)
    return { invoiceId: invoice.id }
  }

  async findInvoice (input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
    return await this._findUsecase.execute(input)
  }
}
