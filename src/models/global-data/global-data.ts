import { LoadingState } from "../index";

export class GlobalData {
  widgetToken: string = "";
  amount: number = 0;
  country: string = "";
  selectedBank = "";
  loadingState: LoadingState = { isLoading: false, loadingMsg: "" };
}
