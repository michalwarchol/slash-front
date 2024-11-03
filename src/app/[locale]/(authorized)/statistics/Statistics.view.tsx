import { FileExclamationOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Table as AntdTable } from "antd";
import { cookies } from "next/headers";
import Image from "next/image";

import { TEducatorStats, TStudentStats } from "@/types/statistics";
import { EUserTypes } from "@/types/user";

import styles from "./Statistics.module.scss";
import { TMessages } from "./Statistics.types";
import {
  getMostLikedCourses,
  getMostLikedCoursesColumns,
  getMostPopularCourses,
  getMostPopularCoursesColumns,
  getMostViewedVideos,
  getMostViewedVideosColumns,
  getTimeFromSeconds,
} from "./Statistics.utils";

interface IProps {
  educatorData: TEducatorStats;
  studentData: TStudentStats;
  type: EUserTypes;
  messages: TMessages;
}

export default function View({
  educatorData,
  studentData,
  messages,
  type,
}: IProps) {
  const locale = cookies().get("NEXT_LOCALE")?.value;
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

  const studentContent = (
    <div className={styles.studentContent}>
      <div className={styles.statNode}>
        <div className={styles.statTitle}>{messages.coursesEnded}</div>
        <div className={styles.statContent}>
          {studentData.coursesEnded || messages.noData}
        </div>
      </div>
      <div className={styles.statNode}>
        <div className={styles.statTitle}>{messages.coursesInProgress}</div>
        <div className={styles.statContent}>
          {studentData.coursesInProgress || messages.noData}
        </div>
      </div>
      <div className={styles.statNode}>
        <div className={styles.statTitle}>{messages.watchTime}</div>
        <div className={styles.statContent}>
          {studentData.watchTime
            ? getTimeFromSeconds(studentData.watchTime)
            : messages.noData}
        </div>
      </div>
      <div className={styles.statNode}>
        <div className={styles.statTitle}>{messages.favCategory}</div>
        <div className={styles.statContent}>
          {studentData.favCategory
            ? studentData.favCategory[locale === "pl" ? "valuePl" : "valueEn"]
            : messages.noData}
        </div>
      </div>
      <div className={styles.statNode}>
        <div className={styles.statTitle}>{messages.favEducator}</div>
        {studentData.favEducator ? (
          <div className={styles.statContent}>
            {studentData.favEducator.avatar ? (
              <Image
                src={studentData.favEducator.avatar || ""}
                alt="user avatar"
                className={styles.avatar}
                width={120}
                height={120}
              />
            ) : (
              <Avatar icon={<UserOutlined />} className={styles.avatar} />
            )}
            <div>
              {`${studentData.favEducator.firstName} ${studentData.favEducator.lastName}`}
            </div>
          </div>
        ) : (
          <div className={styles.statContent}>{messages.noData}</div>
        )}
      </div>
    </div>
  );

  return (
    <div className={styles.statistics}>
      <div className={styles.statisticsInner}>
        <div className={styles.titleWrapper}>{messages.title}</div>
        <div className={styles.viewWrapper}>
          {type === EUserTypes.EDUCATOR ? educatorContent : studentContent}
        </div>
      </div>
    </div>
  );
}
