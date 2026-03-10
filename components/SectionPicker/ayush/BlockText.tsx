"use client";

import React, { useRef, useEffect } from "react";
import { ReactLenis } from "lenis/react";

// ─── Styles ─────────────────────────────────────────────────────────────────

const styles = `
  @import url("https://fonts.googleapis.com/css2?family=Cossette+Titre:wght@400;700&display=swap");

  .sh-page {
    --sh-tone-100: #000000;
    --sh-tone-200: #222222;
    --sh-tone-300: #5b5c57;
    --sh-tone-400: #e3e4d8;
    --sh-tone-500: #fe0100;
    font-family: "Cossette Titre", sans-serif;
    background-color: var(--sh-tone-400);
  }

  .sh-page *, .sh-page *::before, .sh-page *::after {
    box-sizing: border-box;
  }

  .sh-page img { width: 100%; height: 100%; object-fit: cover; }

  .sh-page h1,
  .sh-page p {
    margin: 0;
    text-transform: uppercase;
    font-weight: 500;
    line-height: 1;
  }

  .sh-page h1 { font-size: 6rem; letter-spacing: -0.1rem; }
  .sh-page p  { font-size: 3rem; letter-spacing: -0.025rem; }

  .sh-nav {
    position: fixed;
    width: 100%;
    padding: 2rem;
    display: flex;
    justify-content: space-between;
    mix-blend-mode: difference;
    z-index: 2;
  }

  .sh-nav p { font-size: 1.5rem; color: var(--sh-tone-400); }

  .sh-section {
    position: relative;
    width: 100%;
    height: 100svh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .sh-section-bg {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
  }

  .sh-section h1 { width: 75%; }
  .sh-section p  { width: 60%; }

  .sh-intro h1, .sh-services h1, .sh-outro h1 { color: var(--sh-tone-500); }

  .sh-section h1 .block-line-wrapper,
  .sh-section p  .block-line-wrapper { margin: 0 auto; }

  .block-line-wrapper {
    position: relative;
    width: max-content;
    display: block;
    overflow: hidden;
  }

  .block-line {
    position: relative;
    display: block;
    opacity: 0;
    transition: opacity 0s;
  }

  .block-line.visible { opacity: 1; }

  .block-revealer {
    position: absolute;
    top: 0; left: 0;
    width: 101%; height: 101%;
    pointer-events: none;
    will-change: transform;
    z-index: 1;
    transform: scaleX(0);
    transform-origin: left center;
  }

  @keyframes sh-blockIn {
    0%      { transform: scaleX(0); transform-origin: left center; }
    50%     { transform: scaleX(1); transform-origin: left center; }
    50.001% { transform-origin: right center; }
    100%    { transform: scaleX(0); transform-origin: right center; }
  }

  .block-revealer.animate {
    animation: sh-blockIn var(--block-duration, 0.75s) var(--block-delay, 0s) cubic-bezier(0.77, 0, 0.175, 1) both;
  }

  @media (max-width: 1000px) {
    .sh-page h1 { font-size: 3rem; }
    .sh-page p  { font-size: 1.5rem; }
    .sh-section { padding: 2rem; }
    .sh-section h1, .sh-section p { width: 100%; }
  }
`;

// ─── Copy Component ──────────────────────────────────────────────────────────

function Copy({
  children,
  animateOnScroll = true,
  delay = 0,
  blockColor = "#000",
  stagger = 0.15,
  duration = 0.75,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Split text into lines by measuring word positions
    const splitIntoLines = (el) => {
      const text = el.innerText;
      const words = text.split(/\s+/).filter(Boolean);

      el.innerHTML = words
        .map((w) => `<span class="word">${w} </span>`)
        .join("");
      const wordEls = [...el.querySelectorAll(".word")];

      const lines = [];
      let currentLine = [];
      let lastTop = null;

      wordEls.forEach((word) => {
        const top = word.getBoundingClientRect().top;
        if (lastTop === null || Math.abs(top - lastTop) < 2) {
          currentLine.push(word);
        } else {
          lines.push(currentLine);
          currentLine = [word];
        }
        lastTop = top;
      });
      if (currentLine.length) lines.push(currentLine);

      return lines;
    };

    const buildDOM = (el) => {
      const lines = splitIntoLines(el);
      el.innerHTML = "";

      const lineEls = [];
      const blockerEls = [];

      lines.forEach((words) => {
        const lineText = words
          .map((w) => w.textContent)
          .join("")
          .trimEnd();

        const wrapper = document.createElement("div");
        wrapper.className = "block-line-wrapper";

        const line = document.createElement("span");
        line.className = "block-line";
        line.textContent = lineText;

        const block = document.createElement("div");
        block.className = "block-revealer";
        block.style.backgroundColor = blockColor;

        wrapper.appendChild(line);
        wrapper.appendChild(block);
        el.appendChild(wrapper);

        lineEls.push(line);
        blockerEls.push(block);
      });

      return { lineEls, blockerEls };
    };

    const elements = container.hasAttribute("data-copy-wrapper")
      ? [...container.children]
      : [container];

    const allLines = [];
    const allBlocks = [];

    elements.forEach((el) => {
      const { lineEls, blockerEls } = buildDOM(el);
      allLines.push(...lineEls);
      allBlocks.push(...blockerEls);
    });

    const timeouts = [];

    const runAnimation = () => {
      // Reset state first
      allBlocks.forEach((block, i) => {
        block.classList.remove("animate");
        allLines[i].classList.remove("visible");
      });

      // Force reflow so removing the class takes effect before re-adding
      void container.offsetWidth;

      allBlocks.forEach((block, i) => {
        const lineDelay = delay + i * stagger;
        block.style.setProperty("--block-delay", `${lineDelay}s`);
        block.style.setProperty("--block-duration", `${duration}s`);
        block.classList.add("animate");

        const t = setTimeout(
          () => {
            allLines[i].classList.add("visible");
          },
          (lineDelay + duration / 2) * 1000,
        );
        timeouts.push(t);
      });
    };

    const resetAnimation = () => {
      timeouts.forEach(clearTimeout);
      timeouts.length = 0;
      allBlocks.forEach((block, i) => {
        block.classList.remove("animate");
        allLines[i].classList.remove("visible");
      });
    };

    if (animateOnScroll) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              runAnimation();
            } else {
              resetAnimation();
            }
          });
        },
        { threshold: 0.1 },
      );
      observer.observe(container);
      return () => {
        observer.disconnect();
        timeouts.forEach(clearTimeout);
      };
    } else {
      runAnimation();
    }
  }, [animateOnScroll, delay, blockColor, stagger, duration]);

  if (React.Children.count(children) === 1) {
    return React.cloneElement(children, { ref: containerRef });
  }

  return (
    <div ref={containerRef} data-copy-wrapper="true">
      {children}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="sh-page">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <nav className="sh-nav">
        <p>Static House</p>
        <p>Menu</p>
      </nav>

      <section className="sh-section sh-intro">
        <div className="sh-section-bg">
          <img src="/blocktext/img_1.jpg" alt="" />
        </div>
        <Copy blockColor="#fe0100">
          <h1>
            Framed in tungsten and shadows, every shot holds its own deliberate
            tension.
          </h1>
        </Copy>
      </section>

      <section className="sh-section sh-about">
        <Copy>
          <p>
            This is cinematography in its raw form with practical lamps, soft
            falloff, and the presence of grain that fills each corner of the
            frame. Every room functions as a set and every posture becomes a
            composition. Light moves across furniture and faces, shaping scenes
            with a natural sense of depth.
          </p>
        </Copy>
      </section>
    </div>
  );
}
