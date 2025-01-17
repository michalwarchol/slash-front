import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

import Container from "./CourseUpload.container";
import { TParams } from "./CourseUpload.types";
import { getErrorMessages, getMessages } from "./CourseUpload.utils";

type TProps = {
  params: TParams;
};

export default async function Course({ params }: TProps) {
  const { id } = await params;
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  const t = await getTranslations();

  return (
    <Container
      id={id}
      userId={user?.id}
      messages={getMessages(t)}
      errorMessages={getErrorMessages(t)}
    />
  );
}
