import { TUser } from "./user";

export type TCourseType = {
  id: string;
  name: string;
  value: string;
  mainType: {
    id: string;
    name: string;
    value: string;
  };
};

export type TCourseVideo = {
  id: string;
  name: string;
  description: string;
  link: string;
  thumbnailLink: string;
  duration: number;
  views: number;
};

export type TCourseMaterial = {
  id: string;
  name: string;
  link: string;
  type: string;
  size: number;
};

export type TCourse = {
  id: string;
  name: string;
  description: string;
  creator: TUser;
  type: TCourseType;
  courseVideos: TCourseVideo[];
  courseMaterials: TCourseMaterial[];
  likesCount: number;
};
