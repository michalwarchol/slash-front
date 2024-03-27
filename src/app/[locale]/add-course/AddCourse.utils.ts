import { TranslationValues } from "next-intl";

import { TErrorMessages, TMessages } from "./AddCourse.types";

export const getMessages = (t: (key: string) => string): TMessages => {
  return {
    title: t("CourseAdd.title"),
    name: t("CourseAdd.name"),
    description: t("CourseAdd.description"),
    type: t("CourseAdd.type"),
    subType: t("CourseAdd.subType"),
    submit: t("CourseAdd.submit"),
  };
};

export const getErrorMessages = (
  t: (key: string, values?: TranslationValues) => string
): TErrorMessages => {
  return {
    required: t("errors.required"),
  };
};
