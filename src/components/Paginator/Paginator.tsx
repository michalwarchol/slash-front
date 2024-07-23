"use client";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useSearchParams } from "next/navigation";

import { Link } from "@/app/navigation";
import Button from "@/components/Button";

import styles from "./Paginator.module.scss";
import { getParamsWithPage } from "./Paginator.utils";

interface IProps {
  page: number;
  perPage: number;
  total: number;
  count: number;
}

export default function Paginator({ page, perPage, total, count }: IProps) {
  const searchParams = useSearchParams();
  const isFirstPage = page === 1;
  const isLastPage = (page - 1) * perPage + count === total;

  return (
    <div className={styles.paginator}>
      <div className={styles.buttons}>
        {isFirstPage && (
          <>
            <div className={styles.emptyButton} />
            <div className={styles.emptyButton} />
          </>
        )}
        {!isFirstPage && (
          <>
            <Link href={`/search?${getParamsWithPage(searchParams, 1)}`}>
              <Button className={styles.button}>
                <LeftOutlined />
              </Button>
            </Link>
            <Link href={`/search?${getParamsWithPage(searchParams, page - 1)}`}>
              <Button className={styles.button}>{page - 1}</Button>
            </Link>
          </>
        )}
        <Link href={`/search?${getParamsWithPage(searchParams, page)}`}>
          <Button className={styles.button}>{page}</Button>
        </Link>
        {!isLastPage && (
          <>
            <Link href={`/search?${getParamsWithPage(searchParams, page + 1)}`}>
              <Button className={styles.button}>{page + 1}</Button>
            </Link>
            <Link
              href={`/search?${getParamsWithPage(
                searchParams,
                Math.ceil(total / perPage)
              )}`}
            >
              <Button className={styles.button}>
                <RightOutlined />
              </Button>
            </Link>
          </>
        )}
        {isLastPage && (
          <>
            <div className={styles.emptyButton} />
            <div className={styles.emptyButton} />
          </>
        )}
      </div>
    </div>
  );
}
