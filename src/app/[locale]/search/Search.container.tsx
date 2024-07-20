"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Paginator from "@/components/Paginator/Paginator";
import { TPagination } from "@/types/pagination";

import { search } from "./Search.actions";

export default function SearchContainer() {
  const searchParams = useSearchParams();
  const [data, setData] = useState([]);
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
    search(searchPhrase, typeName, page).then((res) => {
      setData(res.data);
      setPaginatorInfo(res.paginatorInfo);
    });
  }, [setData]);

  return (
    <div>
      {JSON.stringify(data)}
      <Paginator {...paginatorInfo} />
    </div>
  );
}
