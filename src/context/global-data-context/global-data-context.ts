import { map } from "nanostores";
import { GlobalData } from "../../models";
export const $dataContext = map<GlobalData>({
    amount: 0,
    country: '',
    currency: '',
    loadingState:{isLoading: false},
    modalIsVisible: false,
    selectedBank: '',
    widgetToken: ''
  })