import {
  ScrapperInputRequired,
  ScrapperInputValidation,
  ValidationRule,
} from "@/interfaces";
import * as yup from "yup";

export const getValidationSchema = (
  inputs: ScrapperInputRequired[]
): yup.ObjectSchema<any> => {
  let validationSchema = {};

  for (let index = 0; index < inputs.length; index++) {
    const input = inputs[index];

    if (input.validation?.length) {
      let stringYup = yup.string();
      let numericYup = yup.number();
      for (const validation of input.validation) {
        if (validation == null) {
          continue;
        }
        if (input.type == "number") {
          numericYup = validationSchemaNumber(validation, numericYup);
        } else {
          stringYup = validationSchemaString(validation, stringYup);
        }
      }
      validationSchema = {
        ...validationSchema,
        [input.name]: input.type === "number" ? numericYup : stringYup,
      };
    }
  }

  return yup.object(validationSchema);
};
const validationSchemaString = (
  validation: ScrapperInputValidation,
  stringYup: any
) => {
  if (validation.key == ValidationRule.notNull) {
    stringYup = stringYup.concat(yup.string().required(validation.message));
  }
  if (validation.key == ValidationRule.min) {
    stringYup = stringYup.concat(
      yup.string().min(Number(validation.length) ?? 10, validation.message)
    );
  }
  if (validation.key == ValidationRule.max) {
    stringYup = stringYup.concat(
      yup.string().max(Number(validation.length) ?? 10, validation.message)
    );
  }
  if (validation.key == ValidationRule.regex) {
    stringYup = stringYup.concat(
      yup
        .string()
        .trim()
        .matches(new RegExp(validation.format!), validation.message)
    );
  }
  return stringYup;
};
const validationSchemaNumber = (
  validation: ScrapperInputValidation,
  numericYup: any
) => {
  if (validation.key == ValidationRule.notNull) {
    numericYup = numericYup.concat(yup.number().required(validation.message));
  }
  if (validation.key == ValidationRule.number) {
    numericYup = numericYup.concat(yup.number().typeError(validation.message));
  }
  if (validation.key == ValidationRule.min) {
    numericYup = numericYup.concat(
      yup.number().min(Number(validation.length!), validation.message)
    );
  }
  if (validation.key == ValidationRule.max) {
    numericYup = numericYup.concat(
      yup.number().max(Number(validation.length!), validation.message)
    );
  }
  return numericYup;
};
