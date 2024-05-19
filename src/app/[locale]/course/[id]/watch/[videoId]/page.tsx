import { cookies } from "next/headers";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

import Container from "./VideoWatch.container";
import styles from "./VideoWatch.module.scss";

type TProps = {
  params: {
    locale: string;
    id: string;
    videoId: string;
  };
};

export default async function VideoWatch({ params }: TProps) {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  return (
    <div className={styles.wrapper}>
      <Header />
      {user && <Navbar id={user.id} type={user.type} />}
      <Container
        id={params.id}
        userId={user?.id}
        userType={user.type}
        locale={params.locale}
        videoId={params.videoId}
      />
    </div>
  );
}
