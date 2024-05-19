export type TCommentsSettings = {
  orderBy: string;
  order: 'ASC' | 'DESC';
}

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