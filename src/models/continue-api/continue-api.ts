export interface ContinueApiBody {
  widgetToken: string;
  bankId: string;
  currency: string;
  country: string;
}


export interface ContinueApiResponse{
    clientId: string;
    amount: number;
    currency: string;
    country: string;
    bankId: string;
}