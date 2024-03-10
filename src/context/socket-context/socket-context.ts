import { atom } from "nanostores";
import { Socket } from "socket.io-client";
import { $scrappingContext } from "../scrapping-process-context/scrapping-process-context";
import {
  ScrapperInputRequired,
  ScrappingProcessState,
  StepMessageEvent,
  ScrapperSelecStepEvent,
} from "../../models";

export const $socketContext = atom<{
  $socket: Socket | null;
}>({
  $socket: null,
});
$socketContext.subscribe((value) => {
  if (value.$socket) {
    //#region ASK_FOR_DATA
    value.$socket.on(
      "ASK_FOR_DATA",
      (dynamicInputs: ScrapperInputRequired[]) => {
        $scrappingContext.set({
          ...$scrappingContext.get(),
          state: ScrappingProcessState.DynamicInput,
          dynamicInputs,
        });
      }
    );
    //#endregion

    //#region ASK_FOR_OPTION
    value.$socket.on("ASK_FOR_OPTION", (event: ScrapperSelecStepEvent) => {
      $scrappingContext.set({
        ...$scrappingContext.get(),
        state: ScrappingProcessState.DynamicSelect,
        dynamicSelect: event.options,
        step: {
          subtitle: event.subtitle,
          title: event.title,
        },
      });
    });
    //#endregion

    //#region  UPDATE_STEP
    value.$socket.on("UPDATE_STEP", (step: StepMessageEvent) => {
      $scrappingContext.set({
        ...$scrappingContext.get(),
        step,
      });
    });
    //#endregion

      
    value.$socket.on("SHOW_ALERT_MESSAGE", (e: any) => {
      console.log(e);
      $scrappingContext.set({
        ...$scrappingContext.get(),
        state: ScrappingProcessState.Alert,
      });
    });
    value.$socket.on("REMOVE_ALERT_MESSAGE", (e: any) => {
      console.log(e);
      $scrappingContext.set({
        ...$scrappingContext.get(),
        state: ScrappingProcessState.Loading,

      });
    });
    value.$socket.on("ASK_FOR_CONFIRMATION", (e: any) => {
      console.log(e);
      $scrappingContext.set({
        ...$scrappingContext.get(),
        state: ScrappingProcessState.Confirmation,
      });
    });
  }
});
