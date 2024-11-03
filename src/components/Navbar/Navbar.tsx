import { getTranslations } from "next-intl/server";

import { Link } from "@/app/navigation";
import Button from "@/components/Button";
import { EUserTypes } from "@/types/user";

import styles from "./Navbar.module.scss";

interface IProps {
  type: EUserTypes;
  id: string;
}

export default async function Navbar({ type, id }: IProps) {
  const t = await getTranslations("Navbar");

  return (
    <div className={styles.navbar}>
      <div className={styles.navbarInner}>
        {type === EUserTypes.EDUCATOR && (
          <div className={styles.buttonContainer}>
            <Link href="/add-course">
              <Button className={styles.button}>{t("addCourse")}</Button>
            </Link>
            <Link href={`/course-list/${id}`}>
              <Button className={styles.button}>{t("myCourses")}</Button>
            </Link>
            <Link href="/statistics">
              <Button className={styles.button}>{t("statistics")}</Button>
            </Link>
          </div>
        )}
        {type === EUserTypes.STUDENT && (
          <div className={styles.buttonContainer}>
            <Link href="/statistics">
              <Button className={styles.button}>{t("statistics")}</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
