import { TVideoResponse } from "@/types/video";
import axios from "@/utils/axios";

import { TAddCommentInput } from "./VideoWatch.types";

export async function getVideo(
  id: string,
  lang: string
): Promise<TVideoResponse | null> {
  const { data } = await axios.get(`/video/${id}`);

  if (!data) {
    return null;
  }

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
