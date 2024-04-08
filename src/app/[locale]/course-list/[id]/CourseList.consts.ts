export const orderByOptions = (locale: string) => [
  {
    id: "course.name",
    name: "CourseList.name",
  },
  {
    id: locale === "pl" ? "type_valuePl" : "type_valueEn",
    name: "CourseList.mainType",
  },
  {
    id: locale === "pl" ? "subType_valuePl" : "subType_valueEn",
    name: "CourseList.type",
  },
  {
    id: "numberOfVideos",
    name: "CourseList.numberOfVideos",
  },
  {
    id: "numberOfLikes",
    name: "CourseList.numberOfLikes",
  },
];

export const orderOptions = [
  {
    id: "ASC",
    name: "CourseList.asc",
  },
  {
    id: "DESC",
    name: "CourseList.desc",
  },
];
