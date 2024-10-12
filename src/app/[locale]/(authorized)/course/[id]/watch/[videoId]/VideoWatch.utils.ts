import Fetch from "@/utils/requestHandler";

import {
  TAddCommentInput,
  TAddEditProgressInput,
  TAddEditRatingInput,
} from "./VideoWatch.types";

export async function getComments(
  id: string,
  page: number,
  perPage: number,
  orderBy: string,
  order: string
) {
  const data = await Fetch.get(
    `/video/${id}/comments?page=${page}&perPage=${perPage}&orderBy=${orderBy}&order=${order}`
  );

  return data;
}

export async function addComment({ videoId, text }: TAddCommentInput) {
  return Fetch.post(`/video/${videoId}/comments`, {
    body: JSON.stringify({
      text,
    }),
  });
}

export async function addEditRating({
  videoId,
  rating,
  id,
}: TAddEditRatingInput) {
  return Fetch.post(`/video/${videoId}/rate`, {
    body: JSON.stringify({
      id,
      rating,
    }),
  });
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

export const getDetaultWatchTime = (
  watchTime: number | undefined,
  duration: number
) => {
  if (watchTime) {
    return watchTime === duration ? 0 : watchTime;
  }

  return 0;
};
