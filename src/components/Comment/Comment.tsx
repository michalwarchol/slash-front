"use client";

import { Avatar, Typography } from "antd";

import { TComment } from "@/types/video";
import { dateToTime } from "@/utils/timeUtils";

import styles from "./Comment.module.scss";

const { Text } = Typography;

interface IProps {
  comment: TComment;
}

export default function Comment({ comment }: IProps) {
  return (
    <div className={styles.comment}>
      <div className={styles.authorInfo}>
        <Avatar src={comment.author.avatar} className={styles.avatar} />
        <Text
          className={styles.authorName}
        >{`${comment.author.firstName} ${comment.author.lastName}`}</Text>
        <Text>{dateToTime(new Date(comment.createdAt))}</Text>
      </div>
      <div className={styles.text}>{comment.text}</div>
    </div>
  );
}
