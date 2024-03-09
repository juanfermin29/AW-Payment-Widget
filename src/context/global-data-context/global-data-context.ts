import { map } from "nanostores";
import { GlobalData } from "../../models";
export const $profile = map<GlobalData>({
    amount: 0,
    country: '',
    loadingState:{isLoading: false},
    modalIsVisible: false,
    selectedBank: '',
    widgetToken: ''
  })