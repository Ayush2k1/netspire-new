"use client";

import { useRef } from "react";

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
  const wrapperRefs = useRef([]);
  const activeAwardRef = useRef(null);
  const positionsRef = useRef(awards.map(() => POSITIONS.TOP));

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

  const handleMouseEnter = (e, index) => {
    const award = e.currentTarget;
    activeAwardRef.current = award;
    const rect = award.getBoundingClientRect();
    const enterFromTop = e.clientY < rect.top + rect.height / 2;

    if (enterFromTop || positionsRef.current[index] === POSITIONS.BOTTOM) {
      positionsRef.current[index] = POSITIONS.MIDDLE;
      tween(wrapperRefs.current[index], POSITIONS.MIDDLE);
    }
  };

  const handleMouseLeave = (e, index) => {
    activeAwardRef.current = null;
    const rect = e.currentTarget.getBoundingClientRect();
    const fromTop = e.clientY < rect.top + rect.height / 2;
    const pos = fromTop ? POSITIONS.TOP : POSITIONS.BOTTOM;
    positionsRef.current[index] = pos;
    tween(wrapperRefs.current[index], pos);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        .font-bebas { font-family: 'Bebas Neue', sans-serif; }
        .font-mono-dm { font-family: 'DM Mono', monospace; }
      `}</style>

      <div className="font-mono-dm bg-[#e3e3db] section-padding pt-0 px-0">
        <section className="relative flex justify-center items-center">
          <div className="relative w-full" ref={awardsListRef}>
            {/* Label constrained to container */}
            <div className="max-w-container mx-auto">
              <p className="uppercase text-xs font-medium tracking-[0.15em] px-5 py-2 text-[#666]">
                Recognition and awards
              </p>
            </div>

            {/* Full-width top border */}
            <div className="border-t border-black">
              {awards.map((award, i) => (
                <div
                  key={i}
                  className="h-20 overflow-hidden"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                  }}
                  data-index={i}
                  onMouseEnter={(e) => handleMouseEnter(e, i)}
                  onMouseLeave={(e) => handleMouseLeave(e, i)}
                >
                  <div
                    className="relative will-change-transform"
                    style={{ height: 240, transform: "translateY(-160px)" }}
                    ref={(el) => (wrapperRefs.current[i] = el) as any}
                  >
                    {/* Top — light */}
                    <div className="w-full h-20 border-b border-black bg-[#e3e3db] text-black">
                      <div className="max-w-container mx-auto px-5 h-full flex justify-between items-center">
                        <h2 className="font-bebas text-[clamp(22px,3.5vw,44px)] font-normal uppercase tracking-wide leading-none">
                          {award.name}
                        </h2>
                        <span className="font-mono-dm text-[0.7rem] tracking-[0.1em] uppercase opacity-60">
                          {award.type}
                        </span>
                      </div>
                    </div>

                    {/* Middle — dark, full bleed */}
                    <div className="w-full h-20 border-b border-black bg-black text-[#e3e3db]">
                      <div className="max-w-container mx-auto px-5 h-full flex justify-between items-center">
                        <h2 className="font-bebas text-[clamp(22px,3.5vw,44px)] font-normal uppercase tracking-wide leading-none">
                          {award.project}
                        </h2>
                        <span className="font-mono-dm text-[0.7rem] tracking-[0.1em] uppercase opacity-60">
                          {award.label}
                        </span>
                      </div>
                    </div>

                    {/* Bottom — light repeat */}
                    <div className="w-full h-20 border-b border-black bg-[#e3e3db] text-black">
                      <div className="max-w-container mx-auto px-5 h-full flex justify-between items-center">
                        <h2 className="font-bebas text-[clamp(22px,3.5vw,44px)] font-normal uppercase tracking-wide leading-none">
                          {award.name}
                        </h2>
                        <span className="font-mono-dm text-[0.7rem] tracking-[0.1em] uppercase opacity-60">
                          {award.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
