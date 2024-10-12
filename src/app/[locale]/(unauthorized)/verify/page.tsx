import { getTranslations } from "next-intl/server";

import Container from "./Verify.container";
import {
  getApiErrorMessages,
  getErrorMessages,
  getMessages,
} from "./Verify.utils";

export default async function Verify() {
  const t = await getTranslations();

  return (
    <Container
      messages={getMessages(t)}
      errorMessages={getErrorMessages(t)}
      apiErrorMessages={getApiErrorMessages(t)}
    />
  );
}
