import { cookies } from "next/headers";

import { getCourse } from "./Course.actions";
import { TParams } from "./Course.types";
import View from "./Course.view";

type TProps = {
  params: TParams;
};

export default async function Course({ params }: TProps) {
  const { id, locale } = await params;
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;
  const data = await getCourse(locale, id, user?.id);

  if (!data.course) {
    return null;
  }

  return (
    <View
      course={data.course}
      statistics={data.statistics}
      isAuthor={data.course.creator.id === user?.id}
      isLoggedIn={user?.id}
    />
  );
}
