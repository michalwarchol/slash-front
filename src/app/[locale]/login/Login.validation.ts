import { object, string } from "yup";

import { TErrorMessages } from "./Login.types";

export default (errorMessages: TErrorMessages) =>
  object({
    email: string().email(errorMessages.email).required(errorMessages.required),
    password: string().required(errorMessages.required),
  });
