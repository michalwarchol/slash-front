import { PlayCircleOutlined } from "@ant-design/icons";
import { Image } from "antd";

import { Link } from "@/app/navigation";
import { TSearchResult } from "@/types/course";

import styles from "./RecommendedCourse.module.scss";

interface IProps {
  data: TSearchResult;
}

export default function RecommendedCourse({ data }: IProps) {
  return (
    <Link
      href={`/course/${data.course.id}`}
      className={styles.recommendedCourseLink}
    >
      <div className={styles.recommendedCourse}>
        <div className={styles.thumbnail}>
          {data.firstVideo ? (
            <Image preview={false} src={data.firstVideo.thumbnailLink} />
          ) : (
            <div className={styles.videoNotFoundImageWrapper}>
              <div className={styles.videoNotFoundImage}>
                <PlayCircleOutlined className={styles.playIcon} />
              </div>
            </div>
          )}
        </div>
        <div className={styles.info}>
          <div className={styles.title}>{data.course.name}</div>
          <div className={styles.author}>
            {`${data.course.creator.firstName} ${data.course.creator.lastName}`}
          </div>
        </div>
      </div>
    </Link>
  );
}
