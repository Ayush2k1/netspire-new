"use client";
import { useState, useEffect } from "react";

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth]: any = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return windowWidth;
};

export default useWindowWidth;
