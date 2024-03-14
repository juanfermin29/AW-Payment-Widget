import { atom } from "nanostores";
import { Socket } from "socket.io-client";
import { $scrappingContext } from "../scrapping-process-context/scrapping-process-context";
import {
  ScrappingProcessState,
  StepMessageEvent,
  ScrapperSelecStepEvent,
  ScrapperInputEvent,
} from "../../interfaces";

export const $socketContext = atom<{
  $socket: Socket | null;
}>({
  $socket: null,
});
$socketContext.subscribe((value) => {
  if (value.$socket) {
    //#region ASK_FOR_DATA
    value.$socket.on("ASK_FOR_DATA", (event: ScrapperInputEvent) => {
      console.log(event);
      
      $scrappingContext.set({
        ...$scrappingContext.get(),
        state: ScrappingProcessState.DynamicInput,
        dynamicInputs: event.inputs,
        step: {
          title: event.title,
          subtitle: event.subtitle,
        },
      });
    });
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

    //#region UPDATE_STEP
    value.$socket.on("UPDATE_STEP", (step: { step: StepMessageEvent }) => {
      const { finalizedSteps, subtitle, title, totalSteps } = step.step;
      $scrappingContext.set({
        ...$scrappingContext.get(),
        step: {
          finalizedSteps: finalizedSteps,
          totalSteps: totalSteps,
          subtitle,
          title,
        },
      });
    });
    //#endregion

    //#region SHOW_ALERT
    value.$socket.on("SHOW_ALERT_MESSAGE", (e: any) => {
      $scrappingContext.set({
        ...$scrappingContext.get(),
        state: ScrappingProcessState.Alert,
        step: {
          title: e.msg,
        },
      });
    });
    //#endregion

    //#region REMOVE_ALERT_MESSAGE
    value.$socket.on("REMOVE_ALERT_MESSAGE", (_) => {
      $scrappingContext.set({
        ...$scrappingContext.get(),
        state: ScrappingProcessState.Loading,
      });
    });
    //#endregion

    //#region ASK_FOR_CONFIRMATION
    value.$socket.on("ASK_FOR_CONFIRMATION", (e: { msg: string }) => {
      $scrappingContext.set({
        ...$scrappingContext.get(),
        state: ScrappingProcessState.Confirmation,
        step: {
          title: e.msg,
        },
      });
    });
    //#endregion
  }
});
