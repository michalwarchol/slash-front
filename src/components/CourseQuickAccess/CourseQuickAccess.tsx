import { RightOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { cookies } from "next/headers";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { TTStudentStartedCourse } from "@/app/[locale]/types";
import { Link } from "@/app/navigation";
import { getCategoryValue } from "@/utils/getCategoryValue";

import styles from "./CourseQuickAccess.module.scss";

interface IProps {
  courseProgressData: TTStudentStartedCourse;
}

export default async function CourseQuickAccess({
  courseProgressData,
}: IProps) {
  const t = await getTranslations();
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "pl";

  return (
    <div className={styles.courseQuickAccess}>
      <div className={styles.encouragementWrapper}>
        <span>{t("CourseQuickAccess.encouragement")}</span>
      </div>
      <Link
        href={`/course/${courseProgressData.course.id}/watch/${courseProgressData.courseVideo.id}`}
        className={styles.link}
      >
        <div className={styles.courseInformation}>
          <div className={styles.imageWrapper}>
            <Image
              src={courseProgressData.courseVideo.thumbnailLink}
              alt="course-video-image"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className={styles.infoWrapper}>
            <div className={styles.courseTitle}>
              {courseProgressData.course.name}
            </div>
            <div className={styles.authorInfo}>
              <div className={styles.authorAvatar}>
                <Avatar
                  src={courseProgressData.course.creator.avatar}
                  icon={<UserOutlined />}
                />
              </div>
              <div className={styles.authorName}>
                {`${courseProgressData.course.creator.firstName} ${courseProgressData.course.creator.lastName}`}
              </div>
            </div>
            <div className={styles.categoryInfo}>
              <span>{t("CourseQuickAccess.category")}</span>
              <span>
                {getCategoryValue(
                  locale,
                  courseProgressData.course.type.mainType
                )}
              </span>
              <span className={styles.arrow}>
                <RightOutlined />
              </span>
              <span>
                {getCategoryValue(locale, courseProgressData.course.type)}
              </span>
            </div>
            <div className={styles.videoInfo}>
              {t("CourseQuickAccess.video", {
                video: courseProgressData.courseVideo.name,
              })}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
