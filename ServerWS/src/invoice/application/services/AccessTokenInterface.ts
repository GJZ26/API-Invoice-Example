export default interface AccessTokenInterface {
  validate(token: string): boolean;
}
