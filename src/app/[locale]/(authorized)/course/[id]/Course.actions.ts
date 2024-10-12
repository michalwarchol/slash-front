"use server";

import Fetch from "@/utils/requestHandler";

export async function getCourse(
  lang: string,
  id?: string | string[],
  userId?: string
) {
  if (!id) {
    return {};
  }

  const data = await Fetch.get(`/courses/course/${id}`, { cache: "no-store" });
  if (data.statusCode === 404) {
    return {
      course: null,
      statistics: null,
    };
  }

  if (!data) {
    return {
      course: null,
      statistics: null,
    };
  }

  const course = {
    ...data,
    type: {
      id: data.type.id,
      name: data.type.name,
      value: lang && lang === "pl" ? data.type.valuePl : data.type.valueEn,
      mainType: {
        id: data.type.mainType.id,
        name: data.type.mainType.name,
        value:
          lang && lang === "pl"
            ? data.type.mainType.valuePl
            : data.type.mainType.valueEn,
      },
    },
  };

  if (userId) {
    const statistics = await Fetch.get(`/courses/user_statistics/${id}`, {
      cache: "no-store",
    });

    return {
      course,
      statistics,
    };
  }

  return {
    course,
    statistics: {
      isLiked: false,
    },
  };
}
