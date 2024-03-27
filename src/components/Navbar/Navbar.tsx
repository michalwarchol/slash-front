import Button from "@/components/Button";

import styles from "./Navbar.module.scss";

interface IProps {
  type: "EDUCATOR" | "STUDENT";
}

export default function Navbar({ type }: IProps) {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarInner}>
        {type === "EDUCATOR" && (
          <div className={styles.buttonContainer}>
            <Button className={styles.button}>Add course</Button>
            <Button className={styles.button}>My courses</Button>
            <Button className={styles.button}>Statistics</Button>
          </div>
        )}
      </div>
    </div>
  );
}
