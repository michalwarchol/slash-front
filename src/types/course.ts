import { TUser } from "./user";

type TCourseTypeTranslated = {
  id: string;
  name: string;
  value: string;
};

export type TCourseType = TCourseTypeTranslated & {
  mainType: TCourseTypeTranslated;
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

export type TFullType = {
  id: string;
  name: string;
  valueEn: string;
  valuePl: string;
  mainType: {
    id: string;
    name: string;
    valueEn: string;
    valuePl: string;
  };
};

export type TCourseResponse = {
  id: string;
  name: string;
  description: string;
  creator: TUser;
  type: TFullType;
  numberOfVideos: number;
  numberOfLikes: number;
};

export type TCourseFullType = {
  id: string;
  name: string;
  valuePl: string;
  valueEn: string;
};

export type TCourseMainType = TCourseTypeTranslated & {
  subTypes: TCourseTypeTranslated[];
};

export type TSearchResult = {
  course: {
    id: string;
    name: string;
    description: string;
    creator: TUser;
    type: TCourseFullType;
  };
  firstVideo: TCourseVideo;
  totalVideos: number;
};
