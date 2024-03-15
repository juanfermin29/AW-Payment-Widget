import { DataStack } from "../datastack/datastack";

export interface ScrappingContextData {
  state: ScrappingProcessState;
  step?: StepMessageEvent | null;
  dynamicInputs?: ScrapperInputRequired[] | null;
  dynamicSelect?: ScrapperInputSelect[] | null;
  confirmation?: string | null;
  dataStack?: DataStack;
  error?: string | string[];
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

export interface ScrapperInputEvent {
  title?: string;
  subtitle?: string;
  inputs: ScrapperInputRequired[];
}

export interface ScrapperInputRequired {
  isDynamicLabel?: boolean;
  name: string;
  label: string;
  type: "text" | "password" | "email" | "number";
  validation?: ScrapperInputValidation[];
  segments?: number;
  timeout?: number;
}

export interface ScrapperInputValidation {
  key?: number;
  length?: number;
  format?: string;
  message: string;
}

export interface ScrapperSelecStepEvent {
  title?: string;
  subtitle?: string;
  options: ScrapperInputSelect[];
}

export interface ScrapperInputSelect {
  value: string;
  text: string;
}

export interface StepMessageEvent {
  title?: string;
  subtitle?: string;
  porcent?: number;
}
