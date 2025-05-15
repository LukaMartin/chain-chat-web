import dayjs from "dayjs";

export default function convertTimestamp(timestamp: number) {
  const now = dayjs();
  const sentTime = dayjs(timestamp * 1000);
  const diffInHours = sentTime.diff(now, "hours");
  const diffInDays = sentTime.diff(now, "days");
  const diffInMinutes = sentTime.diff(now, "minutes");

  if (diffInDays < 0)
    return `${Math.abs(diffInDays)} ${diffInDays === -1 ? "day" : "days"} ago`;
  if (diffInHours < 0)
    return `${Math.abs(diffInHours)} ${
      diffInHours === -1 ? "hour" : "hours"
    } ago`;
  if (diffInMinutes < 0)
    return `${Math.abs(diffInMinutes)} ${
      diffInMinutes === -1 ? "minute" : "minutes"
    } ago`;
  return "< 1 minute ago";
}
