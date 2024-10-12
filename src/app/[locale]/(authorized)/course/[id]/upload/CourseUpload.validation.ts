import { mixed, object, string } from "yup";

import { TErrorMessages } from "./CourseUpload.types";

export default (errorMessages: TErrorMessages, isEdit: boolean) =>
  isEdit
    ? object({
      name: string().required(errorMessages.required),
      description: string().required(errorMessages.required),
    })
    : object({
      name: string().required(errorMessages.required),
      description: string().required(errorMessages.required),
      thumbnail: mixed().required(errorMessages.required),
      video: mixed().required(errorMessages.required),
    });
