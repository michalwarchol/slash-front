import { cookies } from "next/headers";
import { RedirectType } from "next/navigation";

import { redirect } from "@/app/navigation";
import { EUserTypes } from "@/types/user";

import {
  getRecommendedCourses,
  getUserCourseProgress,
  getVideo,
} from "./VideoWatch.actions";
import Container from "./VideoWatch.container";
import { TParams } from "./VideoWatch.types";

type TProps = {
  params: TParams;
};

export default async function VideoWatch({ params }: TProps) {
  const { id, locale, videoId } = await params;
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  const data = await getVideo(videoId, locale);
  let progress = null;
  if (user?.id) {
    progress = await getUserCourseProgress(id);
  }

  let recommendedCourses = [];
  if (user && user.type === EUserTypes.STUDENT) {
    const recommendedCoursesData = await getRecommendedCourses();
    recommendedCourses = recommendedCoursesData.data || [];
  }

  if (data === null) {
    redirect("../", RedirectType.replace);
  }

  return (
    <Container
      progress={progress}
      video={data!}
      userId={user?.id}
      userType={user?.type}
      videoId={videoId}
      recommendedCourses={recommendedCourses}
    />
  );
}
