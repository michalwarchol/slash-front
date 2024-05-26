import { TCourseVideo, TFullType } from "./course";
import { TUser } from "./user";

export type TVideoResponse = TCourseVideo & {
  course: {
    id: string;
    name: string;
    description: string;
    creator: TUser;
    type: TFullType;
  };
  previousVideoId: string | null;
  nextVideoId: string | null;
  rating: number;
  myRating: {
    id: string;
    rating: number;
  } | null;
};

export type TComment = {
  id: string;
  text: string;
  author: TUser;
  createdAt: Date;
  updatedAt: Date;
};

export type TVideoRating = {
  id: string;
  rating: number;
};

export type TVideoEdit = {
  name: string;
  description: string;
  creatorId: string;
}