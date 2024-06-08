import Image from "next/image";
import { getTranslations } from "next-intl/server";

import StaticModal from "@/components/StaticModal";
import backgroundPic from "@/public/images/unauthorized-background-original.jpg";

import Container from "./Verify.container";
import styles from "./Verify.module.scss";
import {
  getApiErrorMessages,
  getErrorMessages,
  getMessages,
} from "./Verify.utils";

export default async function Verify() {
  const t = await getTranslations();
  return (
    <div className={styles.verifyContainer}>
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
