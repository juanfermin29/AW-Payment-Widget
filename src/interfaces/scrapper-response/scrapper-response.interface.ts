import { ScrappingProcessState } from "../scrapping-context-data/scrapping-context-data.interface";

export interface ScrapperResponse {
  status: ScrappingProcessState;
  error?: string | string[];
  internalError?: boolean;
  dataStack?: any;
}

