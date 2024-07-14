import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import UserVerifier from "@/components/UserVerifier";

import { defaultEducatorData, defaultStudentStats } from "./Statistics.consts";
import styles from "./Statistics.module.scss";
import { fetchStats, getMessages } from "./Statistics.utils";
import View from "./Statistics.view";

type TProps = {
  searchParams: {
    search: string;
    typeName: string;
  };
};

export default async function Statistics({ searchParams }: TProps) {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  const data = await fetchStats();
  const t = await getTranslations();

  return (
    <UserVerifier>
      <div className={styles.wrapper}>
        <Header searchParams={searchParams} />
        {user && <Navbar id={user.id} type={user.type} />}
        <View
          educatorData={user.type === "EDUCATOR" ? data : defaultEducatorData}
          studentData={user.type === "STUDENT" ? data : defaultStudentStats}
          type={user.type}
          messages={getMessages(t)}
        />
      </div>
    </UserVerifier>
  );
}
