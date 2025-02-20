export const formatDateTime = (isoString: string) => {
  const dateObj = new Date(isoString);

  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const seconds = dateObj.getSeconds();

  const ampm = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const time = `${hour12}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
  const date = dateObj.toISOString().slice(0, 10);

  return `${date} ${time}`;
};
