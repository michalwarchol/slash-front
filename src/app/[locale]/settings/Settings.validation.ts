import { object, ref, string } from "yup";

import { TErrorMessages } from "./Settings.types";

export default (errorMessages: TErrorMessages) =>
  object({
    firstName: string().required(errorMessages.required),
    lastName: string().required(errorMessages.required),
  });

export const passwordChangeValidation = (errorMessages: TErrorMessages) =>
  object({
    oldPassword: string().required(errorMessages.required),
    newPassword: string()
      .min(8, errorMessages.min)
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/, errorMessages.password)
      .required(errorMessages.required),
    confirmNewPassword: string()
      .oneOf([ref("newPassword")], errorMessages.confirmPasswordDoesNotMatch)
      .required(errorMessages.required),
  });
