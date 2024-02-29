import AccessReponse from "../domain/DTOS/AccessResponse";
import UserRepository from "../domain/UserRepository";
import AccessTokenInterface from "./services/AccessTokenInterface";

export default class AccessUseCase {
  constructor(
    readonly userRepository: UserRepository,
    readonly accessTokenInterface: AccessTokenInterface
  ) {}

  async run(email: string, password: string): Promise<AccessReponse | null> {
    try {
      const result = await this.userRepository.access(email, password);

      if (result === null) {
        return null;
      }

      const response: AccessReponse = {
        id: result.id,
        name: result.name,
        token: this.accessTokenInterface.createToken(result),
      };

      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
