"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getUserCourses } from "./CourseList.actions";
import { TCourseListItem } from "./CourseList.types";
import View from "./CourseList.view";

interface IProps {
  id: string;
  userId: string;
  locale: string;
  pageUserName: string;
}

type TData = Omit<
  TCourseListItem,
  "courseVideos" | "courseMaterials" | "likesCount"
>[];

export default function CourseList({
  id,
  locale,
  userId,
  pageUserName,
}: IProps) {
  const { push } = useRouter();
  const [data, setData] = useState<TData>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const searchParams = useSearchParams();

  const getCourses = () => {
    const page = parseInt(searchParams.get("page") || "1");
    const perPage = parseInt(searchParams.get("perPage") || "10");
    const orderBy = searchParams.get("orderBy") || "course.name";
    const order = searchParams.get("order") || "ASC";

    setLoading(true);
    getUserCourses({
      id,
      order,
      orderBy,
      page,
      perPage,
      locale,
    })
      .then((data) => {
        setData(data.data);
        setTotal(data.paginatorInfo.total);
        setLoading(false);
      })
      .catch(() => {
        push("/");
      });
  };

  useEffect(() => {
    getCourses();
  }, [searchParams]);

  return (
    <View
      courses={data}
      total={total}
      loading={loading}
      isAuthor={id === userId}
      locale={locale}
      getCourses={getCourses}
      pageUserName={pageUserName}
    />
  );
}
