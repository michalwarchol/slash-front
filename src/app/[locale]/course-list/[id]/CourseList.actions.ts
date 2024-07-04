"use server";

import { TCourseResponse } from "@/types/course";
import { TUser } from "@/types/user";
import Fetch from "@/utils/requestHandler";

interface IGetUserCourses {
  id: string;
  page: number;
  perPage: number;
  orderBy: string;
  order: string;
  locale: string;
}

export async function getUserCourses({
  id,
  page,
  perPage,
  orderBy,
  order,
  locale,
}: IGetUserCourses) {
  const data = await Fetch.get(
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

export async function getUserData(id: string): Promise<TUser> {
  const data = await Fetch.get(`/users/user/${id}`);

  return data;
}
