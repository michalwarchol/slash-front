"use client";

import { Breadcrumb, Collapse, message } from "antd";
import { RcFile } from "antd/es/upload";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";

import Carousel from "@/components/Carousel";
import CourseTitle from "@/components/CourseTitle";
import DropzoneModal from "@/components/DropzoneModal";
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
  const [visibleMaterials, setVisibleMaterials] = useState(7);
  const [visibleVideos, setVisibleVideos] = useState(8);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteMaterialModalOpen, setDeleteMaterialModalOpen] = useState(false);
  const [deleteMaterialId, setDeleteMaterialId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [materials, setMaterials] = useState(course.courseMaterials);
  const [uploadMaterialOpen, setUploadMaterialOpen] = useState(false);
  const [uploadMaterialLoading, setUploadMaterialLoading] = useState(false);

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

  const deleteMaterial = async () => {
    setDeleteLoading(true);
    const { data } = await axios.delete(
      `/courses/materials/file/${deleteMaterialId}`
    );

    setDeleteLoading(false);
    setDeleteMaterialId(null);
    setDeleteMaterialModalOpen(false);

    if (!data.success) {
      messageApi.success(t("Course.deleteMaterialError"));
      return;
    }

    setMaterials(
      materials.filter((material) => material.id !== deleteMaterialId)
    );
    messageApi.success(t("Course.materialDeletedSuccessFully"));
  };

  const openDeleteMaterialModal = (id: string) => {
    setDeleteMaterialId(id);
    setDeleteMaterialModalOpen(true);
  };

  const uploadMaterial = async (file: RcFile | null) => {
    if (!file) {
      return;
    }

    setUploadMaterialLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await axios.post(
      `/courses/materials/${course.id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    messageApi.success(t("Course.materialUploadedSuccessFully"));
    setUploadMaterialOpen(false);
    setUploadMaterialLoading(false);
    setMaterials([...materials, data.result]);
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
          onUploadMaterialClick={() => setUploadMaterialOpen(true)}
        />
        <Collapse
          items={[
            {
              key: "1",
              label: t("Course.description"),
              children: (
                <div
                  className={styles.description}
                  dangerouslySetInnerHTML={{ __html: course.description }}
                ></div>
              ),
            },
          ]}
        />
        <Carousel
          title={t("Course.materials")}
          isLoadMore={materials.length > visibleMaterials}
          onLoadMore={() => setVisibleMaterials(visibleMaterials + 7)}
          items={materials.slice(0, visibleMaterials).map((material) => (
            <MaterialCarouselItem
              id={material.id}
              key={material.id}
              link={material.link}
              name={material.name}
              size={material.size}
              type={material.type}
              isAuthor={isAuthor}
              onDeleteClick={openDeleteMaterialModal}
            />
          ))}
        />
        <Carousel
          title={t("Course.videos")}
          isLoadMore={course.courseVideos.length > visibleVideos}
          onLoadMore={() => setVisibleVideos(visibleVideos + 8)}
          items={course.courseVideos.slice(0, visibleVideos).map((video) => (
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
      <DropzoneModal
        onConfirm={uploadMaterial}
        onCancel={() => setUploadMaterialOpen(false)}
        open={uploadMaterialOpen}
        confirmLoading={uploadMaterialLoading}
      />
      <Modal
        open={deleteMaterialModalOpen}
        title={t("Course.deleteMaterialWarning")}
        onConfirm={() => deleteMaterial()}
        onCancel={() => {
          setDeleteMaterialModalOpen(false);
          setDeleteMaterialId(null);
        }}
        confirmLoading={deleteLoading}
      />
    </div>
  );
}
