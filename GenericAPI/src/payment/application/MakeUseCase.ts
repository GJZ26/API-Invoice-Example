import GetPayment from "../domain/DTOS/GetPayment";
import PaymentRepository from "../domain/PaymentRepository";
import AccessTokenInterface from "./service/AccessTokenInterface";
import SendPaymentInterface from "./service/SendPaymentInterface";

export default class MakeUseCase {
  constructor(
    readonly paymentRepository: PaymentRepository,
    readonly accessTokenInterface: AccessTokenInterface,
    readonly sendPaymentInterface: SendPaymentInterface
  ) {}

  async run(
    token: string,
    user_id: string,
    concept: string,
    amount: number
  ): Promise<GetPayment | null> {
    if (!this.accessTokenInterface.validate(token)) {
      return null;
    }

    try {
      const result = await this.paymentRepository.create(
        user_id,
        concept,
        amount
      );

      if (result === null) {
        return null;
      }

      const feedback = this.sendPaymentInterface.sendPayment(
        result.id,
        user_id,
        result.amount,
        result.concept
      );

      console.log(feedback)

      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
