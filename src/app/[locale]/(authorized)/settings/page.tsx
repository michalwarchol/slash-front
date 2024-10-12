import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

import Container from "./Settings.container";
import {
  getApiErrorMessages,
  getErrorMessages,
  getInitialValues,
  getMessages,
} from "./Settings.utils";

export default async function Home() {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  const t = await getTranslations();

  return (
    <Container
      avatar={user.avatar}
      initialValues={getInitialValues(user)}
      messages={getMessages(t)}
      errorMessages={getErrorMessages(t, { passwordMin: 8 })}
      apiErrorMessages={getApiErrorMessages(t)}
    />
  );
}
