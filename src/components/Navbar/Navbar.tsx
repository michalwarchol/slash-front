import { Link } from "@/app/navigation";
import Button from "@/components/Button";

import styles from "./Navbar.module.scss";

interface IProps {
  type: "EDUCATOR" | "STUDENT";
  id: string;
}

export default function Navbar({ type, id }: IProps) {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarInner}>
        {type === "EDUCATOR" && (
          <div className={styles.buttonContainer}>
            <Link href="/add-course">
              <Button className={styles.button}>Add course</Button>
            </Link>
            <Link href={`/course-list/${id}`}>
              <Button className={styles.button}>My courses</Button>
            </Link>
            <Link href="/statistics">
              <Button className={styles.button}>Statistics</Button>
            </Link>
          </div>
        )}
        {type === "STUDENT" && (
          <div className={styles.buttonContainer}>
            <Link href="/statistics">
              <Button className={styles.button}>Statistics</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
