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
};

export type TComment = {
  id: string;
  text: string;
  author: TUser;
  createdAt: Date;
  updatedAt: Date;
}