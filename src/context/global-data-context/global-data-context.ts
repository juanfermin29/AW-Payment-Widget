import { map } from "nanostores";
import { GlobalData } from "../../interfaces";
export const $dataContext = map<GlobalData>({
  amount: 0,
  country: "",
  currency: "",
  clientId: "",
  modalIsVisible: false,
  selectedBank: "",
  url: "",
  widgetToken: "",
});
