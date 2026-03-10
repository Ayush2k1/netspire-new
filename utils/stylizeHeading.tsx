export function StylizeHeading(heading: string) {
  // Check if data or data.heading is undefined or not a string
  if (!heading || typeof heading !== "string") {
    return <span>Enter A Heading</span>; // Return a default or error message
  }

  const words = heading.split(" ");
  const totalWords = words.length;

  return (
    <>
      {words.map((word, index) => {
        // Apply special styling to the last two words
        if (index === totalWords - 2 || index === totalWords - 1) {
          return (
            <span
              style={{ fontFamily: "var(--font-playfair)" }}
              className="italic inline font-normal"
            >
              {word + " "}
            </span>
          );
        } else {
          return word + " ";
        }
      })}
    </>
  );
}
