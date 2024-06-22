"use server";
import {
  TMostLikedCourse,
  TMostPopularCourse,
  TMostViewedVideo,
} from "@/types/statistics";
import { Fetch } from "@/utils/axios";

import { TMessages } from "./Statistics.types";

export const fetchStats = async () => {
  const data = await Fetch.get("/statistics", { cache: "no-store" });

  return data;
};

export const getMessages = (t: (key: string) => string): TMessages => {
  return {
    title: t("Statistics.title"),
    mostLikedCoursesTitle: t("Statistics.mostLikedCoursesTitle"),
    mostPopularCoursesTitle: t("Statistics.mostPopularCoursesTitle"),
    mostPopularVideoTitle: t("Statistics.mostPopularVideoTitle"),
    noData: t("Statistics.noData"),
    num: t("Statistics.num"),
    courseName: t("Statistics.courseName"),
    likes: t("Statistics.likes"),
    videoName: t("Statistics.videoName"),
    views: t("Statistics.views"),
  };
};

export const getMostLikedCourses = (data: TMostLikedCourse[]) =>
  data.map((item, i) => ({
    index: `#${i + 1}`,
    name: item.name,
    likes: item.likes,
  }));

export const getMostLikedCoursesColumns = (messages: TMessages) => [
  {
    title: messages.num,
    dataIndex: "index",
    key: "index",
    width: 80,
  },
  {
    title: messages.courseName,
    dataIndex: "name",
    key: "name",
    ellipsis: true,
  },
  {
    title: messages.likes,
    dataIndex: "likes",
    key: "likes",
    width: 130,
  },
];

export const getMostPopularCourses = (data: TMostPopularCourse[]) =>
  data.map((item, i) => ({
    index: `#${i + 1}`,
    name: item.name,
    views: item.views,
  }));

export const getMostPopularCoursesColumns = (messages: TMessages) => [
  {
    title: messages.num,
    dataIndex: "index",
    key: "index",
    width: 80,
  },
  {
    title: messages.courseName,
    dataIndex: "name",
    key: "name",
    ellipsis: true,
  },
  {
    title: messages.views,
    dataIndex: "views",
    key: "views",
    width: 130,
  },
];

export const getMostViewedVideos = (data: TMostViewedVideo[]) =>
  data.map((item, i) => ({
    index: `#${i + 1}`,
    name: item.name,
    views: item.views,
  }));

export const getMostViewedVideosColumns = (messages: TMessages) => [
  {
    title: messages.num,
    dataIndex: "index",
    key: "index",
    width: 80,
  },
  {
    title: messages.videoName,
    dataIndex: "name",
    key: "name",
    ellipsis: true,
  },
  {
    title: messages.views,
    dataIndex: "views",
    key: "views",
    width: 130,
  },
];
