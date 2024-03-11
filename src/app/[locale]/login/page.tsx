import Image from "next/image";
import { getTranslations } from "next-intl/server";

import StaticModal from "@/components/StaticModal";
import backgroundPic from "@/public/images/unauthorized-background-original.jpg";

import styles from "./Login.module.scss";
import {
  getApiErrorMessages,
  getErrorMessages,
  getMessages,
} from "./Login.utils";
import View from "./Login.view";

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
        <View
          messages={getMessages(t)}
          errorMessages={getErrorMessages(t)}
          apiErrorMessages={getApiErrorMessages(t)}
        />
      </StaticModal>
    </div>
  );
}
