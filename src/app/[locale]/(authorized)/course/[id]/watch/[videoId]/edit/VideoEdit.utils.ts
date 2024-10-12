import { TErrorMessages, TMessages } from "./VideoEdit.types";

export const getMessages = (t: (key: string) => string): TMessages => {
  return {
    title: t("VideoEdit.title"),
    name: t("CourseUpload.name"),
    description: t("CourseUpload.description"),
    uploadButton: t("CourseUpload.uploadButton"),
    submit: t("VideoEdit.save"),
    cancel: t("CourseUpload.cancel"),
  };
};

export const getErrorMessages = (
  t: (key: string) => string
): TErrorMessages => {
  return {
    default: t("apiErrors.default"),
    required: t("errors.required"),
  };
};
