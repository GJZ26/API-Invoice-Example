import User from "./User";

export default interface UserRepository {
  access(email: string, password: string): Promise<User | null>;
}
