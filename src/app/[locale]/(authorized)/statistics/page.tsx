import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

import { EUserTypes } from "@/types/user";

import { defaultEducatorData, defaultStudentStats } from "./Statistics.consts";
import { fetchStats, getMessages } from "./Statistics.utils";
import View from "./Statistics.view";

export default async function Statistics() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;
  const locale = cookieStore.get("NEXT_LOCALE")?.value;

  const data = await fetchStats();
  const t = await getTranslations();

  return (
    <View
      educatorData={
        user.type === EUserTypes.EDUCATOR ? data : defaultEducatorData
      }
      studentData={
        user.type === EUserTypes.STUDENT ? data : defaultStudentStats
      }
      type={user.type}
      messages={getMessages(t)}
      locale={locale}
    />
  );
}
