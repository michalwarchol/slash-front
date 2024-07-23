import { cookies } from "next/headers";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import UserVerifier from "@/components/UserVerifier";

import { getCourse } from "./Course.actions";
import styles from "./Course.module.scss";
import View from "./Course.view";

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
  const data = await getCourse(params.locale, params.id, user?.id);

  if (!data.course) {
    return null;
  }

  return (
    <UserVerifier>
      <div className={styles.wrapper}>
        <Header searchParams={searchParams} />
        {user && <Navbar id={user.id} type={user.type} />}
        <View
          course={data.course}
          statistics={data.statistics}
          isAuthor={data.course.creator.id === user?.id}
          isLoggedIn={user?.id}
        />
      </div>
    </UserVerifier>
  );
}
