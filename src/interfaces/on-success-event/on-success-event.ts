import { Bank } from "../banks-response/bank-response.interface";

export interface OnSuccessEvent{
    amount: number;
    reference:string;
    payerBankSelected:Bank;
}