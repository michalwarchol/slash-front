import { getTranslations } from "next-intl/server";

import styles from "./Footer.module.scss";

export const revalidate = 3600 * 24; // revalidate every day

export default async function Footer() {
  const t = await getTranslations("Footer");
  return (
    <div className={styles.footer}>
      <span>
        {t("statementPart1")}
        {new Date().getFullYear()}
        {t("statementPart2")}
      </span>
    </div>
  );
}
