"use client";

import { Avatar, Divider, Typography } from "antd";
import { useTranslations } from "use-intl";

import { Link } from "@/app/navigation";
import VideoPlayer from "@/components/VideoPlayer";
import { TVideoResponse } from "@/types/course";

import styles from "./VideoWatch.module.scss";

const { Title, Text } = Typography;

interface IProps {
  data: TVideoResponse;
}

export default function VideoWatchView({ data }: IProps) {
  const t = useTranslations();

  return (
    <div className={styles.contentContainer}>
      <div className={styles.contentContainerInner}>
        <VideoPlayer
          src={data.link}
          thumbnail={data.thumbnailLink}
          duration={data.duration}
          courseId={data.course.id}
          previousVideoId={data.previousVideoId}
          nextVideoId={data.nextVideoId}
        />
        <div className={styles.videoInfo}>
          <div className={styles.videoTitleWrapper}>
            <Title level={2}>{data.name}</Title>
          </div>
          <div className={styles.authorAndViews}>
            <Link href={`/course-list/${data.course.creator.id}`}>
              <div className={styles.author}>
                <Avatar src={data.course.creator.avatar} />
                <Text
                  className={styles.authorName}
                >{`${data.course.creator.firstName} ${data.course.creator.lastName}`}</Text>
              </div>
            </Link>
            <Text className={styles.videoViews}>
              {t("CourseWatch.views", { views: data.views })}
            </Text>
          </div>
        </div>
        <Divider type="horizontal" className={styles.divider} />
        <div className={styles.descriptionWrapper}>
          <Title level={3}>{t("CourseWatch.description")}</Title>
          <div className={styles.description}>{data.description}</div>
        </div>
        <Divider type="horizontal" className={styles.divider} />
      </div>
    </div>
  );
}
