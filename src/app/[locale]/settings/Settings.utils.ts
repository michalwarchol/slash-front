import { TUser } from "@/types/user";

import { TErrorMessages, TFormValues, TMessages } from "./Settings.types";

export const getInitialValues = (user: TUser): TFormValues => ({
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  type: user.type,
  avatar: null,
});

export const getMessages = (t: (key: string) => string): TMessages => {
  return {
    title: t("Settings.title"),
    userData: t("Settings.userData"),
    firstName: t("Settings.firstName"),
    lastName: t("Settings.lastName"),
    email: t("Settings.email"),
    role: t("Settings.role"),
    uploadProfilePic: t("Settings.uploadProfilePic"),
    maxFileSize: t("Settings.maxFileSize"),
    password: t("Settings.password"),
    success: t("Settings.success"),
    submit: t("Settings.submit"),
  };
};

export const getErrorMessages = (
  t: (key: string) => string
): TErrorMessages => ({
  default: t("apiErrors.default"),
  required: t("errors.required"),
  fileTooLarge: t("errors.fileTooLarge"),
});
