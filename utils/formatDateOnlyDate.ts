export default function formatDateOnlyDate(dateTimeString: Date | string) {
  const date = new Date(dateTimeString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
