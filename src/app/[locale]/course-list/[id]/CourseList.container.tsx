"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { TCourseResponse } from "@/types/course";
import axios from "@/utils/axios";

import { TCourseListItem } from "./CourseList.types";
import View from "./CourseList.view";

interface IProps {
  id: string;
  userId: string;
  locale: string;
  pageUserName: string;
}

interface IGetUserCourses {
  id: string;
  page: number;
  perPage: number;
  orderBy: string;
  order: string;
  locale: string;
}

type TData = Omit<
  TCourseListItem,
  "courseVideos" | "courseMaterials" | "likesCount"
>[];

async function getUserCourses({
  id,
  page,
  perPage,
  orderBy,
  order,
  locale,
}: IGetUserCourses) {
  const { data } = await axios.get(
    `/courses/creator_list?id=${id}&page=${page}&perPage=${perPage}&orderBy=${orderBy}&order=${order}`
  );

  return {
    ...data,
    data: data.data.map((course: TCourseResponse) => ({
      ...course,
      type: {
        id: course.type.id,
        name: course.type.name,
        value: locale === "pl" ? course.type.valuePl : course.type.valueEn,
        mainType: {
          id: course.type.mainType.id,
          name: course.type.mainType.name,
          value:
            locale === "pl"
              ? course.type.mainType.valuePl
              : course.type.mainType.valueEn,
        },
      },
    })),
  };
}

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
