"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { TCourse } from "@/types/course";

import { getCourse } from "./Course.utils";
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
