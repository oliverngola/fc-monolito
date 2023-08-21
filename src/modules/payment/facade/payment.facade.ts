import UseCaseInterface from '../../@shared/usecase/use-case.interface'
import PaymentFacadeInterface, { PaymentFacadeInputDto, PaymentFacadeOutputDto } from './payment.facade.interface'

type UseCaseProps = {
  processUseCase: UseCaseInterface
}

export default class PaymentFacade implements PaymentFacadeInterface {
  private readonly _processUsecase: UseCaseInterface

  constructor (props: UseCaseProps) {
    this._processUsecase = props.processUseCase
  }

  async process (input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
    return await this._processUsecase.execute(input)
  }
}
