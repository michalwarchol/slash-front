"use server";

import Fetch from "@/utils/requestHandler";

export async function getStudentStartedCourses(page: number, perPage: number) {
  const { data } = await Fetch.get(
    `/statistics/progress?page=${page}&perPage=${perPage}&hasEnded=0`,
    { cache: "no-cache" }
  );

  return data;
}
