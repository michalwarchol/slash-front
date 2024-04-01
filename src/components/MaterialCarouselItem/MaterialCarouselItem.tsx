"use client";

import {
  FileImageOutlined,
  FileOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import { useTranslations } from "next-intl";

import downloadFile from "@/utils/downloadFile";
import formatSize from "@/utils/formatSize";

import styles from "./MaterialCarouselItem.module.scss";

interface IProps {
  id: string;
  name: string;
  type: string;
  size: number;
  link: string;
}

export default function MaterialCarouselItem({ name, type, size, link }: IProps) {
  const t = useTranslations();
  let icon;
  if (type === "png" || type === "jpg" || type === "jpeg") {
    icon = <FileImageOutlined className={styles.icon} />;
  } else if (type === "pdf") {
    icon = <FilePdfOutlined className={styles.icon} />;
  } else {
    icon = <FileOutlined className={styles.icon} />;
  }

  return (
    <div className={styles.materialCarouselItem} onClick={() => downloadFile(link, name)}>
      <div className={styles.materialCarouselItemInner}>
        <div className={styles.iconWrapper}>{icon}</div>
        <div className={styles.name}>{`${name}.${type}`}</div>
        <div className={styles.size}>{formatSize(size)}</div>
        <div className={styles.download}>
          {t("MaterialCarouselItem.download")}
        </div>
      </div>
    </div>
  );
}
