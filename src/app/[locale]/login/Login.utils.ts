import { TranslationValues } from "next-intl";

import { TApiErrorMessages, TErrorMessages, TMessages } from "./Login.types";

export const getMessages = (t: (key: string) => string): TMessages => {
  return {
    title: t("Login.title"),
    titleContentP1: t("Login.titleContentP1"),
    titleContentP2: t("Login.titleContentP2"),
    formTitle: t("Login.formTitle"),
    email: t("Login.email"),
    password: t("Login.password"),
    dontHaveAccount: t("Login.dontHaveAccount"),
    register: t("Login.register"),
    login: t("Login.login"),
  };
};

export const getErrorMessages = (
  t: (key: string, values?: TranslationValues) => string
): TErrorMessages => ({
  email: t("errors.email"),
  required: t("errors.required"),
});

export const getApiErrorMessages = (
  t: (key: string) => string
): TApiErrorMessages => {
  return {
    default: t("apiErrors.default"),
    credentialsInvalid: t("apiErrors.credentialsInvalid"),
  };
};
