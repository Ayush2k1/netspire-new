"use client";
// hooks/useScrollPosition.js
import { useState, useEffect } from "react";

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);

  useEffect(() => {
    // Set the initial page height
    setScrollHeight(document.documentElement.scrollHeight);

    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };

    // Attach the event listener for window scroll
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { scrollPosition, scrollHeight };
};

export default useScrollPosition;
