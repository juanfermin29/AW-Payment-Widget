export interface BankResponse {
  data: Bank[];
}

export interface Bank {
  _id: string;
  name: string;
  country: string;
  minAmount?: number;
  img?: string;
}
