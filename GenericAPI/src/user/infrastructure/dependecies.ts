import AccessUseCase from "../application/AccessUseCase";
import MySqlUserRepository from "./MySqlUserRepository";
import AccessController from "./controllers/AccessController";
import AccessTokenService from "./helpers/AccessTokenService";

export const mySqlUserRepository = new MySqlUserRepository();
export const accessTokenService = new AccessTokenService();

export const accessUseCase = new AccessUseCase(
  mySqlUserRepository,
  accessTokenService
);

export const accessController = new AccessController(accessUseCase);
