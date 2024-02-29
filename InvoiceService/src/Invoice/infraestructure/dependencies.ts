import UpdateUseCase from "../application/UpdateUseCase";
import MySqlInvoiceRepository from "./MySqlInvoiceRepository";
import UpdateController from "./controllers/UpdateController";
import SendNotificationService from "./helpers/SendNotificationService";

export const mySqlInvoiceRepository = new MySqlInvoiceRepository();
export const sendNotificationService = new SendNotificationService();

sendNotificationService.init();

export const updateUseCase = new UpdateUseCase(
  mySqlInvoiceRepository,
  sendNotificationService
);

export const updateController = new UpdateController(updateUseCase);
