"use client";

import { useEffect, useRef } from "react";

const CARDS = [
  {
    id: "card-1",
    subtitle: "Quiet Control",
    title: "Signal Drift",
    img: "/card-img-1.jpg",
    bg: "#3d2fa9",
  },
  {
    id: "card-2",
    subtitle: "Fluid Structures",
    title: "Skyline Drift",
    img: "/card-img-2.jpg",
    bg: "#ff7722",
  },
  {
    id: "card-3",
    subtitle: "Wired Thought",
    title: "Neural Assembly",
    img: "/card-img-3.jpg",
    bg: "#ff3d33",
  },
  {
    id: "card-4",
    subtitle: "Silent Repetition",
    title: "Learning Loop",
    img: "/card-img-4.jpg",
    bg: "#785f47",
  },
];

export default function StickyCards() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    let ctx;
    let lenis;
    let rafId;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const Lenis = (await import("lenis")).default;

      gsap.registerPlugin(ScrollTrigger);

      ScrollTrigger.defaults({ scroller: window });

      lenis = new Lenis({
        autoRaf: false,
      });

      lenis.on("scroll", () => ScrollTrigger.update());

      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      await new Promise((r) => setTimeout(r, 50));

      const cards = cardRefs.current.filter(Boolean);
      const totalCards = cards.length;

      // Safety check: if there's only 1 card, no need to stack
      if (totalCards < 2) return;

      // CHANGE 1: We only need to transition (total - 1) times
      const segmentSize = 1 / (totalCards - 1);
      const cardYOffset = 5;
      const cardScaleStep = 0.075;

      ctx = gsap.context(() => {
        cards.forEach((card, i) => {
          gsap.set(card, {
            xPercent: -50,
            yPercent: -50 + i * cardYOffset,
            scale: 1 - i * cardScaleStep,
          });
        });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          // CHANGE 2: Reduce scroll duration by one window height
          end: `+=${window.innerHeight * (totalCards - 1)}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;

            // CHANGE 3: Clamp the active index so the last card never flies away
            const activeIndex = Math.min(
              Math.floor(progress / segmentSize),
              totalCards - 2,
            );

            const segProgress =
              (progress - activeIndex * segmentSize) / segmentSize;

            cards.forEach((card, i) => {
              if (i < activeIndex) {
                gsap.set(card, { yPercent: -250, rotationX: 35 });
              } else if (i === activeIndex) {
                gsap.set(card, {
                  yPercent: gsap.utils.interpolate(-50, -200, segProgress),
                  rotationX: gsap.utils.interpolate(0, 35, segProgress),
                  scale: 1,
                });
              } else {
                const behindIndex = i - activeIndex;
                gsap.set(card, {
                  yPercent: -50 + (behindIndex - segProgress) * cardYOffset,
                  rotationX: 0,
                  scale: 1 - (behindIndex - segProgress) * cardScaleStep,
                });
              }
            });
          },
        });

        ScrollTrigger.refresh();
      });
    };

    init();

    return () => {
      cancelAnimationFrame(rafId);
      ctx?.revert();
      lenis?.destroy();
    };
  }, []);

  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@800&family=DM+Mono:wght@400&display=swap");

        .sc-intro,
        .sc-outro {
          position: relative;
          width: 100%;
          height: 100svh;
          display: flex;
          justify-content: center;
          align-items: center;

        }

        .sc-intro h1,
        .sc-outro h1 {
          text-transform: uppercase;
          font-family: "Barlow Condensed", sans-serif;
          font-size: 3rem;
          font-weight: 800;
          line-height: 1;
        }

        .sc-sticky-cards {
          position: relative;
          width: 100%;
          height: 100svh;
          background-color: #e3e3db;
          perspective: 1000px;
          /* overflow must NOT be hidden — GSAP pin injects a spacer div outside this element */
        }

        .sc-card {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 80%;
          height: 70%;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          padding: 2.5rem;
          border-radius: 1rem;
          color: #fff;
          transform-origin: center bottom;
          will-change: transform;
        }

        .sc-card .sc-col {
          flex: 1;
          height: 100%;
        }

        .sc-card .sc-col:nth-child(1) {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0.5rem;
        }

        .sc-card .sc-col:nth-child(1) p {
          text-transform: uppercase;
          font-family: "DM Mono", monospace;
          font-size: 0.9rem;
          margin: 0;
        }

        .sc-card .sc-col:nth-child(1) h1 {
          text-transform: uppercase;
          font-family: "Barlow Condensed", sans-serif;
          font-size: 3rem;
          font-weight: 800;
          line-height: 1;
          margin: 0;
        }

        .sc-card .sc-col:nth-child(2) {
          border-radius: 0.75rem;
          overflow: hidden;
        }

        .sc-card .sc-col:nth-child(2) img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        @media (max-width: 1000px) {
          .sc-card {
            width: calc(100% - 4rem);
            height: 75%;
            flex-direction: column;
          }
          .sc-card .sc-col {
            width: 100%;
          }
        }
      `}</style>

      <section ref={sectionRef} className="sc-sticky-cards">
        {CARDS.map((card, i) => (
          <div
            key={card.id}
            ref={(el) => (cardRefs.current[i] = el) as any}
            className="sc-card"
            style={{
              backgroundColor: card.bg,
              zIndex: CARDS.length - i,
            }}
          >
            <div className="sc-col">
              <p>{card.subtitle}</p>
              <h1>{card.title}</h1>
            </div>
            <div className="sc-col">
              <img src={card.img} alt={card.title} />
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
