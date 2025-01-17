import { cookies } from "next/headers";

import { getUserData } from "./CourseList.actions";
import Container from "./CourseList.container";
import { TParams } from "./CourseList.types";

type TProps = {
  params: TParams;
};

export default async function Course({ params }: TProps) {
  const { id, locale } = await params;
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  const pageUser = await getUserData(id);

  return (
    <Container
      id={id}
      userId={user?.id}
      locale={locale}
      pageUserName={`${pageUser.firstName} ${pageUser.lastName}`}
    />
  );
}
