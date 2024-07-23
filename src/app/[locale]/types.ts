import {
  TCourseFullType,
  TCourseType,
  TCourseVideo,
  TFullType,
} from "@/types/course";
import { TUser } from "@/types/user";

export type TTStudentStartedCourse = {
  id: string;
  hasEnded: boolean;
  watchTime: number;
  createdAt: Date;
  course: {
    id: string;
    name: string;
    description: string;
    creator: TUser;
    type: TFullType;
  };
  courseVideo: TCourseVideo;
};

export type TCourseTypeResult = {
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

export type TCoursesByType = {
  type: TCourseType;
  result: TCourseTypeResult[];
};
