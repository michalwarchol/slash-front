import { DeleteOutlined, EditOutlined, RightOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { ReadonlyURLSearchParams } from "next/navigation";

import { Link } from "@/app/navigation";
import Button from "@/components/Button";

import { TCourseListItem, TTableItem } from "./CourseList.types";

export const getColumns = (
  t: (key: string) => string,
  styles: Record<string, string>,
  isAuthor: boolean,
  windowWidth: number,
  onDeleteClick: (id: string) => void
): ColumnsType<object> => {
  const columns: ColumnsType<object> = [
    {
      title: t("CourseList.name"),
      dataIndex: "name",
      key: "name",
    },
  ];

  if (windowWidth > 768) {
    columns.push(
      {
        title: t("CourseList.mainType"),
        dataIndex: "mainType",
        key: "mainType",
      },
      {
        title: t("CourseList.type"),
        dataIndex: "type",
        key: "type",
      },
      {
        title: t("CourseList.numberOfVideos"),
        dataIndex: "numberOfVideos",
        key: "numberOfVideos",
      },
      {
        title: t("CourseList.numberOfLikes"),
        dataIndex: "numberOfLikes",
        key: "numberOfLikes",
      }
    );
  }

  columns.push({
    title: t("CourseList.actions"),
    dataIndex: "actions",
    key: "actions",
    width: "20%",
    render: (id: string) => (
      <div className={styles.buttons}>
        <div className={styles.buttonWrapper}>
          <Link href={`/course/${id}`}>
            <Button>
              <RightOutlined />
            </Button>
          </Link>
        </div>
        {isAuthor && (
          <>
            <div className={styles.buttonWrapper}>
              <Link href={`/course/${id}/edit`}>
                <Button>
                  <EditOutlined />
                </Button>
              </Link>
            </div>
            <div className={styles.buttonWrapper}>
              <Button onClick={() => onDeleteClick(id)}>
                <DeleteOutlined />
              </Button>
            </div>
          </>
        )}
      </div>
    ),
  });

  return columns;
};

export const getItems = (
  courses: Omit<
    TCourseListItem,
    "courseVideos" | "courseMaterials" | "likesCount"
  >[]
): TTableItem[] => {
  return courses.map((course) => ({
    key: course.id,
    id: course.id,
    name: course.name,
    mainType: course.type.mainType.value,
    type: course.type.value,
    numberOfVideos: course.numberOfVideos,
    numberOfLikes: course.numberOfLikes,
    actions: course.id,
  }));
};

export const getInitialValues = (searchParams: ReadonlyURLSearchParams) => {
  const orderBy = searchParams.get("orderBy");
  const order = searchParams.get("order");

  return {
    orderBy: orderBy || "course.name",
    order: order || "ASC",
  };
};
