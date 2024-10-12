import { cookies } from "next/headers";

import { getCourse } from "./Course.actions";
import View from "./Course.view";

type TProps = {
  params: {
    locale: string;
    id: string;
  };
};

export default async function Course({ params }: TProps) {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;
  const data = await getCourse(params.locale, params.id, user?.id);

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
