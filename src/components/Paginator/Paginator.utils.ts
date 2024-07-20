import { ReadonlyURLSearchParams } from "next/navigation";

export const getParamsWithPage = (
  searchParams: ReadonlyURLSearchParams,
  page: number
): string => {
  let stringParams = searchParams.toString();
  stringParams = stringParams.replace(/&page=\d+/g, "");
  stringParams += `&page=${page}`;

  return stringParams;
};
