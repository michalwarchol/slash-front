export type TParams = Promise<{
  locale: string;
  id: string;
  videoId: string;
}>;

export type TCommentsSettings = {
  orderBy: string;
  order: "ASC" | "DESC";
};

export type TAddCommentInput = {
  videoId: string;
  text: string;
};

export type TAddCommentValues = {
  text: string;
};

export type TIncreaseViewsInput = {
  id: string;
};

export type TAddEditRatingInput = {
  videoId: string;
  rating: number;
  id?: string;
};

export type TAddEditProgressInput = {
  id?: string;
  videoId: string;
  watchTime: number;
  hasEnded: boolean;
};

export type TProgress = {
  id: string;
  watchTime: number;
  hasEnded: boolean;
  createdAt: Date;
};
