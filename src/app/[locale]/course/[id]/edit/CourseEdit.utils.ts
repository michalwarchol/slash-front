import { TMessages } from "@/app/[locale]/add-course/AddCourse.types";

export const getMessages = (t: (key: string) => string): TMessages => {
  return {
    title: t("CourseEdit.title"),
    name: t("CourseAdd.name"),
    description: t("CourseAdd.description"),
    type: t("CourseAdd.type"),
    subType: t("CourseAdd.subType"),
    submit: t("CourseAdd.submit"),
    cancel: t("CourseAdd.cancel"),
  };
};
