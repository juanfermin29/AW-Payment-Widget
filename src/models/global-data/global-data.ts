import { LoadingState } from "../index";

export interface GlobalData {
  widgetToken: string;
  amount: number;
  country: string;
  currency: string;
  selectedBank: string;
  modalIsVisible: boolean;
  loadingState: LoadingState;
}
