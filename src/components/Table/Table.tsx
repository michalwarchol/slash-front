"use client";

import { Table as AntdTable, TableProps } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface IProps {
  total: number;
  items: object[];
  columns: TableProps<object>["columns"];
  loading?: boolean;
}

export default function Table({ items, columns, loading, total }: IProps) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const page = parseInt(searchParams.get("page") || "1");
  const perPage = parseInt(searchParams.get("perPage") || "10");

  return (
    <AntdTable
      dataSource={items}
      columns={columns}
      loading={loading}
      
      pagination={{
        current: page,
        pageSize: perPage,
        total,
      }}
      onChange={({ current, pageSize }) => {
        const params = new URLSearchParams(searchParams);

        const page = (current && current.toString()) || "1";
        params.set("page", page);

        const perPage = (pageSize && pageSize.toString()) || "10";
        params.set("perPage", perPage);

        replace(`${pathname}?${params.toString()}`);
      }}
    />
  );
}
