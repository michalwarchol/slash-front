import { TErrorMessages, TMessages } from "./CourseUpload.types";

export const getMessages = (t: (key: string) => string): TMessages => {
  return {
    title: t("CourseUpload.title"),
    name: t("CourseUpload.name"),
    description: t("CourseUpload.description"),
    thumbnail: t("CourseUpload.thumbnail"),
    video: t("CourseUpload.video"),
    uploadButton: t("CourseUpload.uploadButton"),
    submit: t("CourseUpload.submit"),
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
