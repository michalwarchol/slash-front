import { TVideoRating } from "@/types/video";
import axios, { Fetch } from "@/utils/axios";

import {
  TAddCommentInput,
  TAddEditProgressInput,
  TAddEditRatingInput,
  TIncreaseViewsInput,
} from "./VideoWatch.types";

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

export async function addEditRating({
  videoId,
  rating,
  id,
}: TAddEditRatingInput) {
  return axios.post<{ success: boolean; result: TVideoRating }>(
    `/video/${videoId}/rate`,
    {
      id,
      rating,
    }
  );
}

export async function addEditProgress({
  id,
  videoId,
  watchTime,
  hasEnded,
}: TAddEditProgressInput) {
  const method = id ? Fetch.put : Fetch.post;

  return method("/statistics/progress", {
    body: JSON.stringify({
      id,
      videoId,
      watchTime,
      hasEnded,
    }),
  });
}
