import { object, string } from "yup";

export const awPaymentWidgetSchema = object({
  country: string().required("country prop is not found"),
  currency: string().required("currency prop is not found"),
});
