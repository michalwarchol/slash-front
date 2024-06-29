import CourseQuickAccess from "@/components/CourseQuickAccess";

import styles from "./page.module.scss";
import { TTStudentStartedCourse } from "./types";

interface IProps {
  userType?: "STUDENT" | "EDUCATOR";
  studentStartedCourses: TTStudentStartedCourse[];
}

export function View({ userType, studentStartedCourses }: IProps) {
  return (
    <div className={styles.mainPage}>
      <div className={styles.mainPageInner}>
        {userType === "STUDENT" && studentStartedCourses[0] && (
          <CourseQuickAccess courseProgressData={studentStartedCourses[0]} />
        )}
      </div>
    </div>
  );
}
