"use server";

import { TVideoResponse } from "@/types/video";
import Fetch from "@/utils/requestHandler";

import { TIncreaseViewsInput } from "./VideoWatch.types";

export const getUserCourseProgress = async (courseId: string) => {
  return Fetch.get(`/statistics/progress/${courseId}`);
};

export async function getVideo(
  id: string,
  lang: string
): Promise<TVideoResponse | null> {
  const data = await Fetch.get(`/video/${id}`);

  if (!data || data.statusCode === 404) {
    return null;
  }

  const ratingData = await Fetch.get(`/video/${id}/rating`);

  const type = data.course.type;
  const mainType = data.course.type.mainType;

  return {
    ...data,
    course: {
      ...data.course,
      type: {
        id: type.id,
        name: type.name,
        value: lang && lang === "pl" ? type.valuePl : type.valueEn,
        mainType: {
          id: mainType.id,
          name: mainType.name,
          value: lang && lang === "pl" ? mainType.valuePl : mainType.valueEn,
        },
      },
    },
    myRating: ratingData ? ratingData.rating : null,
  };
}

export async function increaseViews({ id }: TIncreaseViewsInput) {
  return Fetch.put(`/video/${id}/views`, {});
}

export async function getRecommendedCourses() {
  return Fetch.get("/statistics/recommended?page=1&perPage=10");
}
