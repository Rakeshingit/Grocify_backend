export function indianTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  // return formattedTime;
}
