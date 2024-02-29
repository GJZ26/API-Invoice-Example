import GetPayment from "./DTOS/GetPayment";

export default interface PaymentRepository {
  list(user_id: string): Promise<Array<GetPayment> | null>;
  create(user_id: string, concept: string, amount: number): Promise<GetPayment | null>;
}
