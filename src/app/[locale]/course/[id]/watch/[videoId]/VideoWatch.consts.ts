import { TCommentsSettings } from "./VideoWatch.types";

export const commentsSettingsInitialValues: TCommentsSettings = {
  orderBy: "createdAt",
  order: "ASC",
};

export const orderByOptions = (t: (key: string) => string) => [
  {
    id: "createdAt",
    name: t("createdAt"),
  },
];

export const orderOptions = (t: (key: string) => string) => [
  {
    id: "ASC",
    name: t("asc"),
  },
  {
    id: "DESC",
    name: t("desc"),
  },
];
