import { object, ref, string } from "yup";

import { TErrorMessages } from "./RemindPassword.types";

export default (errorMessages: TErrorMessages, phase: number) =>
  phase === 1
    ? object({
      email: string()
        .email(errorMessages.email)
        .required(errorMessages.required),
    })
    : object({
      code: string().required(errorMessages.required),
      newPassword: string()
        .min(8, errorMessages.min)
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
          errorMessages.password
        )
        .required(errorMessages.required),
      confirmNewPassword: string()
        .oneOf(
          [ref("newPassword")],
          errorMessages.confirmPasswordDoesNotMatch
        )
        .required(errorMessages.required),
    });
