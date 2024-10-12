import { getTranslations } from "next-intl/server";

import Container from "./Login.container";
import {
  getApiErrorMessages,
  getErrorMessages,
  getMessages,
} from "./Login.utils";

export default async function Login() {
  const t = await getTranslations();

  return (
    <Container
      messages={getMessages(t)}
      errorMessages={getErrorMessages(t)}
      apiErrorMessages={getApiErrorMessages(t)}
    />
  );
}
