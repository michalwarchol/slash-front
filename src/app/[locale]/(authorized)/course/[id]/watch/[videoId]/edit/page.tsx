import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

import { redirect } from "@/app/navigation";

import { getVideo } from "./VideoEdit.actions";
import Container from "./VideoEdit.container";
import { TParams } from "./VideoEdit.types";
import { getErrorMessages, getMessages } from "./VideoEdit.utils";

type TProps = {
  params: TParams;
};

export default async function VideoWatch({ params }: TProps) {
  const { id, videoId } = await params;
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  const t = await getTranslations();
  const video = await getVideo(videoId);
  if (video === null || video.creatorId !== user?.id) {
    redirect("/");
    return null;
  }

  return (
    <Container
      courseId={id}
      id={videoId}
      userId={user?.id}
      messages={getMessages(t)}
      errorMessages={getErrorMessages(t)}
      video={video}
    />
  );
}
