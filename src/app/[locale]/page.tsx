import { cookies } from "next/headers";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

import styles from "./page.module.scss";

export default async function Home() {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  return (
    <div className={styles.wrapper}>
      <Header />
      {user && <Navbar id={user.id} type={user.type} />}
      {JSON.stringify(user)}
    </div>
  );
}
