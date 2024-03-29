export interface ScrappingContextData {
  state: ScrappingProcessState;
  step?: StepMessageEvent  | null;
  dynamicInputs?: ScrapperInputRequired[]  | null;
  dynamicSelect?: ScrapperInputSelect[]  | null;
  confirmation?: string | null;
  dataStack?: any
}

export enum ScrappingProcessState {
  Canceled,
  Error,
  Approved,
  Iddle,
  Loading,
  DynamicInput,
  DynamicSelect,
  Confirmation,
  Alert,
  Finalized,
  TimeOut,
}

export interface ScrapperInputEvent{
  title?: string;
  subtitle?:string;
  inputs: ScrapperInputRequired[]
}

export interface ScrapperInputRequired {
  isDynamicLabel?: boolean;
  name: string;
  label: string;
  type: "text" | "password" | "email";
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

export interface  ScrapperSelecStepEvent{
  title?: string;
  subtitle?:string;
  options: ScrapperInputSelect[]
}

export interface ScrapperInputSelect {
  value: string;
  text: string;
}

export interface StepMessageEvent {
  title?: string;
  subtitle?: string;
  totalSteps?: number;
  finalizedSteps?: number;
}
