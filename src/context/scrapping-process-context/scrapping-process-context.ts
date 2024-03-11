import { map } from "nanostores";
import { ScrappingContextData, ScrappingProcessState } from "../../interfaces";

export const $scrappingContext = map<ScrappingContextData>({
  state: ScrappingProcessState.Iddle,
});
