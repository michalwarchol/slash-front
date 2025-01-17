"use server";

import Fetch from "@/utils/requestHandler";

export async function getStudentStartedCourses(page: number, perPage: number) {
  const { data } = await Fetch.get(
    `/statistics/progress?page=${page}&perPage=${perPage}&hasEnded=0`
  );

  return data;
}

export async function getCourseTypes() {
  const data = await Fetch.get("/courses/types", { cache: "force-cache" });

  return data;
}

export async function getTypeCourses(
  name: string,
  page: number = 1,
  perPage: number = 8
) {
  const { data } = await Fetch.get(
    `/courses/by-category-name?name=${name}&page=${page}&perPage=${perPage}`
  );

  return data;
}
