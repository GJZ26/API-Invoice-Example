import GetUseCase from "../application/GetUseCase";
import MakeUseCase from "../application/MakeUseCase";
import MySqlPaymentRepository from "./MySqlPaymentRepository";
import GettController from "./controllers/GetController";
import MakeController from "./controllers/MakeController";
import AccessTokenService from "./helpers/AccessTokenService";
import SendPaymentService from "./helpers/SendPaymentService";

export const mySqlPaymentRepository = new MySqlPaymentRepository();
export const accessTokenService = new AccessTokenService();
export const sendPaymentService = new SendPaymentService();

sendPaymentService.init();

export const getUseCase = new GetUseCase(
  mySqlPaymentRepository,
  accessTokenService
);

export const makeUseCase = new MakeUseCase(
  mySqlPaymentRepository,
  accessTokenService,
  sendPaymentService
);

export const getController = new GettController(getUseCase);
export const makeController = new MakeController(makeUseCase);
