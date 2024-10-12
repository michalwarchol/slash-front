import { cookies } from "next/headers";

import { getUserData } from "./CourseList.actions";
import Container from "./CourseList.container";

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

  const pageUser = await getUserData(params.id);

  return (
    <Container
      id={params.id}
      userId={user?.id}
      locale={params.locale}
      pageUserName={`${pageUser.firstName} ${pageUser.lastName}`}
    />
  );
}
