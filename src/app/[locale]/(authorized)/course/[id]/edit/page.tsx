import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

import { getErrorMessages } from "@/app/[locale]/(authorized)/add-course/AddCourse.utils";
import View from "@/app/[locale]/(authorized)/add-course/AddCourse.view";
import { redirect } from "@/app/navigation";

import { getCourse } from "./CourseEdit.actions";
import { getCourseTypes } from "./CourseEdit.actions";
import { getMessages } from "./CourseEdit.utils";

type TProps = {
  params: {
    locale: string;
    id: string;
  };
};

export default async function Home({ params: { id } }: TProps) {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  if (!user) {
    redirect("/");

    return null;
  }

  const t = await getTranslations();
  const courseTypes = await getCourseTypes();
  const course = await getCourse(id, user.id);

  if (course.course === null) {
    return null;
  }

  return (
    <View
      id={course.course.id}
      initialValues={course.course}
      courseTypes={courseTypes}
      messages={getMessages(t)}
      errorMessages={getErrorMessages(t)}
    />
  );
}
