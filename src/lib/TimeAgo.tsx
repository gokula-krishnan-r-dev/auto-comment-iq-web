export function timeAgo(dateString: string): string {
  const currentDate = new Date();
  const previousDate = new Date(dateString);
  const timeDifference = currentDate.getTime() - previousDate.getTime();

  // Calculate seconds, minutes, hours, days, months, and years
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (seconds < 60) {
    return `${seconds} sec${seconds !== 1 ? "s" : ""} `;
  } else if (minutes < 60) {
    return `${minutes} min${minutes !== 1 ? "s" : ""} `;
  } else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} `;
  } else if (days < 30) {
    return `${days} day${days !== 1 ? "s" : ""} `;
  } else if (months < 12) {
    return `${months} month${months !== 1 ? "s" : ""} `;
  } else {
    return `${years} year${years !== 1 ? "s" : ""} `;
  }
}
