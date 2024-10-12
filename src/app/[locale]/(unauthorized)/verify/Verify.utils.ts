import { TApiErrorMessages, TErrorMessages, TMessages } from "./Verify.types";

export const getMessages = (t: (key: string) => string): TMessages => {
  return {
    title: t("Verify.title"),
    content: t('Verify.content'),
    formTitle: t("Verify.formTitle"),
    code: t('Verify.code'),
    submit: t('Verify.submit'),
    logout: t('Verify.logout'),
  };
};

export const getErrorMessages = (t: (key: string) => string): TErrorMessages => {
  return {
    required: t('errors.required'),
  };
};

export const getApiErrorMessages = (
  t: (key: string) => string
): TApiErrorMessages => {
  return {
    default: t("apiErrors.default"),
    required: t("apiErrors.required"),
    invalid: t("apiErrors.invalid"),
    expired: t("apiErrors.expired"),
  };
};
