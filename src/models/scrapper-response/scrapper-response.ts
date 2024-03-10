import { ScrappingProcessState } from "../scrapping-context-data/scrapping-context-data";

export interface ScrapperResponse {
  status: ScrappingProcessState;
  error?: string | string[];
  internalError?: boolean;
  dataStack?: any;
  /*  assets?: ScrapperImage[]; */
}

