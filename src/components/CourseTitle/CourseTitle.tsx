"use client";

import {
  DeleteOutlined,
  EditOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { Tooltip, Typography } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Link, useRouter } from "@/app/navigation";
import Button from "@/components/Button";
import { TUser } from "@/types/user";

import styles from "./CourseTitle.module.scss";
import { getLikeCount } from "./CourseTitle.utils";

const { Title, Text, Paragraph } = Typography;

interface IProps {
  courseId: string;
  title: string;
  isAuthor: boolean;
  creator: TUser;
  isLoggedIn: boolean;
  isLiked: boolean;
  likes: number;
  onLikeClick: (isLike: boolean) => void;
  onDeleteClick: () => void;
}

export default function CourseTitle({
  courseId,
  title,
  isLiked,
  isAuthor,
  isLoggedIn,
  likes,
  creator,
  onLikeClick,
  onDeleteClick,
}: IProps) {
  const [isCourseLiked, setIsCourseLiked] = useState(isLiked);
  const router = useRouter();
  const t = useTranslations();

  return (
    <div className={styles.courseTitle}>
      <Title className={styles.title}>{title}</Title>
      <Paragraph>
        {t("CourseTitle.author", {
          author: `${creator.firstName} ${creator.lastName}`,
        })}
      </Paragraph>
      {isAuthor && (
        <div className={styles.authorButtons}>
          <Link href={`/course/${courseId}/upload`}>
            <Button className={styles.authorButtonWrapper}>
              {t("CourseTitle.upload")}
            </Button>
          </Link>
          <Tooltip title={t("CourseTitle.uploadMaterial")}>
            <div className={styles.authorButtonWrapper}>
              <Button>
                <FileAddOutlined />
              </Button>
            </div>
          </Tooltip>
          <Tooltip title={t("CourseTitle.edit")}>
            <div className={styles.authorButtonWrapper}>
              <Link href={`/course/${courseId}/edit`}>
                <Button>
                  <EditOutlined />
                </Button>
              </Link>
            </div>
          </Tooltip>
          <Tooltip title={t("CourseTitle.delete")}>
            <div className={styles.authorButtonWrapper}>
              <Button onClick={onDeleteClick}>
                <DeleteOutlined />
              </Button>
            </div>
          </Tooltip>
        </div>
      )}
      <div>
        <Text className={styles.likeText}>
          {t("CourseTitle.likes", {
            likes: getLikeCount(likes, isLiked, isCourseLiked),
          })}
        </Text>
        <Button
          onClick={() => {
            if (isLoggedIn) {
              setIsCourseLiked(!isCourseLiked);
              onLikeClick(!isCourseLiked);

              return;
            }
            router.push("/login");
          }}
        >
          {t(isCourseLiked ? "CourseTitle.dislike" : "CourseTitle.like")}
        </Button>
      </div>
    </div>
  );
}
