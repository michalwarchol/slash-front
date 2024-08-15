import { DesktopOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

import { TCourseTypeResult } from "@/app/[locale]/types";
import { Link } from "@/app/navigation";
import Thumbnail from "@/components/Thumbnail";

import styles from "./ListItem.module.scss";

interface IProps {
  data: TCourseTypeResult;
}

export default async function ListItem({ data }: IProps) {
  return (
    <Link href={`/course/${data.course.id}`} className={styles.link}>
      <div className={styles.listItem}>
        <Thumbnail
          src={data.firstVideo ? data.firstVideo.thumbnailLink : null}
        />
        <div className={styles.name}>{data.course.name}</div>
        <div className={styles.creator}>
          <div className={styles.creatorAvatar}>
            <Avatar src={data.course.creator.avatar} icon={<UserOutlined />} />
          </div>
          <div className={styles.creatorName}>
            {`${data.course.creator.firstName} ${data.course.creator.lastName}`}
          </div>
        </div>
        <div className={styles.videos}>
          <DesktopOutlined className={styles.desktopIcon} />
          {data.totalVideos}
        </div>
      </div>
    </Link>
  );
}
