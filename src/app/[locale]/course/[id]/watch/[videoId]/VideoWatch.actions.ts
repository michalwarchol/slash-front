"use server";
import { TVideoResponse } from "@/types/video";
import { Fetch } from "@/utils/axios";

export const getUserCourseProgress = async (courseId: string) => {
  return Fetch.get(`/statistics/progress/${courseId}`, {
    cache: "no-store",
  });
};

export async function getVideo(
  id: string,
  lang: string
): Promise<TVideoResponse | null> {
  const data = await Fetch.get(`/video/${id}`);

  if (!data) {
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
