import { getTranslations } from "next-intl/server";

import { getUserRoles } from "./register.actions";
import { listItems } from "./register.consts";
import Container from "./register.container";
import { UserRoles } from "./register.types";
import {
  getApiErrorMessages,
  getErrorMessages,
  getMessages,
} from "./register.utils";

export default async function Register() {
  const t = await getTranslations();
  const roles: UserRoles = await getUserRoles();

  return (
    <Container
      messages={getMessages(t)}
      errorMessages={getErrorMessages(t, { passwordMin: 8 })}
      apiErrorMessages={getApiErrorMessages(t)}
      listItems={listItems.map((item) => ({
        ...item,
        text: t(item.text),
      }))}
      roles={roles}
    />
  );
}
