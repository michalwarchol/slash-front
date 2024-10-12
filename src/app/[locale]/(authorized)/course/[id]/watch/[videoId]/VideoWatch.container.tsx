"use client";

import { FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { TSearchResult } from "@/types/course";
import { TPagination } from "@/types/pagination";
import { TComment, TVideoResponse } from "@/types/video";

import { increaseViews } from "./VideoWatch.actions";
import { TAddCommentValues, TProgress } from "./VideoWatch.types";
import {
  addComment,
  addEditProgress,
  addEditRating,
  getComments,
  getDetaultWatchTime,
} from "./VideoWatch.utils";
import View from "./VideoWatch.view";

interface IProps {
  videoId: string;
  video: TVideoResponse | null;
  progress: TProgress | null;
  userType?: "STUDENT" | "EDUCATOR";
  userId?: string;
  recommendedCourses: TSearchResult[];
}

export default function VideoWatchContainer({
  videoId,
  userType,
  video,
  progress,
  userId,
  recommendedCourses,
}: IProps) {
  const { back } = useRouter();
  if (video === null) {
    back();
    return null;
  }

  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  // video state
  const [data, setData] = useState<TVideoResponse>(video);

  // comments state
  const [comments, setComments] = useState<TComment[]>([]);
  const [loadingComments, setLoadingComments] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [orderBy, setOrderBy] = useState<string>("createdAt");
  const [order, setOrder] = useState<"ASC" | "DESC">("ASC");
  const [addCommentLoading, setAddCommentLoading] = useState<boolean>(false);
  const [commentsPagination, setCommentsPagination] = useState<TPagination>({
    count: 0,
    page: 1,
    perPage: 1,
    total: 0,
  });

  //progress state
  const [progressData, setProgressData] = useState<TProgress | null>(progress);

  const onSetOrderBy = (newOrderBy: string) => {
    setOrderBy(newOrderBy);
    setPage(1);
  };

  const onSetOrder = (newOrder: "ASC" | "DESC") => {
    setOrder(newOrder);
    setPage(1);
  };

  const onFetchMoreComments = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    setFirstLoad(false);
    setLoadingComments(true);
    getComments(videoId, page, 20, orderBy, order).then((response) => {
      setComments(response.data);
      setCommentsPagination(response.paginatorInfo);
      setLoadingComments(false);
    });
  }, []);

  useEffect(() => {
    if (!firstLoad) {
      setLoadingComments(true);
      getComments(videoId, page, 20, orderBy, order).then((response) => {
        setComments(response.data);
        setCommentsPagination(response.paginatorInfo);
        setLoadingComments(false);
      });
    }
  }, [orderBy, order]);

  useEffect(() => {
    if (!firstLoad) {
      setLoadingComments(true);
      getComments(videoId, page, 20, orderBy, order).then((response) => {
        setComments([...comments, ...response.data]);
        setCommentsPagination(response.paginatorInfo);
        setLoadingComments(false);
      });
    }
  }, [page]);

  const onAddComment = async (
    values: TAddCommentValues,
    formikBag: FormikHelpers<TAddCommentValues>
  ) => {
    setAddCommentLoading(true);
    const data = await addComment({ videoId, text: values.text });
    setAddCommentLoading(false);
    formikBag.resetForm();
    setComments([data, ...comments]);
    setCommentsPagination({
      ...commentsPagination,
      count: commentsPagination.count + 1,
      total: commentsPagination.total + 1,
    });
  };

  const onIncreaseViews = () => {
    increaseViews({ id: videoId });
  };

  const onRate = async (rating: number, id?: string) => {
    const result = await addEditRating({ videoId, rating, id });
    if (result.success && data) {
      setData({
        ...data,
        myRating: result.result.rating,
      });
    }
  };

  const onAddEditProgress = async (watchTime: number) => {
    if (!userId) {
      return;
    }

    const hasEnded = data.nextVideoId === null && watchTime === data.duration;
    const result = await addEditProgress({
      id: progressData?.id,
      videoId,
      watchTime,
      hasEnded,
    });

    if (result.success) {
      setProgressData({
        id: result.result.id,
        watchTime: result.result.watchTime,
        hasEnded: result.result.hasEnded,
        createdAt: result.result.createdAt,
      });
    }
  };

  if (!data) {
    return null;
  }

  return (
    <View
      data={data}
      userType={userType}
      comments={comments}
      commentsPagination={commentsPagination}
      loadingComments={loadingComments}
      addCommentLoading={addCommentLoading}
      onFetchMoreComments={onFetchMoreComments}
      onSetOrder={onSetOrder}
      onSetOrderBy={onSetOrderBy}
      onAddComment={onAddComment}
      onIncreaseViews={onIncreaseViews}
      onRate={onRate}
      onAddEditProgress={onAddEditProgress}
      defaultTime={getDetaultWatchTime(progress?.watchTime, data.duration)}
      isAuthor={userId === data.course.creator.id}
      recommendedCourses={recommendedCourses}
    />
  );
}
