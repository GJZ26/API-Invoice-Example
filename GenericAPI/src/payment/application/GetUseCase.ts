import GetPayment from "../domain/DTOS/GetPayment";
import PaymentRepository from "../domain/PaymentRepository";
import AccessTokenInterface from "./service/AccessTokenInterface";

export default class GetUseCase {
  constructor(
    readonly paymentRepository: PaymentRepository,
    readonly accessTokenInterface: AccessTokenInterface
  ) {}
  async run(user_id: string, token: string): Promise<GetPayment[] | null> {

    if (!this.accessTokenInterface.validate(token)) {
      return null;
    }

    try {
      const result = await this.paymentRepository.list(user_id);

      if (result === null) {
        return null;
      }

      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
