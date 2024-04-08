import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

import { getErrorMessages } from "@/app/[locale]/add-course/AddCourse.utils";
import styles from "@/app/[locale]/add-course/page.module.scss";
import { getCourseTypes } from "@/app/actions";
import { redirect } from "@/app/navigation";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

import Container from "./CourseEdit.container";
import { getMessages } from "./CourseEdit.utils";

type TProps = {
  params: {
    locale: string;
    id: string;
  };
};

export default async function Home({ params: { id, locale } }: TProps) {
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
      <Container
        id={id}
        userId={user.id}
        locale={locale}
        courseTypes={courseTypes}
        messages={getMessages(t)}
        errorMessages={getErrorMessages(t)}
      />
    </div>
  );
}
