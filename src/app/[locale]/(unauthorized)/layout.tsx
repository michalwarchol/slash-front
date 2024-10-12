import Image from "next/image";

import StaticModal from "@/components/StaticModal";
import backgroundPic from "@/public/images/unauthorized-background-original.jpg";

import styles from "./layout.module.scss";

export default function UnauthorizedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={styles.unauthorizedContainer}>
      <Image
        src={backgroundPic}
        alt="background"
        fill
        style={{ objectFit: "cover" }}
      />
      <StaticModal>{children}</StaticModal>
    </div>
  );
}
