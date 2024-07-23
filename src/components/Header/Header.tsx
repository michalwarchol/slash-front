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

import SearchFilters from "./components/SearchFilters";
import { getCourseTypes } from "./Header.actions";
import styles from "./Header.module.scss";
import {
  convertCourseTypesToCascaderOptions,
  getInitialValues,
  getSearchFilterMessages,
} from "./Header.utils";

interface IProps {
  searchParams: {
    search: string;
    typeName: string;
  };
}

export default async function Header({
  searchParams = { search: "", typeName: "" },
}: IProps) {
  const t = await getTranslations("header");
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  const langCookie = cookieStore.get("NEXT_LOCALE");
  const lang = langCookie?.value;

  const courseTypes = await getCourseTypes();

  return (
    <div className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.logo}>
          <Link href="/">
            <span className={styles.link}>{t("title")}</span>
          </Link>
        </div>
        <div className={styles.searchbar}>
          <SearchFilters
            initialValues={getInitialValues(searchParams, courseTypes)}
            typeOptions={convertCourseTypesToCascaderOptions(courseTypes)}
            messages={getSearchFilterMessages(t)}
          />
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
                <Button>{t("login")}</Button>
              </Link>
            </div>
            <Link href="/register">
              <Button>{t("register")}</Button>
            </Link>
          </div>
        )}
      </div>
      {!user && (
        <div className={styles.outerUserbuttons}>
          <div className={styles.button}>
            <Link href="/login">
              <Button>{t("login")}</Button>
            </Link>
          </div>
          <Link href="/register">
            <Button>{t("register")}</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
