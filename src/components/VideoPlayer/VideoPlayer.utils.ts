export const getProgressSliderBackgroundColor = (
  color: string,
  progress: string
) => {
  return `linear-gradient(to right, ${color} 0%, ${color} ${progress}%, rgba(255, 255, 255, 0.4) ${progress}%, rgba(255, 255, 255, 0.4) 100%)`;
};
