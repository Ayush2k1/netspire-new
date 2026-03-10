"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ReactLenis } from "lenis/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export default function AnimatedCopy() {
  const containerRef = useRef(null);
  const lenisRef = useRef(null);

  // Sync Lenis smooth scroll with GSAP ticker
  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, []);

  // Centralized text animation logic
  useGSAP(
    () => {
      if (!containerRef.current) return;

      const allSplitRefs = [];
      const copyWrappers = containerRef.current.querySelectorAll(
        "[data-copy-wrapper]",
      );

      copyWrappers.forEach((wrapper) => {
        const colorInitial = "#dddddd";
        const colorAccent = "#abff02";
        const colorFinal = "#000000";

        let lastScrollProgress = 0;
        const colorTransitionTimers = new Map();
        const completedChars = new Set();
        const splitRefs = [];

        // Grab the elements (like <p> tags) inside the wrapper
        const elements = Array.from(wrapper.children);

        elements.forEach((element) => {
          // Using your exact SplitText syntax
          const wordSplit = SplitText.create(element as any, {
            type: "words",
            wordsClass: "word",
          });

          const charSplit = SplitText.create(wordSplit.words, {
            type: "chars",
            charsClass: "ac-char", // Scoped class to apply CSS transitions safely
          });

          splitRefs.push({ wordSplit, charSplit });
          allSplitRefs.push({ wordSplit, charSplit });
        });

        const allChars = splitRefs.flatMap(({ charSplit }) => charSplit.chars);

        // Set initial color state
        gsap.set(allChars, { color: colorInitial });

        const scheduleFinalTransition = (char, index) => {
          if (colorTransitionTimers.has(index)) {
            clearTimeout(colorTransitionTimers.get(index));
          }

          const timer = setTimeout(() => {
            if (!completedChars.has(index)) {
              gsap.to(char, {
                duration: 0.1,
                ease: "none",
                color: colorFinal,
                onComplete: () => {
                  completedChars.add(index);
                },
              });
            }
            colorTransitionTimers.delete(index);
          }, 100);

          colorTransitionTimers.set(index, timer);
        };

        ScrollTrigger.create({
          trigger: wrapper,
          start: "top 90%",
          end: "top 10%",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const totalChars = allChars.length;
            const isScrollingDown = progress >= lastScrollProgress;
            const currentCharIndex = Math.floor(progress * totalChars);

            allChars.forEach((char, index) => {
              if (!isScrollingDown && index >= currentCharIndex) {
                if (colorTransitionTimers.has(index)) {
                  clearTimeout(colorTransitionTimers.get(index));
                  colorTransitionTimers.delete(index);
                }
                completedChars.delete(index);
                gsap.set(char, { color: colorInitial });
                return;
              }

              if (completedChars.has(index)) {
                return;
              }

              if (index <= currentCharIndex) {
                gsap.set(char, { color: colorAccent });
                if (!colorTransitionTimers.has(index)) {
                  scheduleFinalTransition(char, index);
                }
              } else {
                gsap.set(char, { color: colorInitial });
              }
            });

            lastScrollProgress = progress;
          },
        });
      });

      // Cleanup logic ensures hot-reloading doesn't duplicate elements
      return () => {
        allSplitRefs.forEach(({ wordSplit, charSplit }) => {
          if (charSplit) charSplit.revert();
          if (wordSplit) wordSplit.revert();
        });
      };
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="ac-main">
      <style dangerouslySetInnerHTML={{ __html: scopedCSS }} />
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />

      <section className="ac-section ac-hero">
        <img className="ac-img" src="/scroll/intro.jpg" alt="" />
      </section>

      <section className="ac-section ac-about">
        <div className="ac-header">
          <h1 className="ac-h1">A new chapter in engineered systems</h1>
        </div>
        {/* data-copy-wrapper tags tell GSAP where to look */}
        <div className="ac-copy" data-copy-wrapper="true">
          <p className="ac-p">
            In an era defined by precision and speed, innovation reshapes the
            foundation of modern industry. Every component is built with intent,
            every system designed to perform at scale. This is more than
            machinery— it is the architecture of progress, setting new
            benchmarks for how we build, move, and connect.
          </p>
        </div>
      </section>

      <section className="ac-section ac-banner-img">
        <img className="ac-img" src="/scroll/img_1.jpg" alt="" />
      </section>

      <section className="ac-services">
        <div className="ac-service">
          <div className="ac-col">
            <div className="ac-service-copy">
              <h3 className="ac-h3">Precision Engineering</h3>
              <div data-copy-wrapper="true">
                <p className="ac-p">
                  Every breakthrough begins with detail. From the first sketch
                  to full-scale production, our engineering process is built on
                  accuracy, consistency, and performance. What you see isn’t
                  just a machine—it’s the sum of thousands of deliberate
                  calculations designed to set new standards in motion.
                </p>
              </div>
            </div>
          </div>
          <div className="ac-col">
            <img className="ac-img" src="/scroll/img_2.jpg" alt="" />
          </div>
        </div>

        <div className="ac-service">
          <div className="ac-col">
            <img className="ac-img" src="/scroll/img_3.jpg" alt="" />
          </div>
          <div className="ac-col">
            <div className="ac-service-copy">
              <h3 className="ac-h3">Performance Optimization</h3>
              <div data-copy-wrapper="true">
                <p className="ac-p">
                  True innovation means doing more with less. Our systems are
                  engineered to deliver maximum output while minimizing waste,
                  resistance, and downtime. Every detail is calibrated for
                  efficiency—turning raw energy into refined, sustainable power
                  that drives industries forward.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="ac-service">
          <div className="ac-col">
            <div className="ac-service-copy">
              <h3 className="ac-h3">Advanced Mobility</h3>
              <div data-copy-wrapper="true">
                <p className="ac-p">
                  The future of movement is seamless. From high-speed transit to
                  autonomous systems, our mobility solutions are designed to
                  connect people, industries, and cities with unprecedented
                  speed and reliability. Every element is engineered for
                  flow—reducing delays, increasing capacity, and reshaping how
                  the world moves.
                </p>
              </div>
            </div>
          </div>
          <div className="ac-col">
            <img className="ac-img" src="/scroll/img_4.jpg" alt="" />
          </div>
        </div>

        <div className="ac-service">
          <div className="ac-col">
            <img className="ac-img" src="/scroll/img_5.jpg" alt="" />
          </div>
          <div className="ac-col">
            <div className="ac-service-copy">
              <h3 className="ac-h3">Next-Gen Infrastructure</h3>
              <div data-copy-wrapper="true">
                <p className="ac-p">
                  Building for tomorrow requires more than incremental change—it
                  demands infrastructure that can endure, adapt, and expand.
                  From aerospace systems to ground-level operations, our
                  solutions are designed to withstand extreme environments while
                  maintaining absolute precision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Strictly scoped CSS injected inline. No global tags.
const scopedCSS = `
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap");

.ac-main {
  font-family: "Manrope", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  user-select: none;
}

.ac-main * {
  box-sizing: border-box;
}

.ac-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ac-h1 {
  font-size: 4rem;
  font-weight: 550;
  letter-spacing: -0.1rem;
  line-height: 1.1;
}

.ac-h3 {
  font-size: 2.25rem;
  font-weight: 550;
  letter-spacing: -0.05rem;
  line-height: 1.25;
  margin-bottom: 1rem;
}

.ac-p {
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.5;
}

.ac-section {
  position: relative;
  width: 100%;
  height: 100svh;
  padding: 1rem;
}

.ac-hero img,
.ac-banner-img img {
  border-radius: 1rem;
}

.ac-about,
.ac-outro {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

.ac-about .ac-h1 {
  width: 65%;
  margin: 0 auto 1.5rem auto;
}

.ac-about .ac-p {
  width: 35%;
  margin: 0 auto;
}

.ac-services {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.ac-service {
  width: 100%;
  height: 100svh;
  padding: 1rem;
  display: flex;
  gap: 2rem;
}

.ac-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  overflow: hidden;
}

.ac-service-copy {
  width: 75%;
}

.ac-char {
  transition: color 150ms ease-out;
}

@media (max-width: 1000px) {
  .ac-about .ac-h1,
  .ac-about .ac-p {
    width: 100%;
  }

  .ac-about {
    padding: 2rem;
  }

  .ac-services {
    gap: 2rem;
  }

  .ac-service {
    height: max-content;
    flex-direction: column;
    gap: 4rem;
    padding: 0;
  }

  .ac-service:nth-child(2),
  .ac-service:nth-child(4) {
    flex-direction: column-reverse;
  }

  .ac-service-copy {
    width: 100%;
    padding: 1rem;
  }
}
`;
