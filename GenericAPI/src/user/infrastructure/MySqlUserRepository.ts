import query from "../../database/Connection";
import User from "../domain/User";
import UserRepository from "../domain/UserRepository";

export default class MySqlUserRepository implements UserRepository {
  async access(email: string, password: string): Promise<User | null> {
    const sentence = "SELECT * FROM users WHERE email = ? AND password = ?";
    const params: any[] = [email, password];

    try {
      const [result]: any = await query(sentence, params);

      if (!result || result.length === 0) {
        return null;
      }

      const user_response = result[0];
      return new User(
        user_response.id,
        user_response.email,
        user_response.password,
        user_response.name
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
