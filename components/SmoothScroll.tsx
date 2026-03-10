"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // Connect Lenis to GSAP ScrollTrigger once, globally
    let gsap: any;
    let ScrollTrigger: any;

    (async () => {
      gsap = (await import("gsap")).default;
      ScrollTrigger = (await import("gsap/ScrollTrigger")).ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      // Tell Lenis to update ScrollTrigger on every scroll event
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.on("scroll", () => ScrollTrigger.update());
        // Sync GSAP ticker with Lenis RAF
        gsap.ticker.add((time: number) => {
          lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      }
    })();
  }, []);

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false }}>
      {children}
    </ReactLenis>
  );
}
