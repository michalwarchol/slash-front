import { TUser } from "./user";

export type TMostLikedCourse = {
  id: string;
  name: string;
  description: string;
  creatorId: string;
  typeId: string;
  likes: string;
}

export type TMostPopularCourse = {
  id: string;
  name: string;
  description: string;
  creatorId: string;
  typeId: string;
  views: string;
};

export type TMostViewedVideo = {
  id: string;
  name: string;
  description: string;
  link: string;
  thumbnailLink: string;
  courseId: string;
  duration: number,
  views: number,
  createdAt: string;
  updatedAt: string;
};

export type TEducatorStats = {
  mostLikedCourses: TMostLikedCourse[];
  mostPopularCourses: TMostPopularCourse[];
  mostViewedVideos: TMostViewedVideo[];
}

export type TStudentStats = {
  coursesEnded: number;
  coursesInProgress: number;
  watchTime: number;
  favEducator: TUser;
  favCategory: {
    id: string;
    name: string;
    valuePl: string;
    valueEn: string;
    mainTypeId: string;
  };
};
