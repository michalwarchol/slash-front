import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

import { redirect } from "@/app/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import UserVerifier from "@/components/UserVerifier";

import { getCourseTypes } from "./AddCourse.actions";
import { initialValues } from "./AddCourse.consts";
import { getErrorMessages, getMessages } from "./AddCourse.utils";
import View from "./AddCourse.view";
import styles from "./page.module.scss";

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

  if (!user) {
    redirect("/");

    return null;
  }

  const t = await getTranslations();
  const courseTypes = await getCourseTypes();

  return (
    <UserVerifier>
      <div className={styles.wrapper}>
        <Header searchParams={searchParams} />
        {user && <Navbar id={user.id} type={user.type} />}
        <View
          initialValues={initialValues}
          courseTypes={courseTypes}
          messages={getMessages(t)}
          errorMessages={getErrorMessages(t)}
        />
      </div>
      <Footer />
    </UserVerifier>
  );
}
