import { TranslationValues } from "next-intl";

import { TUser } from "@/types/user";

import {
  TApiErrorMessages,
  TErrorMessages,
  TErrorParams,
  TFormValues,
  TMessages,
} from "./Settings.types";

export const getInitialValues = (user: TUser): TFormValues => ({
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  type: user.type,
  avatar: null,
});

export const initialValuesForPasswordChange = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

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
    oldPassword: t("Settings.oldPassword"),
    newPassword: t("Settings.newPassword"),
    confirmNewPassword: t("Settings.confirmNewPassword"),
  };
};

export const getErrorMessages = (
  t: (key: string, values?: TranslationValues) => string,
  { passwordMin }: TErrorParams
): TErrorMessages => ({
  default: t("apiErrors.default"),
  required: t("errors.required"),
  fileTooLarge: t("errors.fileTooLarge"),
  password: t("errors.password"),
  confirmPasswordDoesNotMatch: t("errors.confirmPasswordDoesNotMatch"),
  min: t("errors.min", { min: passwordMin }),
});

export const getApiErrorMessages = (
  t: (key: string) => string
): TApiErrorMessages => {
  return {
    default: t("apiErrors.default"),
    credentialsInvalid: t("apiErrors.credentialsInvalid"),
  };
};
