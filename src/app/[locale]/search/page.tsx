import { cookies } from "next/headers";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

import Container from "./Search.container";
import styles from "./Search.module.scss";

type IProps = {
  searchParams: {
    search: string;
    typeName: string;
  };
};

export default async function Search({ searchParams }: IProps) {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  return (
    <div className={styles.wrapper}>
      <Header searchParams={searchParams} />
      {user && <Navbar id={user.id} type={user.type} />}
      <Container />
    </div>
  );
}
