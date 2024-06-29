import { TCourseVideo, TFullType } from "@/types/course";
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
  },
  courseVideo: TCourseVideo;
};
