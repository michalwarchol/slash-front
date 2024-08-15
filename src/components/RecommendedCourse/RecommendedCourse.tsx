import { Link } from "@/app/navigation";
import { TSearchResult } from "@/types/course";

import Thumbnail from "../Thumbnail";
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
        <Thumbnail
          src={data.firstVideo ? data.firstVideo.thumbnailLink : null}
          className={styles.thumbnail}
        />
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
