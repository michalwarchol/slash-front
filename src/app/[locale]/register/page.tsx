"use server";

import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { getUserRoles } from "@/app/actions";
import StaticModal from "@/components/StaticModal";
import backgroundPic from "@/public/images/unauthorized-background-original.jpg";

import { listItems } from "./register.consts";
import Container from "./register.container";
import { UserRoles } from "./register.types";
import {
  getApiErrorMessages,
  getErrorMessages,
  getMessages,
} from "./register.utils";
import styles from "./styles.module.scss";

export default async function Register() {
  const t = await getTranslations();
  const roles: UserRoles = await getUserRoles();

  return (
    <div className={styles.registerContainer}>
      <Image
        src={backgroundPic}
        alt="background"
        fill
        style={{ objectFit: "cover" }}
      />
      <StaticModal>
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
      </StaticModal>
    </div>
  );
}
