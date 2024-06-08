import Image from "next/image";
import { getTranslations } from "next-intl/server";

import StaticModal from "@/components/StaticModal";
import backgroundPic from "@/public/images/unauthorized-background-original.jpg";

import Container from "./Login.container";
import styles from "./Login.module.scss";
import {
  getApiErrorMessages,
  getErrorMessages,
  getMessages,
} from "./Login.utils";

export default async function Login() {
  const t = await getTranslations();

  return (
    <div className={styles.loginContainer}>
      <Image
        src={backgroundPic}
        alt="background"
        fill
        style={{ objectFit: "cover" }}
      />
      <StaticModal>
        <Container
          messages={getMessages(t)}
          errorMessages={getErrorMessages(t)}
          apiErrorMessages={getApiErrorMessages(t)}
        />
      </StaticModal>
    </div>
  );
}
