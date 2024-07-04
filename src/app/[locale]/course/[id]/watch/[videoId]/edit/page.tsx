import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

import styles from "@/app/[locale]/course/[id]/upload/CourseUpload.module.scss";
import { redirect } from "@/app/navigation";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

import { getVideo } from "./VideoEdit.actions";
import Container from "./VideoEdit.container";
import { getErrorMessages, getMessages } from "./VideoEdit.utils";

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

  const t = await getTranslations();
  const video = await getVideo(params.videoId);
  if (video === null || video.creatorId !== user?.id) {
    redirect("/");
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <Header />
      {user && <Navbar id={user.id} type={user.type} />}
      <Container
        courseId={params.id}
        id={params.videoId}
        userId={user?.id}
        messages={getMessages(t)}
        errorMessages={getErrorMessages(t)}
        video={video}
      />
    </div>
  );
}
