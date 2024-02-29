import InvoiceReponse from "./DTOS/InvoiceResponse";

export default interface InvoiceRepository {
  update(client_id: string, id: number): Promise<InvoiceReponse | null>;
  sleep(time_ms:number):Promise<void>;
}
