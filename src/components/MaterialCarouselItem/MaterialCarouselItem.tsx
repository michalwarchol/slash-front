"use client";

import {
  DeleteOutlined,
  FileImageOutlined,
  FileOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import { useTranslations } from "next-intl";

import Button from "@/components/Button";
import downloadFile from "@/utils/downloadFile";
import formatSize from "@/utils/formatSize";

import styles from "./MaterialCarouselItem.module.scss";

interface IProps {
  id: string;
  name: string;
  type: string;
  size: number;
  link: string;
  isAuthor: boolean;
  onDeleteClick: (id: string) => void;
}

export default function MaterialCarouselItem({
  id,
  name,
  type,
  size,
  link,
  isAuthor,
  onDeleteClick,
}: IProps) {
  const t = useTranslations();
  let icon;

  if (type === "image/png" || type === "image/jpeg") {
    icon = <FileImageOutlined className={styles.icon} />;
  } else if (type === "application/pdf") {
    icon = <FilePdfOutlined className={styles.icon} />;
  } else {
    icon = <FileOutlined className={styles.icon} />;
  }

  return (
    <Tooltip title={name} arrow={false} placement="bottom">
      <div className={styles.materialCarouselItem}>
        <div className={styles.materialCarouselItemInner}>
          <div className={styles.iconWrapper}>{icon}</div>
          <div className={styles.name}>{`${name}`}</div>
          <div className={styles.size}>{formatSize(size)}</div>
          <div
            className={styles.download}
            onClick={() =>
              downloadFile(`/courses/materials/file/${link}`, name)
            }
          >
            {t("MaterialCarouselItem.download")}
          </div>
          {isAuthor && (
            <div className={styles.delete}>
              <Button onClick={() => onDeleteClick(id)}>
                <DeleteOutlined />
              </Button>
            </div>
          )}
        </div>
      </div>
    </Tooltip>
  );
}
