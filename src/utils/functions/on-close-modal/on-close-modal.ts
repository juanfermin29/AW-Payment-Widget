import {
  $dataContext,
  $scrappingContext,
  $socketContext,
} from "../../../context";
import { ScrappingProcessState } from "../../../interfaces";

export const onCloseModal = () => {
  $dataContext.set({
    amount: 0,
    currency: "",
    country: "",
    clientId: "",
    selectedBank: "",
    widgetToken: "",
    modalIsVisible: false,
  });
  $scrappingContext.set({
    state: ScrappingProcessState.Iddle,
    confirmation: null,
    dynamicInputs: [],
    dynamicSelect: [],
    step: null,
    dataStack: null,
  });
  
  $socketContext.get().$socket?.disconnect();
  $socketContext.set({ $socket: null });
};
