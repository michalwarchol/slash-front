import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

import { redirect } from "@/app/navigation";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

import Container from "./Settings.container";
import styles from "./Settings.module.scss";
import {
  getErrorMessages,
  getInitialValues,
  getMessages,
} from "./Settings.utils";

export default async function Home() {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  if (!user) {
    redirect("/");

    return null;
  }

  const t = await getTranslations();

  return (
    <div className={styles.wrapper}>
      <Header />
      <Navbar id={user.id} type={user.type} />
      <Container
        avatar={user.avatar}
        initialValues={getInitialValues(user)}
        messages={getMessages(t)}
        errorMessages={getErrorMessages(t)}
      />
    </div>
  );
}
