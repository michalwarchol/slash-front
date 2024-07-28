"use server";

import { cookies } from "next/headers";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

import {
  getRecommendedCourses,
  getUserCourseProgress,
  getVideo,
} from "./VideoWatch.actions";
import Container from "./VideoWatch.container";
import styles from "./VideoWatch.module.scss";

type TProps = {
  params: {
    locale: string;
    id: string;
    videoId: string;
  };
  searchParams: {
    search: string;
    typeName: string;
  };
};

export default async function VideoWatch({ params, searchParams }: TProps) {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  const data = await getVideo(params.videoId, params.locale);
  let progress = null;
  if (user?.id) {
    progress = await getUserCourseProgress(params.id);
  }

  let recommendedCourses = [];
  if (user && user.type === "STUDENT") {
    const recommendedCoursesData = await getRecommendedCourses();
    recommendedCourses = recommendedCoursesData.data || [];
  }

  return (
    <div className={styles.wrapper}>
      <Header searchParams={searchParams} />
      {user && <Navbar id={user.id} type={user.type} />}
      <Container
        progress={progress}
        video={data}
        userId={user?.id}
        userType={user?.type}
        videoId={params.videoId}
        recommendedCourses={recommendedCourses}
      />
      <Footer />
    </div>
  );
}
