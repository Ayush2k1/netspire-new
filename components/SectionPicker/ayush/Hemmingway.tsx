"use client";

import { useEffect, useRef } from "react";

const awards = [
  {
    name: "Independent of the year",
    type: "Nominee",
    project: "INNOVATE 2024",
    label: "Awwwards",
  },
  {
    name: "Site of the day",
    type: "Awwwards",
    project: "LVXH - AMOT",
    label: "See Live",
  },
  {
    name: "Site of the day",
    type: "Awwwards",
    project: "Open Field Audio",
    label: "See Live",
  },
  {
    name: "Site of the day",
    type: "Awwwards",
    project: "ArtisanCraft",
    label: "See Live",
  },
  {
    name: "Site of the day",
    type: "Awwwards",
    project: "Disguised Edge",
    label: "See Live",
  },
  {
    name: "Site of the day",
    type: "Awwwards",
    project: "Silvia Santiago",
    label: "See Live",
  },
];

const POSITIONS = { BOTTOM: 0, MIDDLE: -80, TOP: -160 };

export default function Hemingway() {
  const awardsListRef = useRef(null);
  const previewRef = useRef(null);
  const wrapperRefs = useRef([]);
  const activeAwardRef = useRef(null);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const mouseTimeoutRef = useRef(null);
  const animFrameRef = useRef(null);
  const positionsRef = useRef(awards.map(() => POSITIONS.TOP));

  // Tiny GSAP-like tween using Web Animations API
  const tween = (el, toY, duration = 400) => {
    if (!el) return;
    const current = new DOMMatrix(getComputedStyle(el).transform).m42;
    el.animate(
      [
        { transform: `translateY(${current}px)` },
        { transform: `translateY(${toY}px)` },
      ],
      { duration, easing: "cubic-bezier(0.33,1,0.68,1)", fill: "forwards" },
    );
    el.style.transform = `translateY(${toY}px)`;
  };

  const scaleEl = (el, to, duration = 400, onComplete) => {
    if (!el) return;
    const anim = el.animate(
      [
        { transform: `scale(${parseFloat(el.style.scale) || 1})` },
        { transform: `scale(${to})` },
      ],
      { duration, easing: "cubic-bezier(0.33,1,0.68,1)", fill: "forwards" },
    );
    el.style.scale = String(to);
    if (onComplete) anim.onfinish = onComplete;
  };

  useEffect(() => {
    const awardsList = awardsListRef.current;
    const preview = previewRef.current;
    const wrappers = wrapperRefs.current;

    const animatePreview = () => {
      const { x, y } = lastMousePos.current;
      const rect = awardsList.getBoundingClientRect();
      const outside =
        x < rect.left || x > rect.right || y < rect.top || y > rect.bottom;
      if (outside) {
        preview.querySelectorAll("img").forEach((img) => {
          scaleEl(img, 0, 400, () => img.remove());
        });
      }
    };

    const handleMouseMove = (e) => {
      lastMousePos.current = { x: e.clientX, y: e.clientY };

      if (mouseTimeoutRef.current) clearTimeout(mouseTimeoutRef.current);

      const rect = awardsList.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (inside) {
        mouseTimeoutRef.current = setTimeout(() => {
          const imgs = preview.querySelectorAll("img");
          if (imgs.length > 1) {
            const last = imgs[imgs.length - 1];
            imgs.forEach((img) => {
              if (img !== last) scaleEl(img, 0, 400, () => img.remove());
            });
          }
        }, 2000);
      }

      animatePreview();
    };

    const handleScroll = () => {
      if (animFrameRef.current) return;
      animFrameRef.current = requestAnimationFrame(() => {
        animFrameRef.current = null;
        const { x, y } = lastMousePos.current;

        if (activeAwardRef.current) {
          const idx = parseInt(activeAwardRef.current.dataset.index);
          const rect = activeAwardRef.current.getBoundingClientRect();
          const still =
            x >= rect.left &&
            x <= rect.right &&
            y >= rect.top &&
            y <= rect.bottom;
          if (!still) {
            const fromTop = y < rect.top + rect.height / 2;
            const pos = fromTop ? POSITIONS.TOP : POSITIONS.BOTTOM;
            positionsRef.current[idx] = pos;
            tween(wrappers[idx], pos);
            activeAwardRef.current = null;
          }
        }
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("scroll", handleScroll);
      if (mouseTimeoutRef.current) clearTimeout(mouseTimeoutRef.current);
    };
  }, []);

  const handleMouseEnter = (e, index) => {
    const award = e.currentTarget;
    activeAwardRef.current = award;
    const rect = award.getBoundingClientRect();
    const enterFromTop = e.clientY < rect.top + rect.height / 2;

    if (enterFromTop || positionsRef.current[index] === POSITIONS.BOTTOM) {
      positionsRef.current[index] = POSITIONS.MIDDLE;
      tween(wrapperRefs.current[index], POSITIONS.MIDDLE);
    }

    const preview = previewRef.current;
    const img = document.createElement("img");
    img.src = `/hemmingway/img${index + 1}.jpg`;
    img.style.cssText =
      "position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;scale:0;will-change:transform;";
    img.style.zIndex = String(Date.now());
    preview.appendChild(img);
    scaleEl(img, 1, 400, 1);
  };

  const handleMouseLeave = (e, index) => {
    activeAwardRef.current = null;
    const award = e.currentTarget;
    const rect = award.getBoundingClientRect();
    const fromTop = e.clientY < rect.top + rect.height / 2;
    const pos = fromTop ? POSITIONS.TOP : POSITIONS.BOTTOM;
    positionsRef.current[index] = pos;
    tween(wrapperRefs.current[index], pos);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');

        .hw-root * { margin: 0; padding: 0; box-sizing: border-box; }

        .hw-root {
          background-color: #e3e3db;
          font-family: 'DM Mono', monospace;
        }

        .hw-section {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hw-section h1 {
          text-transform: uppercase;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(48px, 8vw, 96px);
          font-weight: 400;
          letter-spacing: 2px;
          color: #000;
        }

        .hw-awards {
          position: relative;
          width: 100vw;
          min-height: 100vh;
          height: max-content;
        }

        .hw-awards-label {
          text-transform: uppercase;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          padding: 8px 20px;
          color: #666;
        }

        .hw-awards-list {
          border-top: 1px solid #000;
        }

        .hw-award {
          height: 80px;
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
          overflow: hidden;
        }

        .hw-award-wrapper {
          position: relative;
          height: 240px;
          will-change: transform;
          transform: translateY(-160px);
        }

        .hw-award-name,
        .hw-award-project {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 80px;
          padding: 0 20px;
          cursor: pointer;
          border-bottom: 1px solid #000;
        }

        .hw-award-name {
          background-color: #e3e3db;
          color: #000;
        }

        .hw-award-project {
          background-color: #000;
          color: #e3e3db;
        }

        .hw-award-name h2,
        .hw-award-project h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(22px, 3.5vw, 44px);
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 1px;
          line-height: 1;
        }

        .hw-award-name span,
        .hw-award-project span {
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          opacity: 0.6;
        }

        .hw-preview {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: clamp(180px, 25vw, 360px);
          aspect-ratio: 4/3;
          z-index: 100;
          pointer-events: none;
          overflow: hidden;
          visibility: hidden;
        }

        .hw-preview:has(img) {
          visibility: visible;
        }
      `}</style>

      <div className="hw-root ">
        <section className="hw-awards">
          <p className="hw-awards-label">Recognition and awards</p>
          <div className="hw-awards-list" ref={awardsListRef}>
            {awards.map((award, i) => (
              <div
                key={i}
                className="hw-award"
                data-index={i}
                onMouseEnter={(e) => handleMouseEnter(e, i)}
                onMouseLeave={(e) => handleMouseLeave(e, i)}
              >
                <div
                  className="hw-award-wrapper"
                  ref={(el) => (wrapperRefs.current[i] = el) as any}
                >
                  <div className="hw-award-name">
                    <h2>{award.name}</h2>
                    <span>{award.type}</span>
                  </div>
                  <div className="hw-award-project">
                    <h2>{award.project}</h2>
                    <span>{award.label}</span>
                  </div>
                  <div className="hw-award-name">
                    <h2>{award.name}</h2>
                    <span>{award.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="hw-preview" ref={previewRef} />
      </div>
    </>
  );
}
