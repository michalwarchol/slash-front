import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

import Container from "./CourseUpload.container";
import { getErrorMessages, getMessages } from "./CourseUpload.utils";

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

  const t = await getTranslations();

  return (
    <Container
      id={params.id}
      userId={user?.id}
      messages={getMessages(t)}
      errorMessages={getErrorMessages(t)}
    />
  );
}
