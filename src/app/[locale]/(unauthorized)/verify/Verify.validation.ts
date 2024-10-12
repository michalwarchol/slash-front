import { object, string } from "yup";

import { TErrorMessages } from "./Verify.types";

export default (errorMessages: TErrorMessages) =>
  object({
    code: string().required(errorMessages.required),
  });
