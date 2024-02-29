export default class Payment {
  constructor(
    id: number,
    user_id: string,
    concept: string,
    amount: number,
    date: string,
    status: "RECEIVED" | "PENDING"
  ) {}
}
