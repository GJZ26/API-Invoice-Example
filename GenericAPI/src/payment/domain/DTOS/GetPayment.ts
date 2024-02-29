export default interface GetPayment {
  id: string;
  user_id: string;
  concept: string;
  amount: number;
  date: string;
  status: "RECEIVED" | "PENDING";
}
