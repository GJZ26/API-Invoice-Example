export default class Invoice{
    constructor(
        id: number,
        user_id: string,
        concept: string,
        amount: number,
        date: string,
        status: "RECEIVED" | "PENDING"
      ) {}
}