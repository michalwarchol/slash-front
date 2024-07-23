import { TCourseMainType, TCourseType } from "@/types/course";

import { TCoursesByType, TCourseTypeResult } from "./types";

export const formatCourseTypes = (
  courseTypes: TCourseMainType[],
  first: number
): TCourseType[] => {
  const subTypes: TCourseType[] = [];
  courseTypes.forEach((item) => {
    subTypes.push(
      ...item.subTypes.map((subType) => ({
        ...subType,
        mainType: {
          id: item.id,
          name: item.name,
          value: item.value,
        },
      }))
    );
  });

  return subTypes.slice(0, first);
};

export const matchCourseTypeWithCourses = (
  courseTypes: TCourseType[],
  foundCourses: Array<TCourseTypeResult[]>
): TCoursesByType[] => {
  return courseTypes.map((type, index) => ({
    type,
    result: foundCourses[index],
  }));
};
