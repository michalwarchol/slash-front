import { cookies } from "next/headers";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

import {
  getCourseTypes,
  getStudentStartedCourses,
  getTypeCourses,
} from "./actions";
import styles from "./page.module.scss";
import { formatCourseTypes, matchCourseTypeWithCourses } from "./page.utils";
import { TTStudentStartedCourse } from "./types";
import { View } from "./view";

type IProps = {
  searchParams: {
    search: string;
    typeName: string;
  };
};

export default async function Home({ searchParams }: IProps) {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  const courseTypes = await getCourseTypes();
  const formattedCourseTypes = formatCourseTypes(courseTypes, 10);

  const categories = await Promise.all(
    formattedCourseTypes.map((type) => {
      return getTypeCourses(type.name);
    })
  );

  let userStartedCourses: TTStudentStartedCourse[] = [];
  if (user && user.type === "STUDENT") {
    userStartedCourses = await getStudentStartedCourses(1, 10);
  }

  return (
    <div className={styles.wrapper}>
      <Header searchParams ={searchParams} />
      {user && <Navbar id={user.id} type={user.type} />}
      <View
        userType={user?.type}
        coursesByType={matchCourseTypeWithCourses(
          formattedCourseTypes,
          categories
        )}
        studentStartedCourses={userStartedCourses}
      />
    </div>
  );
}
