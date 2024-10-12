import { object, ref, string } from "yup";

import { TErrorMessages } from "./register.types";

export default (errorMessages: TErrorMessages) =>
  object({
    firstName: string().required(errorMessages.required),
    lastName: string().required(errorMessages.required),
    email: string().email(errorMessages.email).required(errorMessages.required),
    password: string()
      .min(8, errorMessages.min)
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/, errorMessages.password)
      .required(errorMessages.required),
    confirmPassword: string()
      .oneOf([ref("password")], errorMessages.confirmPasswordDoesNotMatch)
      .required(errorMessages.required),
    role: string().required(errorMessages.required),
  });
