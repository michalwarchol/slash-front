import { TCourse } from "@/types/course";

export type TTableItem = {
  id: string;
  name: string;
  type: string;
  numberOfVideos: number;
  numberOfLikes: number;
};

export type TCourseListItem = TCourse & { numberOfVideos: number; numberOfLikes: number };
