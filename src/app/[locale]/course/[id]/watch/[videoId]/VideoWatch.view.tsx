"use client";

import { DeleteOutlined } from "@ant-design/icons";
import { Avatar, Divider, message, Rate, Tooltip, Typography } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { SyntheticEvent, useState } from "react";
import { useTranslations } from "use-intl";

import { useRouter } from "@/app/navigation";
import { Link } from "@/app/navigation";
import Button from "@/components/Button";
import Comment from "@/components/Comment";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import VideoPlayer from "@/components/VideoPlayer";
import { TPagination } from "@/types/pagination";
import { TComment, TVideoResponse } from "@/types/video";
import axios from "@/utils/axios";

import {
  commentsSettingsInitialValues,
  orderByOptions,
  orderOptions,
} from "./VideoWatch.consts";
import styles from "./VideoWatch.module.scss";
import { TAddCommentValues } from "./VideoWatch.types";

const { Title, Text } = Typography;

interface IProps {
  data: TVideoResponse;
  userType?: "STUDENT" | "EDUCATOR";
  comments: TComment[];
  commentsPagination: TPagination;
  addCommentLoading: boolean;
  loadingComments: boolean;
  defaultTime: number;
  onSetOrder: (order: "ASC" | "DESC") => void;
  onSetOrderBy: (orderBy: string) => void;
  onFetchMoreComments: () => void;
  onAddComment: (
    values: TAddCommentValues,
    formikBag: FormikHelpers<TAddCommentValues>
  ) => Promise<void>;
  onIncreaseViews: () => void;
  onRate: (rating: number, id?: string) => Promise<void>;
  onAddEditProgress: (watchTime: number) => Promise<void>;
}

export default function VideoWatchView({
  data,
  userType,
  comments,
  commentsPagination,
  addCommentLoading,
  loadingComments,
  onSetOrderBy,
  onSetOrder,
  onFetchMoreComments,
  onAddComment,
  onIncreaseViews,
  onRate,
  onAddEditProgress,
  defaultTime,
}: IProps) {
  const t = useTranslations();
  const [viewIncreased, setViewIncreased] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { push } = useRouter();

  const deleteVideo = async () => {
    setDeleteLoading(true);
    await axios
      .delete(`/video/${data.id}`)
      .then(() => {
        setDeleteLoading(false);
        push(`/course/${data.course.id}`);
      })
      .catch(() => {
        setDeleteLoading(false);
        messageApi.error(t("CourseWatch.deleteError"));
      });
  };

  return (
    <div className={styles.contentContainer}>
      {contextHolder}
      <div className={styles.contentContainerInner}>
        <VideoPlayer
          src={data.link}
          thumbnail={data.thumbnailLink}
          duration={data.duration}
          courseId={data.course.id}
          previousVideoId={data.previousVideoId}
          nextVideoId={data.nextVideoId}
          onAddEditProgress={onAddEditProgress}
          defaultTime={defaultTime}
          timeUpdateCallback={({
            currentTarget: { duration, currentTime },
          }: SyntheticEvent<HTMLVideoElement>) => {
            if (currentTime > duration / 3 && !viewIncreased) {
              setViewIncreased(true);
              onIncreaseViews();
            }
          }}
        />
        <div className={styles.authorActions}>
          <Link href={`/course/${data.course.id}/watch/${data.id}/edit`}>
            <Button type="button">{t("CourseWatch.edit")}</Button>
          </Link>
          <Tooltip title={t("CourseWatch.delete")}>
            <div className={styles.deleteButton}>
              <Button onClick={() => setDeleteModalOpen(true)}>
                <DeleteOutlined />
              </Button>
            </div>
          </Tooltip>
        </div>
        <div className={styles.videoInfo}>
          <div className={styles.videoTitleWrapper}>
            <Title level={2}>{data.name}</Title>
          </div>
          <div className={styles.authorAndViews}>
            <Link href={`/course-list/${data.course.creator.id}`}>
              <div className={styles.author}>
                <Avatar src={data.course.creator.avatar} />
                <Text
                  className={styles.authorName}
                >{`${data.course.creator.firstName} ${data.course.creator.lastName}`}</Text>
              </div>
            </Link>
            <Text className={styles.videoViews}>
              {t("CourseWatch.views", { views: data.views })}
            </Text>
            {userType === "STUDENT" && (
              <div className={styles.rate}>
                <Text className={styles.videoRating}>
                  {t("CourseWatch.rate")}
                </Text>
                <Rate
                  allowHalf
                  defaultValue={data.myRating ? data.myRating.rating / 2 : 0}
                  onChange={(value) => {
                    onRate(value * 2, data.myRating?.id);
                  }}
                />
              </div>
            )}
            <div className={styles.rate}>
              <Text className={styles.videoRating}>
                {t("CourseWatch.avgRating", {
                  rating: data.rating.toFixed(2),
                })}
              </Text>
            </div>
          </div>
        </div>
        <Divider type="horizontal" className={styles.divider} />
        <div className={styles.descriptionWrapper}>
          <Title level={3}>{t("CourseWatch.description")}</Title>
          <div className={styles.description}>{data.description}</div>
        </div>
        <Divider type="horizontal" className={styles.divider} />
        <div className={styles.commentsWrapper}>
          <div className={styles.commentsHeaders}>
            <Title level={3} className={styles.commentsTitle}>
              {t("CourseWatch.comments")}
            </Title>
            <div className={styles.commentsSettings}>
              <Formik
                onSubmit={() => {}}
                initialValues={commentsSettingsInitialValues}
              >
                <Form>
                  <div className={styles.settingsWrapper}>
                    <div className={styles.inputWrapper}>
                      <Select
                        name="orderBy"
                        options={orderByOptions(t)}
                        changeCallback={(e: string) => {
                          onSetOrderBy(e);
                        }}
                      />
                    </div>
                    <div className={styles.inputWrapper}>
                      <Select
                        name="order"
                        options={orderOptions(t)}
                        changeCallback={(e: "ASC" | "DESC") => {
                          onSetOrder(e);
                        }}
                      />
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
          {userType === "STUDENT" && (
            <div className={styles.commentAddWrapper}>
              <Formik onSubmit={onAddComment} initialValues={{ text: "" }}>
                <Form>
                  <Title level={5}>{t("CourseWatch.addComment")}</Title>
                  <div className={styles.commentAddForm}>
                    <div className={styles.input}>
                      <Input name="text" />
                    </div>
                    <Button loading={addCommentLoading} type="submit">
                      {t("CourseWatch.comment")}
                    </Button>
                  </div>
                </Form>
              </Formik>
            </div>
          )}
          <div className={styles.comments}>
            <div className={styles.commentList}>
              {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </div>
            {commentsPagination.total >
              (commentsPagination.page - 1) * commentsPagination.perPage +
                commentsPagination.count && (
              <div className={styles.loadMoreComments}>
                <Button onClick={onFetchMoreComments} loading={loadingComments}>
                  {t("CourseWatch.loadMoreComments")}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal
        open={deleteModalOpen}
        title={t("CourseWatch.deleteWarning")}
        onConfirm={deleteVideo}
        onCancel={() => setDeleteModalOpen(false)}
        confirmLoading={deleteLoading}
      />
    </div>
  );
}
