import { object, string } from "yup";

import { TErrorMessages } from "./Settings.types";

export default (errorMessages: TErrorMessages) =>
  object({
    firstName: string().required(errorMessages.required),
    lastName: string().required(errorMessages.required),
  });
