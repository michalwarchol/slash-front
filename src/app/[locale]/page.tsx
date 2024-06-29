import { cookies } from "next/headers";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

import { getStudentStartedCourses } from "./actions";
import styles from "./page.module.scss";
import { TTStudentStartedCourse } from "./types";
import { View } from "./view";

export default async function Home() {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  let userStartedCourses: TTStudentStartedCourse[] = [];
  if (user && user.type === "STUDENT") {
    userStartedCourses = await getStudentStartedCourses(1, 10);
  }

  return (
    <div className={styles.wrapper}>
      <Header />
      {user && <Navbar id={user.id} type={user.type} />}
      <View userType={user?.type} studentStartedCourses={userStartedCourses} />
    </div>
  );
}
