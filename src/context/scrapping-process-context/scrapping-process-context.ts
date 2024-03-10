import { map } from "nanostores";
import { ScrappingContextData, ScrappingProcessState } from "../../models";

export const $scrappingContext = map<ScrappingContextData>({
  state: ScrappingProcessState.Iddle,
});
