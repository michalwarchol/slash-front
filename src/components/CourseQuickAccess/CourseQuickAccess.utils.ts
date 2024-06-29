import { TCourseFullType } from "@/types/course";

export const getCategoryValue = (locale: string, category: TCourseFullType) =>
  locale === "pl" ? category.valuePl : category.valueEn;
