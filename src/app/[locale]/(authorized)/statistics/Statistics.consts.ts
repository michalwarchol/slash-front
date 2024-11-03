import { TEducatorStats, TStudentStats } from "@/types/statistics";
import { EUserTypes } from "@/types/user";

export const defaultEducatorData: TEducatorStats = {
  mostLikedCourses: [],
  mostPopularCourses: [],
  mostViewedVideos: [],
};

export const defaultStudentStats: TStudentStats = {
  coursesEnded: 0,
  coursesInProgress: 0,
  watchTime: 0,
  favCategory: {
    id: "",
    mainTypeId: "",
    name: "",
    valueEn: "",
    valuePl: "",
  },
  favEducator: {
    avatar: "",
    email: "",
    firstName: "",
    id: "",
    lastName: "",
    type: EUserTypes.EDUCATOR,
    isVerified: true,
  },
};
