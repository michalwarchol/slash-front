"use server";

import { TInitialValues } from "@/app/[locale]/(authorized)/add-course/AddCourse.types";
import Fetch from "@/utils/requestHandler";

export async function getCourseTypes() {
  const data = await Fetch.get("/courses/types");

  return data;
}

export async function getCourse(
  id?: string | string[],
  userId?: string
): Promise<{ course: TInitialValues | null }> {
  if (!id || !userId) {
    return {
      course: null,
    };
  }

  const data = await Fetch.get(`/courses/course/${id}`, { cache: "no-store" });

  if (!data) {
    return {
      course: null,
    };
  }

  if (data.creator.id !== userId) {
    return {
      course: null,
    };
  }

  const course = {
    id: data.id,
    name: data.name,
    description: data.description,
    type: data.type.mainType.name,
    subType: data.type.id,
  };

  return {
    course,
  };
}
