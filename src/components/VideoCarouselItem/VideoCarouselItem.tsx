"use client";

import { Image, Tooltip, Typography } from "antd";
import { useTranslations } from "next-intl";

import { Link } from "@/app/navigation";
import { secondsToTime } from "@/utils/timeUtils";

import styles from "./VideoCarouselItem.module.scss";

const { Text } = Typography;

interface IProps {
  courseId: string;
  id: string;
  name: string;
  thumbnail: string;
  views?: number;
  duration?: number;
}

export default function VideoCarouselItem({
  courseId,
  id,
  thumbnail,
  name,
  duration,
  views,
}: IProps) {
  const t = useTranslations();
  return (
    <div className={styles.videoCarouselItem}>
      <Tooltip title={name} arrow={false} placement="bottom">
        <div className={styles.itemContent}>
          <Link href={`/course/${courseId}/watch/${id}`}>
            <div>
              <div className={styles.thumbnail}>
                <Image
                  src={thumbnail}
                  alt="video"
                  width="336px"
                  height="189px"
                  preview={false}
                />
                {duration !== undefined && (
                  <div className={styles.duration}>
                    {secondsToTime(duration)}
                  </div>
                )}
              </div>
              <div className={styles.info}>
                <div className={styles.videoTitle}>{name}</div>
                {views !== undefined && (
                  <Text>
                    {t("VideoCarouselItem.views", {
                      views: views.toLocaleString(),
                    })}
                  </Text>
                )}
              </div>
            </div>
          </Link>
        </div>
      </Tooltip>
    </div>
  );
}
