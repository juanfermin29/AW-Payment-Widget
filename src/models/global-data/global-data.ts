import { LoadingState } from "../index";

export class GlobalData {
  widgetToken: string = "";
  amount: number = 0;
  country: string = "";
  selectedBank = "";
  modalIsVisible: boolean = false;
  loadingState: LoadingState = { isLoading: false };
}
