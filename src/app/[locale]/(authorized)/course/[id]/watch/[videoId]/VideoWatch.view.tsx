"use client";

import { DeleteOutlined, LeftOutlined } from "@ant-design/icons";
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
import RecommendedCourse from "@/components/RecommendedCourse";
import Select from "@/components/Select";
import VideoPlayer from "@/components/VideoPlayer";
import { TSearchResult } from "@/types/course";
import { TPagination } from "@/types/pagination";
import { EUserTypes } from "@/types/user";
import { TComment, TVideoResponse } from "@/types/video";
import Fetch from "@/utils/requestHandler";

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
  userType?: EUserTypes;
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
  isAuthor: boolean;
  recommendedCourses: TSearchResult[];
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
  isAuthor,
  recommendedCourses,
}: IProps) {
  const t = useTranslations("CourseWatch");
  const [viewIncreased, setViewIncreased] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { push } = useRouter();

  const deleteVideo = async () => {
    setDeleteLoading(true);
    await Fetch.delete(`/video/${data.id}`, {})
      .then(() => {
        setDeleteLoading(false);
        push(`/course/${data.course.id}`);
      })
      .catch(() => {
        setDeleteLoading(false);
        messageApi.error(t("deleteError"));
      });
  };

  return (
    <div className={styles.contentContainer}>
      {contextHolder}
      <div className={styles.contentContainerInner}>
        <Link href={`/course/${data.course.id}`} className={styles.goBack}>
          <LeftOutlined className={styles.goBackIcon} />
          <span className={styles.goBackText}>{t("goBack")}</span>
        </Link>
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
        {isAuthor && (
          <div className={styles.authorActions}>
            <Link href={`/course/${data.course.id}/watch/${data.id}/edit`}>
              <Button type="button">{t("edit")}</Button>
            </Link>
            <Tooltip title={t("delete")}>
              <div className={styles.deleteButton}>
                <Button onClick={() => setDeleteModalOpen(true)}>
                  <DeleteOutlined />
                </Button>
              </div>
            </Tooltip>
          </div>
        )}
        <div className={styles.videoTitleWrapper}>
          <Title level={2}>{data.name}</Title>
        </div>
        <div className={styles.videoInfoWrapper}>
          <div className={styles.videoInfo}>
            <div className={styles.authorAndViews}>
              <Link
                href={`/course-list/${data.course.creator.id}`}
                className={styles.authorLink}
              >
                <div className={styles.author}>
                  <Avatar src={data.course.creator.avatar} />
                  <Text
                    className={styles.authorName}
                  >{`${data.course.creator.firstName} ${data.course.creator.lastName}`}</Text>
                </div>
              </Link>
              <Text className={styles.videoViews}>
                {t("views", { views: data.views })}
              </Text>
            </div>
          </div>
          <div className={styles.rateInfo}>
            {userType === EUserTypes.STUDENT && (
              <div className={styles.rate}>
                <Text className={styles.videoRating}>{t("rate")}</Text>
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
                {t("avgRating", {
                  rating: data.rating.toFixed(2),
                })}
              </Text>
            </div>
          </div>
        </div>
        <Divider type="horizontal" className={styles.divider} />
        <div className={styles.descriptionWrapper}>
          <Title level={3}>{t("description")}</Title>
          <div className={styles.description}>{data.description}</div>
        </div>
        <Divider type="horizontal" className={styles.divider} />
        <div className={styles.separator}>
          <div className={styles.sectionsWrapper}>
            <div className={styles.commentsWrapper}>
              <div className={styles.commentsHeaders}>
                <Title level={3} className={styles.commentsTitle}>
                  {t("comments")}
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
              {userType === EUserTypes.STUDENT && (
                <div className={styles.commentAddWrapper}>
                  <Formik onSubmit={onAddComment} initialValues={{ text: "" }}>
                    <Form>
                      <Title level={5}>{t("addComment")}</Title>
                      <div className={styles.commentAddForm}>
                        <div className={styles.input}>
                          <Input name="text" />
                        </div>
                        <Button loading={addCommentLoading} type="submit">
                          {t("comment")}
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
                    <Button
                      onClick={onFetchMoreComments}
                      loading={loadingComments}
                    >
                      {t("loadMoreComments")}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          {console.log(userType, EUserTypes.STUDENT)}
          {userType === EUserTypes.STUDENT && (
            <div className={styles.recommendedWrapper}>
              <Title level={3}>{t("recommended")}</Title>
              <div className={styles.recommendedCourses}>
                {recommendedCourses.map((recommendedCourse) => (
                  <RecommendedCourse
                    key={recommendedCourse.course.id}
                    data={recommendedCourse}
                  />
                ))}
              </div>
              <Divider
                type="horizontal"
                className={styles.dividerRecommended}
              />
            </div>
          )}
        </div>
      </div>
      <Modal
        open={deleteModalOpen}
        title={t("deleteWarning")}
        onConfirm={deleteVideo}
        onCancel={() => setDeleteModalOpen(false)}
        confirmLoading={deleteLoading}
      />
    </div>
  );
}
