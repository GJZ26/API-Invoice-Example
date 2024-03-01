import query from "../../database/Connection";
import GetPayment from "../domain/DTOS/GetPayment";
import PaymentRepository from "../domain/PaymentRepository";

export default class MySqlPaymentRepository implements PaymentRepository {
  async list(user_id: string): Promise<GetPayment[] | null> {
    const setence = "SELECT * FROM payment WHERE user_id = ?";
    const params: any[] = [user_id];

    try {
      const [result]: any = await query(setence, params);

      if (!result || result.length === 0) {
        return null;
      }

      const response: Array<GetPayment> = [];

      result.map(
        (element: {
          user_id: string;
          id: any;
          concept: any;
          amount: any;
          date: any;
          status: any;
        }) => {
          response.push({
            id: element.id,
            user_id: element.user_id,
            concept: element.concept,
            amount: element.amount,
            date: element.date,
            status: element.status,
          });
        }
      );

      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async create(
    user_id: string,
    concept: string,
    amount: number
  ): Promise<GetPayment | null> {
    const sentence =
      "INSERT INTO payment (user_id, concept, amount, date) VALUES (?, ?, ?, NULL)";
    const params = [user_id, concept, amount];

    try {
      const [result]: any = await query(sentence, params);

      if (!result || result.length === 0) {
        return null;
      }

      const response: GetPayment = {
        id: result.insertId,
        user_id: user_id,
        concept: concept,
        amount: amount,
        date: "",
        status: "PENDING",
      };

      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
