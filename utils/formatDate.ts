export function formatDate(dateString: string) {
  // Create a date object from the input string
  const date = new Date(dateString);

  // Format the date using the specified options and the system's locale
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
