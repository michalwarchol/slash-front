import { PlayCircleOutlined } from "@ant-design/icons";
import cls from "classnames";
import Image from "next/image";

import { secondsToTime } from "@/utils/timeUtils";

import styles from "./Thumbnail.module.scss";

interface IProps {
  src: string | null;
  className?: string;
  time?: number;
}

export default function Thumbnail({ src, className, time }: IProps) {
  return (
    <div className={cls(styles.thumbnail, className)}>
      {src ? (
        <Image
          src={src}
          alt="video"
          fill
          style={{ objectFit: "contain" }}
          sizes="436px"
          priority
        />
      ) : (
        <div className={styles.videoNotFoundImageWrapper}>
          <div className={styles.videoNotFoundImage}>
            <PlayCircleOutlined className={styles.playIcon} />
          </div>
        </div>
      )}
      {time !== undefined && (
        <div className={styles.duration}>{secondsToTime(time)}</div>
      )}
    </div>
  );
}
