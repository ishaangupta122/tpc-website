import { useState, useEffect } from "react";

const Typewriter = ({ text, speed = 100, delay = 1000 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;

    if (isDeleting) {
      // Remove text letter by letter
      if (index > 0) {
        timer = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, prev.length - 1));
          setIndex(index - 1);
        }, speed);
      } else {
        // After finishing deleting, wait for a delay before typing again
        timer = setTimeout(() => {
          setIsDeleting(false);
        }, delay);
      }
    } else {
      // Add text letter by letter
      if (index < text.length) {
        timer = setTimeout(() => {
          setDisplayedText((prev) => prev + text[index]);
          setIndex(index + 1);
        }, speed);
      } else {
        // After fully typing, start deleting the text
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, delay);
      }
    }

    return () => clearTimeout(timer);
  }, [index, text, speed, isDeleting, delay]);

  return (
    <span>
      {displayedText}
      <span className="font-light">|</span>
    </span>
  );
};

export default Typewriter;
