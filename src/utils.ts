export const formatDateToDay = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", { weekday: "long" });
};
