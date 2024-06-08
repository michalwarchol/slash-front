import { TranslationValues } from "next-intl";

import { TErrorMessages, TErrorParams } from "./RemindPassword.types";

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
