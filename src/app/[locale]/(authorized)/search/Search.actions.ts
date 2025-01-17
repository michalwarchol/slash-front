"use server";

import Fetch from "@/utils/requestHandler";

export async function search(
  search: string = "",
  typeName: string = "",
  page: string = "1"
) {
  const data = await Fetch.get(
    `/courses/search?search=${search}&typeName=${typeName}&page=${page}&perPage=10`
  );

  return data;
}
