export interface ScrappingContextData {
  state: ScrappingProcessState;
  step?: StepMessage;
  dynamicInputs?: ScrapperInputRequired[];
  dynamicSelect?: ScrapperInputSelect[];
  confirmation?: string;
}

export enum ScrappingProcessState {
  Iddle=1,
  Loading ,
  DynamicInput,
  DynamicSelect,
  Confirmation,
  Finalized,
}

export interface ScrapperInputRequired {
  isDynamicLabel?: boolean;
  name: string;
  label: string;
  type: 'text' | 'password' | 'email';
  validation?: ScrapperInputValidation[] | any[];
  isSegment?: number;
  timeout?: number;
}

interface ScrapperInputValidation {
  key?: string;
  length?: number;
  format?: string;
  message: string;
}

interface ScrapperInputSelect {
  value: string;
  text: string;
}

interface StepMessage {
  title?: string;
  subtitle?: string;
  totalSteps?: number;
  finalizedSteps?: number;
}
