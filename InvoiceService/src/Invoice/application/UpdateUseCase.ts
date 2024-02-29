import InvoiceReponse from "../domain/DTOS/InvoiceResponse";
import InvoiceRepository from "../domain/InvoiceRepository";
import SendNotificationInterface from "./services/SendNotificationInterface";

export default class UpdateUseCase {
  constructor(
    readonly invoiceRepository: InvoiceRepository,
    readonly sendNotificationInterface: SendNotificationInterface
  ) {}
  async run(
    client_id: string,
    invoice_id: number
  ): Promise<InvoiceReponse | null> {
    try {
      const result = await this.invoiceRepository.update(client_id, invoice_id);
      if (result === null) {
        return null;
      }

      this.sendNotificationInterface.sendNotification(invoice_id, client_id);

      const response: InvoiceReponse = {
        client_id: client_id,
        invoice_id: invoice_id,
      };
      
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
