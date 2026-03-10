"use client";

import { useEffect } from "react";

function useScrollBehavior(isOpen: boolean) {
  useEffect(() => {
    // Check if window object is available to ensure we're in a browser environment
    if (typeof window !== "undefined") {
      if (isOpen) {
        document.documentElement.style.scrollBehavior = "auto";
      } else {
        setTimeout(() => {
          document.documentElement.style.scrollBehavior = "smooth";
        }, 1000);
      }
    }
  }, [isOpen]);
}

export default useScrollBehavior;
