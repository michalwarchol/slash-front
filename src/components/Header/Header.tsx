import {
  CompassOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";
import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

import { Link } from "@/app/navigation";
import Button from "@/components/Button";
import Searchbar from "@/components/Searchbar";

import styles from "./Header.module.scss";

export default async function Header() {
  const t = await getTranslations();
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  const langCookie = cookieStore.get("NEXT_LOCALE");
  const lang = langCookie?.value;

  return (
    <div className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.logo}>
          <Link href="/">
            <span className={styles.link}>{t("header.title")}</span>
          </Link>
        </div>
        <div className={styles.searchbar}>
          <Searchbar searchPlaceholder={t("header.search")} />
        </div>
        {user && (
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: (
                    <a href={`/${lang}/settings`} className={styles.menuLink}>
                      Settings
                    </a>
                  ),
                  icon: <CompassOutlined />,
                },
                {
                  className: styles.menuLink,
                  key: "2",
                  danger: true,
                  label: <a href={`/${lang}/logout`}>Logout</a>,
                  icon: <LogoutOutlined />,
                },
              ],
            }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <div className={styles.userAvatarWrapper}>
              <div className={styles.userName}>{user.firstName}</div>
              <Avatar
                icon={<UserOutlined />}
                src={user.avatar}
                className={styles.avatar}
              />
            </div>
          </Dropdown>
        )}
        {!user && (
          <div className={styles.userbuttons}>
            <div className={styles.button}>
              <Link href="/login">
                <Button>{t("header.login")}</Button>
              </Link>
            </div>
            <Link href="/register">
              <Button>{t("header.register")}</Button>
            </Link>
          </div>
        )}
      </div>
      {!user && (
        <div className={styles.outerUserbuttons}>
          <div className={styles.button}>
            <Link href="/login">
              <Button>{t("header.login")}</Button>
            </Link>
          </div>
          <Link href="/register">
            <Button>{t("header.register")}</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
