import User from "../../domain/User";

export default interface AccessTokenInterface {
  createToken(user: User): string;
  validateToken(token: string): boolean;
}
