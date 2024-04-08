import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

import { getCourseTypes } from "@/app/actions";
import { redirect } from "@/app/navigation";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

import { initialValues } from "./AddCourse.consts";
import { getErrorMessages, getMessages } from "./AddCourse.utils";
import View from "./AddCourse.view";
import styles from "./page.module.scss";

export default async function Home() {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  if (!user) {
    redirect("/");

    return null;
  }

  const t = await getTranslations();
  const courseTypes = await getCourseTypes();

  return (
    <div className={styles.wrapper}>
      <Header />
      {user && <Navbar id={user.id} type={user.type} />}
      <View
        initialValues={initialValues}
        courseTypes={courseTypes}
        messages={getMessages(t)}
        errorMessages={getErrorMessages(t)}
      />
    </div>
  );
}
