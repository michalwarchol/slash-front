"use client";

import { Spin } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Paginator from "@/components/Paginator/Paginator";
import SearchResult from "@/components/SearchResult";
import { TSearchResult } from "@/types/course";
import { TPagination } from "@/types/pagination";

import { search } from "./Search.actions";
import styles from "./Search.module.scss";

export default function SearchContainer() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<TSearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [paginatorInfo, setPaginatorInfo] = useState<TPagination>({
    page: 1,
    perPage: 10,
    total: 0,
    count: 0,
  });

  useEffect(() => {
    const searchPhrase = searchParams.get("search") || "";
    const typeName = searchParams.get("typeName") || "";
    const page = searchParams.get("page") || "1";
    setLoading(true);
    search(searchPhrase, typeName, page)
      .then((res) => {
        setData(res.data);
        setPaginatorInfo(res.paginatorInfo);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [searchParams, setData]);

  return loading ? (
    <div className={styles.loaderWrapper}>
      <Spin />
    </div>
  ) : (
    <div className={styles.contentContainer}>
      <div className={styles.contentContainerInner}>
        {data.map((result) => (
          <SearchResult key={result.course.id} data={result} />
        ))}
        <Paginator {...paginatorInfo} />
      </div>
    </div>
  );
}
