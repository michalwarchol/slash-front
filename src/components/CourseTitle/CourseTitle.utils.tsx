export const getLikeCount = (
  likes: number,
  isLikedRemote: boolean,
  isLikedLocally: boolean
): number => {
  if (isLikedRemote) {
    if (isLikedLocally) {
      return likes;
    }

    return likes - 1;
  }

  if (isLikedLocally) {
    return likes + 1;
  }

  return likes;
};
