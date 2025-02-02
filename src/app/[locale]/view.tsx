import CourseQuickAccess from "@/components/CourseQuickAccess";
import TypeCoursesList from "@/components/TypeCoursesList";
import { EUserTypes } from "@/types/user";

import styles from "./page.module.scss";
import { TCoursesByType, TTStudentStartedCourse } from "./types";

interface IProps {
  userType?: EUserTypes;
  studentStartedCourses: TTStudentStartedCourse[];
  coursesByType: TCoursesByType[];
}

export function View({
  userType,
  studentStartedCourses,
  coursesByType,
}: IProps) {
  return (
    <div className={styles.mainPage}>
      <div className={styles.mainPageInner}>
        {userType === EUserTypes.STUDENT && studentStartedCourses[0] && (
          <CourseQuickAccess courseProgressData={studentStartedCourses[0]} />
        )}
        {coursesByType.map((courses) => (
          <TypeCoursesList key={courses.type.name} data={courses} />
        ))}
      </div>
    </div>
  );
}
