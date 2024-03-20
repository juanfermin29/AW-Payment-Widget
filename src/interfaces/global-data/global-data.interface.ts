import { Bank } from "../banks-response/bank-response.interface";

export interface GlobalData {
  widgetToken: string;
  amount: number;
  country: string;
  currency: string;
  clientId: string;
  selectedBank: Bank | null;
  url: string;
  modalIsVisible: boolean;
}
