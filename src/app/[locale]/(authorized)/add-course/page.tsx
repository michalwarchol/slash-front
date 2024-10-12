import { getTranslations } from "next-intl/server";

import { getCourseTypes } from "./AddCourse.actions";
import { initialValues } from "./AddCourse.consts";
import { getErrorMessages, getMessages } from "./AddCourse.utils";
import View from "./AddCourse.view";

export default async function Home() {
  const t = await getTranslations();
  const courseTypes = await getCourseTypes();

  return (
    <View
      initialValues={initialValues}
      courseTypes={courseTypes}
      messages={getMessages(t)}
      errorMessages={getErrorMessages(t)}
    />
  );
}
