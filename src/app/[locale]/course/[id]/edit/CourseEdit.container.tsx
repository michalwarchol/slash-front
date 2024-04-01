"use client";

import { useEffect, useState } from "react";

import {
  CourseTypes,
  TErrorMessages,
  TInitialValues,
  TMessages,
} from "@/app/[locale]/add-course/AddCourse.types";
import View from "@/app/[locale]/add-course/AddCourse.view";
import axios from "@/utils/axios";

interface IProps {
  id: string;
  userId: string;
  locale: string;
  courseTypes: CourseTypes;
  messages: TMessages;
  errorMessages: TErrorMessages;
}

async function getCourse(
  lang: string,
  id?: string | string[],
  userId?: string
) {
  if (!id || !userId) {
    return {};
  }

  const { data } = await axios.get(`/courses/course/${id}`);

  if (!data) {
    return {
      course: null,
    };
  }

  if (data.creator.id !== userId) {
    return {
      course: null,
    };
  }

  const course = {
    id: data.id,
    name: data.name,
    description: data.description,
    type: data.type.mainType.name,
    subType: data.type.id,
  };

  return {
    course,
  };
}

export default function CourseEditContainer({
  id,
  locale,
  userId,
  courseTypes,
  errorMessages,
  messages,
}: IProps) {
  const [course, setCourse] = useState<TInitialValues | null>(null);

  useEffect(() => {
    getCourse(locale, id, userId).then((data) => {
      if (!data.course) {
        return;
      }
      setCourse(data.course);
    });
  }, []);

  if (!course) {
    return null;
  }

  return (
    <View
      id={course.id}
      initialValues={course}
      courseTypes={courseTypes}
      messages={messages}
      errorMessages={errorMessages}
    />
  );
}
