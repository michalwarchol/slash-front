"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { TCourse } from "@/types/course";
import axios from "@/utils/axios";

import View from "./Course.view";

interface IProps {
  id: string;
  userId: string;
  locale: string;
}

interface IData {
  course: TCourse;
  statistics: {
    isLiked: boolean;
  };
}

async function getCourse(
  lang: string,
  id?: string | string[],
  userId?: string
) {
  if (!id) {
    return {};
  }

  const { data } = await axios.get(`/courses/course/${id}`);

  if (!data) {
    return {
      course: null,
      statistics: null,
    };
  }

  const course = {
    ...data,
    type: {
      id: data.type.id,
      name: data.type.name,
      value: lang && lang === "pl" ? data.type.valuePl : data.type.valueEn,
      mainType: {
        id: data.type.mainType.id,
        name: data.type.mainType.name,
        value:
          lang && lang === "pl"
            ? data.type.mainType.valuePl
            : data.type.mainType.valueEn,
      },
    },
  };

  if (userId) {
    const { data: statistics } = await axios.get(
      `/courses/user_statistics/${id}`
    );

    return {
      course,
      statistics,
    };
  }

  return {
    course,
    statistics: {
      isLiked: false,
    },
  };
}

export default function CourseContainer({ id, userId, locale }: IProps) {
  const { back } = useRouter();
  const [data, setData] = useState<IData | null>(null);
  useEffect(() => {
    getCourse(locale, id, userId)
      .then((data) => {
        if (!data || !data.course) {
          back();
          return;
        }

        setData({
          course: data.course,
          statistics: data.statistics,
        });
      })
      .catch(() => {
        back();
      });
  }, []);

  if (!data) {
    return null;
  }

  return (
    <View
      course={data.course}
      statistics={data.statistics}
      isAuthor={data.course.creator.id === userId}
      isLoggedIn={!!userId}
    />
  );
}
