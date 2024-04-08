"use client";

import { message, Typography } from "antd";
import { Form, Formik } from "formik";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import Modal from "@/components/Modal";
import Select from "@/components/Select";
import Table from "@/components/Table";
import axios from "@/utils/axios";

import { orderByOptions, orderOptions } from "./CourseList.consts";
import styles from "./CourseList.module.scss";
import { TCourseListItem } from "./CourseList.types";
import { getColumns, getInitialValues, getItems } from "./CourseList.utils";

const { Text, Title } = Typography;

interface IProps {
  courses: Omit<
    TCourseListItem,
    "courseVideos" | "courseMaterials" | "likesCount"
  >[];
  total: number;
  loading: boolean;
  isAuthor: boolean;
  locale: string;
  pageUserName: string;
  getCourses: () => void;
}

export default function CourseListView({
  courses,
  isAuthor,
  loading,
  total,
  locale,
  pageUserName,
  getCourses,
}: IProps) {
  const [messageApi, contextHolder] = message.useMessage();
  const t = useTranslations();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteCourseId, setDeleteCourseId] = useState("");
  const [windowWidth, setWindowWidth] = useState(0);

  const deleteCourse = async (id: string) => {
    setDeleteLoading(true);
    await axios
      .delete(`/courses/${id}`)
      .then(() => {
        setDeleteLoading(false);
        setDeleteModalOpen(false);
        getCourses();
      })
      .catch(() => {
        setDeleteLoading(false);
        setDeleteModalOpen(false);
        messageApi.error(t("CourseList.deleteError"));
      });
  };

  const onDeleteClick = (id: string) => {
    setDeleteCourseId(id);
    setDeleteModalOpen(true);
  };

  const items = getItems(courses);

  const onResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    onResize();
    window.addEventListener("resize", onResize);
    document.addEventListener("fullscreenchange", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("fullscreenchange", onResize);
    };
  }, []);

  return (
    <div className={styles.contentContainer}>
      {contextHolder}
      <div className={styles.contentContainerInner}>
        <Title>{t("CourseList.title", { name: pageUserName })}</Title>
        <Formik
          initialValues={getInitialValues(searchParams)}
          onSubmit={() => {}}
        >
          <Form>
            <div className={styles.filters}>
              <div className={styles.filter}>
                <Text className={styles.text}>{t("CourseList.orderBy")}</Text>
                <Select
                  name="orderBy"
                  options={orderByOptions(locale).map((option) => ({
                    id: option.id,
                    name: t(option.name),
                  }))}
                  changeCallback={(value: string) => {
                    const params = new URLSearchParams(searchParams);
                    params.set("orderBy", value);
                    replace(`${pathname}?${params.toString()}`);
                  }}
                />
              </div>
              <div className={styles.filter}>
                <Text className={styles.text}>{t("CourseList.order")}</Text>
                <Select
                  name="order"
                  options={orderOptions.map((option) => ({
                    id: option.id,
                    name: t(option.name),
                  }))}
                  changeCallback={(value: string) => {
                    const params = new URLSearchParams(searchParams);
                    params.set("order", value);
                    replace(`${pathname}?${params.toString()}`);
                  }}
                />
              </div>
            </div>
          </Form>
        </Formik>
        <Table
          items={items}
          columns={getColumns(t, styles, isAuthor, windowWidth, onDeleteClick)}
          loading={loading || deleteLoading}
          total={total}
        />
      </div>
      <Modal
        open={deleteModalOpen}
        title={t("CourseList.deleteWarning")}
        onConfirm={() => deleteCourse(deleteCourseId)}
        onCancel={() => setDeleteModalOpen(false)}
        confirmLoading={deleteLoading}
      />
    </div>
  );
}
