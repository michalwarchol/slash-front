import { FileExclamationOutlined } from "@ant-design/icons";
import { Table as AntdTable } from "antd";

import { TEducatorStats, TStudentStats } from "@/types/statistics";

import styles from "./Statistics.module.scss";
import { TMessages } from "./Statistics.types";
import {
  getMostLikedCourses,
  getMostLikedCoursesColumns,
  getMostPopularCourses,
  getMostPopularCoursesColumns,
  getMostViewedVideos,
  getMostViewedVideosColumns,
} from "./Statistics.utils";

interface IProps {
  educatorData: TEducatorStats;
  studentData: TStudentStats;
  type: "EDUCATOR" | "STUDENT";
  messages: TMessages;
}

export default function View({ educatorData, messages, type }: IProps) {
  const educatorContent = (
    <div className={styles.educatorContent}>
      <div className={styles.tableContent}>
        <div className={styles.subTitle}>{messages.mostLikedCoursesTitle}</div>
        {educatorData.mostLikedCourses.length === 0 ? (
          <div className={styles.noItems}>
            <FileExclamationOutlined className={styles.icon} />
            <p className={styles.noItemsText}>{messages.noData}</p>
          </div>
        ) : (
          <AntdTable
            dataSource={getMostLikedCourses(educatorData.mostLikedCourses)}
            columns={getMostLikedCoursesColumns(messages)}
            pagination={false}
          />
        )}
      </div>
      <div className={styles.tableContent}>
        <div className={styles.subTitle}>
          {messages.mostPopularCoursesTitle}
        </div>
        {educatorData.mostLikedCourses.length === 0 ? (
          <div className={styles.noItems}>
            <FileExclamationOutlined className={styles.icon} />
            <p className={styles.noItemsText}>{messages.noData}</p>
          </div>
        ) : (
          <AntdTable
            dataSource={getMostPopularCourses(educatorData.mostPopularCourses)}
            columns={getMostPopularCoursesColumns(messages)}
            pagination={false}
          />
        )}
      </div>
      <div className={styles.tableContent}>
        <div className={styles.subTitle}>{messages.mostPopularVideoTitle}</div>
        {educatorData.mostViewedVideos.length === 0 ? (
          <div className={styles.noItems}>
            <FileExclamationOutlined className={styles.icon} />
            <p className={styles.noItemsText}>{messages.noData}</p>
          </div>
        ) : (
          <AntdTable
            dataSource={getMostViewedVideos(educatorData.mostViewedVideos)}
            columns={getMostViewedVideosColumns(messages)}
            pagination={false}
          />
        )}
      </div>
    </div>
  );

  const studentContent = null;

  return (
    <div className={styles.statistics}>
      <div className={styles.statisticsInner}>
        <div className={styles.titleWrapper}>{messages.title}</div>
        <div className={styles.viewWrapper}>
          {type === "EDUCATOR" ? educatorContent : studentContent}
        </div>
      </div>
    </div>
  );
}
