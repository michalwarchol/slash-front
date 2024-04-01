"use client";

import { Breadcrumb, Collapse, message } from "antd";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";

import Carousel from "@/components/Carousel";
import CourseTitle from "@/components/CourseTitle";
import MaterialCarouselItem from "@/components/MaterialCarouselItem";
import Modal from "@/components/Modal";
import VideoCarouselItem from "@/components/VideoCarouselItem";
import { TCourse } from "@/types/course";
import axios from "@/utils/axios";

import styles from "./Course.module.scss";

interface IProps {
  course: TCourse;
  isAuthor: boolean;
  isLoggedIn: boolean;
  statistics: {
    isLiked: boolean;
  };
}

export default function CourseView({
  course,
  isAuthor,
  isLoggedIn,
  statistics,
}: IProps) {
  const t = useTranslations();
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [visibleMaterials, setVisibleMaterials] = useState(20);
  const [visibleVideos, setVisibleVideos] = useState(8);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const likeOrDislike = async (isLike: boolean) => {
    await axios.post("/courses/like", {
      id: course.id,
      isLike,
    });
  };

  const deleteCourse = async () => {
    setDeleteLoading(true);
    await axios
      .delete(`/courses/${course.id}`)
      .then(() => {
        setDeleteLoading(false);
        router.push("/");
      })
      .catch(() => {
        setDeleteLoading(false);
        messageApi.error(t("Course.deleteError"));
      });
  };

  return (
    <div className={styles.contentContainer}>
      {contextHolder}
      <div className={styles.contentContainerInner}>
        <Breadcrumb
          items={[
            {
              title: course.type.mainType.value,
            },
            {
              title: course.type.value,
            },
          ]}
        />
        <CourseTitle
          courseId={course.id}
          title={course.name}
          creator={course.creator}
          isAuthor={isAuthor}
          isLoggedIn={isLoggedIn}
          isLiked={statistics.isLiked}
          onLikeClick={likeOrDislike}
          likes={course.likesCount}
          onDeleteClick={() => setDeleteModalOpen(true)}
        />
        <Collapse
          items={[
            {
              key: "1",
              label: t("Course.description"),
              children: <p>{course.description}</p>,
            },
          ]}
        />
        <Carousel
          title={t("Course.materials")}
          isLoadMore={course.courseMaterials.length > visibleMaterials}
          onLoadMore={() => setVisibleMaterials(visibleMaterials + 20)}
          items={course.courseMaterials.slice().map((material) => (
            <MaterialCarouselItem
              id={material.id}
              key={material.id}
              link={material.link}
              name={material.name}
              size={material.size}
              type={material.type}
            />
          ))}
        />
        <Carousel
          title={t("Course.videos")}
          isLoadMore={course.courseVideos.length > visibleVideos}
          onLoadMore={() => setVisibleVideos(visibleVideos + 8)}
          items={course.courseVideos.slice().map((video) => (
            <VideoCarouselItem
              key={video.id}
              id={video.id}
              courseId={course.id}
              name={video.name}
              thumbnail={video.thumbnailLink}
              duration={video.duration}
              views={video.views}
            />
          ))}
        />
      </div>
      <Modal
        open={deleteModalOpen}
        title={t("Course.deleteWarning")}
        onConfirm={deleteCourse}
        onCancel={() => setDeleteModalOpen(false)}
        confirmLoading={deleteLoading}
      />
    </div>
  );
}
