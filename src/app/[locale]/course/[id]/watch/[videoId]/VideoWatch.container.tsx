"use client";

import { Spin } from "antd";
import { FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { TPagination } from "@/types/pagination";
import { TComment, TVideoResponse } from "@/types/video";

import { TAddCommentValues } from "./VideoWatch.types";
import {
  addComment,
  getComments,
  getVideo,
  increaseViews,
} from "./VideoWatch.utils";
import View from "./VideoWatch.view";

interface IProps {
  id: string;
  locale: string;
  videoId: string;
  userId?: string;
}

export default function VideoWatchContainer({ videoId, locale }: IProps) {
  const { back } = useRouter();
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  // video state
  const [data, setData] = useState<TVideoResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
    getVideo(videoId, locale).then((response) => {
      setLoading(false);
      if (response === null) {
        back();
        return;
      }
      setData(response);
    });
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
    const { data } = await addComment({ videoId, text: values.text });
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

  if (!data) {
    return null;
  }

  return loading ? (
    <Spin />
  ) : (
    <View
      data={data}
      comments={comments}
      commentsPagination={commentsPagination}
      loadingComments={loadingComments}
      addCommentLoading={addCommentLoading}
      onFetchMoreComments={onFetchMoreComments}
      onSetOrder={onSetOrder}
      onSetOrderBy={onSetOrderBy}
      onAddComment={onAddComment}
      onIncreaseViews={onIncreaseViews}
    />
  );
}
