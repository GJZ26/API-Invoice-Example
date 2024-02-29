export default interface AccessTokenInterface {
  validate(token: string): boolean;
  decode(token: string): string | null;
}
