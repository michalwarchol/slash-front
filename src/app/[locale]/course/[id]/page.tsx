import { cookies } from "next/headers";

import { redirect } from "@/app/navigation";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import axios from "@/utils/axios";

import styles from "./Course.module.scss";
import View from "./Course.view";

type TProps = {
  params: {
    locale: string;
    id: string;
  };
};

async function getCourse(id?: string | string[], userId?: string) {
  if (!id) {
    return {};
  }

  const cookieStore = cookies();
  const langCookie = cookieStore.get("NEXT_LOCALE");
  const lang = langCookie?.value;

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

export default async function Course({ params }: TProps) {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;
  const { course, statistics } = await getCourse(
    params.id,
    user ? user.id : null
  );

  if (!course) {
    redirect("/");

    return null;
  }

  return (
    <div className={styles.wrapper}>
      <Header />
      {user && <Navbar type={user.type} />}
      <View
        course={course}
        statistics={statistics}
        isAuthor={course.creator.id === user?.id}
        isLoggedIn={!!user}
      />
    </div>
  );
}
