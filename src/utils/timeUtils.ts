export const secondsToTime = (seconds: number): string => {
  // Calculate the number of hours, minutes, and remaining seconds
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  // Format minutes and seconds to always be two digits
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  // Construct the time string, excluding hours if it is 0
  let timeString = `${formattedMinutes}:${formattedSeconds}`;
  if (hours > 0) {
    timeString = `${hours}:${timeString}`;
  }

  return timeString;
};
