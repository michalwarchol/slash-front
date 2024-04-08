import { cookies } from "next/headers";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

import Container from "./Course.container";
import styles from "./Course.module.scss";

type TProps = {
  params: {
    locale: string;
    id: string;
  };
};

export default async function Course({ params }: TProps) {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  return (
    <div className={styles.wrapper}>
      <Header />
      {user && <Navbar id={user.id}  type={user.type} />}
      <Container id={params.id} userId={user?.id} locale={params.locale} />
    </div>
  );
}
