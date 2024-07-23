"use client";

import { PlayCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Image } from "antd";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { Link } from "@/app/navigation";
import { TSearchResult } from "@/types/course";
import { getCategoryValue } from "@/utils/getCategoryValue";

import styles from "./SearchResult.module.scss";

interface IProps {
  data: TSearchResult;
}

export default function SearchResult({ data }: IProps) {
  const t = useTranslations("SearchResult");
  const { locale } = useParams<{ locale: string }>();

  return (
    <Link className={styles.searchResult} href={`/course/${data.course.id}`}>
      <div className={styles.searchResultInner}>
        <div className={styles.thumbnail}>
          {data.firstVideo && data.firstVideo.thumbnailLink ? (
            <Image src={data.firstVideo.thumbnailLink} preview={false} />
          ) : (
            <div className={styles.videoNotFoundImageWrapper}>
              <div className={styles.videoNotFoundImage}>
                <PlayCircleOutlined className={styles.playIcon} />
              </div>
            </div>
          )}
        </div>
        <div className={styles.courseData}>
          <div className={styles.title}>{data.course.name}</div>
          <div className={styles.authorInfo}>
            <div className={styles.authorAvatar}>
              <Avatar
                src={data.course.creator.avatar}
                icon={<UserOutlined />}
              />
            </div>
            <div className={styles.authorName}>
              {`${data.course.creator.firstName} ${data.course.creator.lastName}`}
            </div>
          </div>
          <div className={styles.categoryInfo}>
            <span>{t("category")}</span>
            <span>{getCategoryValue(locale, data.course.type)}</span>
          </div>
          <div className={styles.videosInfo}>
            <span>{t("totalVideos")}</span>
            <span>{data.totalVideos}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
