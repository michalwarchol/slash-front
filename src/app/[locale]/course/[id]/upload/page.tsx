import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

import Container from "./CourseUpload.container";
import styles from "./CourseUpload.module.scss";
import { getErrorMessages, getMessages } from "./CourseUpload.utils";

type TProps = {
  params: {
    locale: string;
    id: string;
  };
  searchParams: {
    search: string;
    typeName: string;
  };
};

export default async function Course({ params, searchParams }: TProps) {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  const t = await getTranslations();

  return (
    <div className={styles.wrapper}>
      <Header searchParams={searchParams} />
      {user && <Navbar id={user.id} type={user.type} />}
      <Container
        id={params.id}
        userId={user?.id}
        messages={getMessages(t)}
        errorMessages={getErrorMessages(t)}
      />
      <Footer />
    </div>
  );
}
