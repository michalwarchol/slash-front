import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

import { defaultEducatorData, defaultStudentStats } from "./Statistics.consts";
import { fetchStats, getMessages } from "./Statistics.utils";
import View from "./Statistics.view";

export default async function Statistics() {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  const data = await fetchStats();
  const t = await getTranslations();

  return (
    <View
      educatorData={user.type === "EDUCATOR" ? data : defaultEducatorData}
      studentData={user.type === "STUDENT" ? data : defaultStudentStats}
      type={user.type}
      messages={getMessages(t)}
    />
  );
}
