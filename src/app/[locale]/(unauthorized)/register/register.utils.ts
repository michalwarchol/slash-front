import { TranslationValues } from "next-intl";

import {
  TApiErrorMessages,
  TErrorMessages,
  TErrorParams,
  TMessages,
} from "./register.types";

export const getMessages = (t: (key: string) => string): TMessages => {
  return {
    title: t("Register.title"),
    formTitle: t("Register.formTitle"),
    firstName: t("Register.firstName"),
    lastName: t("Register.lastName"),
    email: t("Register.email"),
    password: t("Register.password"),
    confirmPassword: t("Register.confirmPassword"),
    role: t("Register.role"),
    submit: t("Register.submit"),
    haveAccount: t("Register.haveAccount"),
    login: t("Register.login"),
  };
};

export const getErrorMessages = (
  t: (key: string, values?: TranslationValues) => string,
  { passwordMin }: TErrorParams
): TErrorMessages => {
  return {
    email: t("errors.email"),
    required: t("errors.required"),
    password: t("errors.password"),
    confirmPasswordDoesNotMatch: t("errors.confirmPasswordDoesNotMatch"),
    min: t("errors.min", { min: passwordMin }),
  };
};

export const getApiErrorMessages = (
  t: (key: string) => string
): TApiErrorMessages => {
  return {
    default: t("apiErrors.default"),
    emailExists: t("apiErrors.emailExists"),
  };
};
