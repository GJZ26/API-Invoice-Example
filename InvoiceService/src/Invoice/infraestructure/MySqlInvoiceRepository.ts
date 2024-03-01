import query from "../../database/Connection";
import InvoiceReponse from "../domain/DTOS/InvoiceResponse";
import InvoiceRepository from "../domain/InvoiceRepository";

export default class MySqlInvoiceRepository implements InvoiceRepository {
  async update(client_id: string, id: number): Promise<InvoiceReponse | null> {
    const sentence =
      "UPDATE payment SET status = ?, date = NOW() WHERE user_id = ? AND id = ?";
    const params = ["RECEIVED", client_id, id];
    try {
      await this.sleep(4000);
      const [result]: any = await query(sentence, params);

      if (!result) {
        return null;
      }

      const currentDate = new Date();

      let res: InvoiceReponse = {
        invoice_id: id,
        client_id: client_id,
        date: currentDate.toISOString()
      };

      return res;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async sleep(time_ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, time_ms));
  }
}
