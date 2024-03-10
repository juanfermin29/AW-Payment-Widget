import { atom } from "nanostores";
import { Socket } from "socket.io-client";
import { $scrappingContext } from "../scrapping-process-context/scrapping-process-context";
import { ScrapperInputRequired, ScrappingProcessState, ScrapperInputSelect } from "../../models";

export const $socketContext = atom<{
  $socket: Socket | null;
}>({
  $socket: null,
});
$socketContext.subscribe((value) => {
  if (value.$socket) {
    /*  */
    value.$socket.on(
      "ASK_FOR_DATA",
      (dynamicInputs: ScrapperInputRequired[]) => {
        $scrappingContext.set({
          ...$scrappingContext.get(),
          state: ScrappingProcessState.DynamicInput,
          dynamicInputs,
        });
      /*   this._pageState = ScrappingProcessState.DynamicInput; */
      }
    );

    /*  */
    value.$socket.on(
      "ASK_FOR_OPTION",
      (dynamicSelect: ScrapperInputSelect[]) => {
        $scrappingContext.set({
          ...$scrappingContext.get(),
          state: ScrappingProcessState.DynamicSelect,
          dynamicSelect,
        });
    /*     this._pageState = ScrappingProcessState.DynamicSelect; */
      }
    );
  }
});
