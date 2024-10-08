import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

import { redirect } from "@/app/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import UserVerifier from "@/components/UserVerifier";

import Container from "./Settings.container";
import styles from "./Settings.module.scss";
import {
  getApiErrorMessages,
  getErrorMessages,
  getInitialValues,
  getMessages,
} from "./Settings.utils";

type TProps = {
  searchParams: {
    search: string;
    typeName: string;
  };
};

export default async function Home({ searchParams }: TProps) {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  if (!user) {
    redirect("/");

    return null;
  }

  const t = await getTranslations();

  return (
    <UserVerifier>
      <div className={styles.wrapper}>
        <Header searchParams={searchParams} />
        <Navbar id={user.id} type={user.type} />
        <Container
          avatar={user.avatar}
          initialValues={getInitialValues(user)}
          messages={getMessages(t)}
          errorMessages={getErrorMessages(t, { passwordMin: 8 })}
          apiErrorMessages={getApiErrorMessages(t)}
        />
        <Footer />
      </div>
    </UserVerifier>
  );
}
