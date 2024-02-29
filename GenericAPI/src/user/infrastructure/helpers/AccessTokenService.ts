import AccessTokenInterface from "../../application/services/AccessTokenInterface";
import User from "../../domain/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default class AccessTokenService implements AccessTokenInterface {
  createToken(user: User): string {
    return jwt.sign(
      {
        id: user.id,
        name: user.name,
      },
      process.env["TOKEN_SECRET"] ?? "Default not-secure secret",
      { algorithm: "HS256" }
    );
  }

  validateToken(token: string): boolean {
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
}
