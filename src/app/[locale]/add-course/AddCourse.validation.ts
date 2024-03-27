import { object, string } from "yup";

import { TErrorMessages } from "./AddCourse.types";

export default (errorMessages: TErrorMessages) =>
  object({
    name: string().required(errorMessages.required),
    description: string().required(errorMessages.required),
    type: string().required(errorMessages.required),
    subType: string().required(errorMessages.required),
  });
