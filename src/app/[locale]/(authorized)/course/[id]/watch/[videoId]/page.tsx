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

  const data = await getVideo(params.videoId, params.locale);
  let progress = null;
  if (user?.id) {
    progress = await getUserCourseProgress(params.id);
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
      videoId={params.videoId}
      recommendedCourses={recommendedCourses}
    />
  );
}
