"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { search } from "./Search.actions";

export default function SearchContainer() {
  const searchParams = useSearchParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const searchPhrase = searchParams.get("search") || "";
    const typeName = searchParams.get("typeName") || "";
    const page = searchParams.get("page") || "1";
    search(searchPhrase, typeName, page).then((res) => {
      setData(res.data);
    });
  }, [setData]);

  return <div>{JSON.stringify(data)}</div>;
}
