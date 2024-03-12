import { object, string,mixed} from "yup";

export const awPaymentWidgetSchema = object({
  country: string().required("country prop not found"),
  currency: string().required("currency prop not found"),
  text: string().required("text prop not found"),
  widgetTokenCallback: mixed().required('widgetTokenCallback prop not found') 
});
