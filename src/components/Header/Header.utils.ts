import { TOption } from "@/components/Cascader/Cascader.types";
import { TCourseMainType } from "@/types/course";

import { TFormValues } from "./components/SearchFilters/SearchFilters.types";
import { TSearchFilterMessages, TSearchParams } from "./Header.types";

export const convertCourseTypesToCascaderOptions = (
  courseTypes: TCourseMainType[]
): TOption[] => {
  return courseTypes.map((courseType) => ({
    label: courseType.value,
    value: courseType.name,
    children: courseType.subTypes.map((subType) => ({
      label: subType.value,
      value: subType.name,
    })),
  }));
};

export const getSearchFilterMessages = (
  t: (key: string) => string
): TSearchFilterMessages => {
  return {
    search: t("search"),
    type: t("category"),
  };
};

export const getInitialValues = (
  searchParams: TSearchParams,
  courseTypes: TCourseMainType[]
): TFormValues => {
  const type = courseTypes.find((courseType) => {
    const found = courseType.subTypes.find(
      (subType) => subType.name === searchParams.typeName
    );
    return found !== undefined;
  });

  let subType = null;
  if (type) {
    subType = type.subTypes.find(
      (subType) => subType.name === searchParams.typeName
    );
  }

  return {
    search: searchParams.search || "",
    type: type && subType ? [type.name, subType.name] : [],
  };
};
