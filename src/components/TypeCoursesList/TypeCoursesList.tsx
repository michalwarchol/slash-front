import { Breadcrumb } from "antd";

import { TCoursesByType } from "@/app/[locale]/types";

import ListItem from "./components/ListItem";
import styles from "./TypeCoursesList.module.scss";

interface IProps {
  data: TCoursesByType;
}

export default function TypeCoursesList({ data }: IProps) {
  return (
    <div className={styles.typeCoursesList}>
      <Breadcrumb
        separator={<div className={styles.breadcrumb}>/</div>}
        items={[
          {
            title: data.type.mainType.value,
            className: styles.breadcrumb,
          },
          {
            title: data.type.value,
            className: styles.breadcrumb,
          },
        ]}
      />
      <div className={styles.listItems}>
        {data.result.map((course) => (
          <ListItem key={course.course.id} data={course} />
        ))}
        <div className={styles.emptyItem1} />
        <div className={styles.emptyItem2} />
      </div>
    </div>
  );
}
