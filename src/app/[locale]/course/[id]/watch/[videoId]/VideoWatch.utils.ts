import { TVideoRating, TVideoResponse } from "@/types/video";
import axios from "@/utils/axios";

import { TAddCommentInput, TAddEditRatingInput, TIncreaseViewsInput } from "./VideoWatch.types";

export async function getVideo(
  id: string,
  lang: string
): Promise<TVideoResponse | null> {
  const { data } = await axios.get(`/video/${id}`);

  if (!data) {
    return null;
  }

  const { data: ratingData } = await axios.get(`/video/${id}/rating`);

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
    myRating: ratingData || null,
  };
}

export async function getComments(
  id: string,
  page: number,
  perPage: number,
  orderBy: string,
  order: string
) {
  const { data } = await axios.get(
    `/video/${id}/comments?page=${page}&perPage=${perPage}&orderBy=${orderBy}&order=${order}`
  );

  return data;
}

export async function addComment({ videoId, text }: TAddCommentInput) {
  return axios.post(`/video/${videoId}/comments`, {
    text,
  });
}

export async function increaseViews({ id }: TIncreaseViewsInput) {
  return axios.put(`/video/${id}/views`);
}

export async function addEditRating({ videoId, rating, id }: TAddEditRatingInput) {
  return axios.post<{success: boolean, result: TVideoRating}>(`/video/${videoId}/rate`, {
    id,
    rating,
  });
}
