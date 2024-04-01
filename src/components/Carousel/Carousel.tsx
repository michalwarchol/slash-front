"use client";

import { FileExclamationOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

import Button from "@/components/Button";

import styles from "./Carousel.module.scss";

const { Paragraph } = Typography;

interface IProps {
  title: string;
  items: ReactNode[];
  onLoadMore: () => void;
  isLoadMore: boolean;
}

export default function Carousel({
  items,
  title,
  onLoadMore,
  isLoadMore,
}: IProps) {
  const t = useTranslations();
  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.carouselTitle}>{title}</div>
      <div className={styles.carousel}>{items}</div>
      <div className={styles.noItems}>
        <FileExclamationOutlined className={styles.icon} />
        <Paragraph className={styles.noItemsText}>{t("Carousel.noData")}</Paragraph>
      </div>
      {isLoadMore && (
        <div className={styles.loadMoreButton}>
          <Button onClick={onLoadMore}>{t("Carousel.loadMore")}</Button>
        </div>
      )}
    </div>
  );
}
