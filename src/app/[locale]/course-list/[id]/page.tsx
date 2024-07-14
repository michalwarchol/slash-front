import { cookies } from "next/headers";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import UserVerifier from "@/components/UserVerifier";

import { getUserData } from "./CourseList.actions";
import Container from "./CourseList.container";
import styles from "./CourseList.module.scss";

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

  const pageUser = await getUserData(params.id);

  return (
    <UserVerifier>
      <div className={styles.wrapper}>
        <Header searchParams={searchParams} />
        {user && <Navbar id={user.id} type={user.type} />}
        <Container
          id={params.id}
          userId={user?.id}
          locale={params.locale}
          pageUserName={`${pageUser.firstName} ${pageUser.lastName}`}
        />
      </div>
    </UserVerifier>
  );
}
