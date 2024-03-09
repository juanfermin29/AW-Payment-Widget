import { LoadingState } from "../index";

export interface GlobalData {
  widgetToken: string;
  amount: number;
  country: string;
  selectedBank: string;
  modalIsVisible: boolean;
  loadingState: LoadingState;
}
