import AccessTokenInterface from "../../application/service/AccessTokenInterface";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export default class AccessTokenService implements AccessTokenInterface {
  validate(token: string): boolean {
    try {
      jwt.verify(
        token,
        process.env["TOKEN_SECRET"] ?? "Default not-secure secret"
      );
      return true;
    } catch (error) {
      return false;
    }
  }
  decode(token: string): string | null {
    return jwt.decode(token)?.toString() || "a";
  }
}
