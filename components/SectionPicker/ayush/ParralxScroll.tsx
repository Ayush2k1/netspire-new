"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const sliderData = [
  {
    title: "Echoes of Silence",
    img: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80",
    url: "/parallax/sample-project",
  },
  {
    title: "Floral Circuit",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
    url: "/parallax/sample-project",
  },
  {
    title: "Synthetic Horizon",
    img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
    url: "/sample-project",
  },
  {
    title: "Portal Sequence",
    img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    url: "/parallax/sample-project",
  },
  {
    title: "Projected Memory",
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
    url: "/parallax/sample-project",
  },
  {
    title: "Fractured Self",
    img: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&q=80",
    url: "/parallax/sample-project",
  },
  {
    title: "Moonlit Constructs",
    img: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80",
    url: "/parallax/sample-project",
  },
  {
    title: "Fading Room",
    img: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&q=80",
    url: "/parallax/sample-project",
  },
];

const CONFIG = {
  SCROLL_SPEED: 1.85,
  LERP_FACTOR: 0.025,
  MAX_VELOCITY: 150,
};

export default function ParallaxScroll() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const slidesRef = useRef([]);

  const stateRef = useRef({
    currentX: 0,
    targetX: 0,
    slideWidth: 390,
    isDragging: false,
    startX: 0,
    lastX: 0,
    lastMouseX: 0,
    lastScrollTime: Date.now(),
    isMoving: false,
    velocity: 0,
    lastCurrentX: 0,
    dragDistance: 0,
    hasActuallyDragged: false,
    isMobile: false,
    // Track scroll state
    isScrollLocked: true,
    totalScrollDistance: 0,
    fullCycleDistance: 0,
  });

  const rafRef = useRef(null);
  const [isMoving, setIsMoving] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [slides, setSlides] = useState([]);

  const totalSlideCount = sliderData.length;

  // Build slide data array (duplicated for infinite loop)
  const buildSlides = useCallback(() => {
    const mobile = window.innerWidth < 1000;
    const slideWidth = mobile ? 215 : 390;

    stateRef.current.isMobile = mobile;
    stateRef.current.slideWidth = slideWidth;
    stateRef.current.fullCycleDistance = slideWidth * totalSlideCount;
    stateRef.current.isScrollLocked = true;
    stateRef.current.totalScrollDistance = 0;
    setIsMobile(mobile);

    const copies = 6;
    const totalSlides = totalSlideCount * copies;
    const slideArray = [];
    for (let i = 0; i < totalSlides; i++) {
      slideArray.push({
        ...sliderData[i % totalSlideCount],
        key: i,
      });
    }
    setSlides(slideArray);

    const startOffset = -(totalSlideCount * slideWidth * 2);
    stateRef.current.currentX = startOffset;
    stateRef.current.targetX = startOffset;
  }, [totalSlideCount]);

  // Animation loop
  const animate = useCallback(() => {
    const s = stateRef.current;
    s.currentX += (s.targetX - s.currentX) * CONFIG.LERP_FACTOR;

    // Velocity / moving state
    s.velocity = Math.abs(s.currentX - s.lastCurrentX);
    s.lastCurrentX = s.currentX;
    const isSlowEnough = s.velocity < 0.1;
    const hasBeenStillLongEnough = Date.now() - s.lastScrollTime > 200;
    const moving =
      s.hasActuallyDragged || !isSlowEnough || !hasBeenStillLongEnough;
    if (moving !== s.isMoving) {
      s.isMoving = moving;
      setIsMoving(moving);
    }

    // Infinite wrap
    const sequenceWidth = s.slideWidth * totalSlideCount;
    if (s.currentX > -sequenceWidth * 1) {
      s.currentX -= sequenceWidth;
      s.targetX -= sequenceWidth;
    } else if (s.currentX < -sequenceWidth * 4) {
      s.currentX += sequenceWidth;
      s.targetX += sequenceWidth;
    }

    // Apply track transform
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${s.currentX}px, 0, 0)`;
    }

    // Parallax on images
    const viewportCenter = window.innerWidth / 2;
    slidesRef.current.forEach((slide) => {
      if (!slide) return;
      const img = slide.querySelector("img");
      if (!img) return;
      const rect = slide.getBoundingClientRect();
      if (rect.right < -500 || rect.left > window.innerWidth + 500) return;
      const slideCenter = rect.left + rect.width / 2;
      const distanceFromCenter = slideCenter - viewportCenter;
      const parallaxOffset = distanceFromCenter * -0.4;
      img.style.transform = `translateX(${parallaxOffset}px) scale(2.25)`;
    });

    rafRef.current = requestAnimationFrame(animate);
  }, [totalSlideCount]);

  // Event handlers (Drag & Touch)
  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    const s = stateRef.current;
    s.isDragging = true;
    s.startX = e.clientX;
    s.lastMouseX = e.clientX;
    s.lastX = s.targetX;
    s.dragDistance = 0;
    s.hasActuallyDragged = false;
    s.lastScrollTime = Date.now();
  }, []);

  const handleMouseMove = useCallback((e) => {
    const s = stateRef.current;
    if (!s.isDragging) return;
    e.preventDefault();

    const deltaX = (e.clientX - s.lastMouseX) * 2;
    s.targetX += deltaX;
    s.lastMouseX = e.clientX;
    s.dragDistance += Math.abs(deltaX);

    // Track total scroll distance for rotation detection
    s.totalScrollDistance += Math.abs(deltaX);
    if (s.totalScrollDistance >= s.fullCycleDistance) {
      s.isScrollLocked = false;
    }

    if (s.dragDistance > 5) s.hasActuallyDragged = true;
    s.lastScrollTime = Date.now();
  }, []);

  const handleMouseUp = useCallback(() => {
    const s = stateRef.current;
    s.isDragging = false;
    setTimeout(() => {
      s.hasActuallyDragged = false;
    }, 100);
  }, []);

  const handleTouchStart = useCallback((e) => {
    const s = stateRef.current;
    s.isDragging = true;
    s.startX = e.touches[0].clientX;
    s.lastX = s.targetX;
    s.dragDistance = 0;
    s.hasActuallyDragged = false;
    s.lastScrollTime = Date.now();
  }, []);

  const handleTouchMove = useCallback((e) => {
    const s = stateRef.current;
    if (!s.isDragging) return;

    const deltaX = (e.touches[0].clientX - s.startX) * 1.5;
    s.targetX = s.lastX + deltaX;
    s.dragDistance = Math.abs(deltaX);

    // Track total scroll distance for rotation detection
    s.totalScrollDistance += Math.abs(deltaX);
    if (s.totalScrollDistance >= s.fullCycleDistance) {
      s.isScrollLocked = false;
    }

    if (s.dragDistance > 5) s.hasActuallyDragged = true;
    s.lastScrollTime = Date.now();
  }, []);

  const handleTouchEnd = useCallback(() => {
    const s = stateRef.current;
    s.isDragging = false;
    setTimeout(() => {
      s.hasActuallyDragged = false;
    }, 100);
  }, []);

  const handleSlideClick = useCallback((url) => {
    const s = stateRef.current;
    if (s.dragDistance < 10 && !s.hasActuallyDragged) {
      window.location.href = url;
    }
  }, []);

  // Initialize
  useEffect(() => {
    buildSlides();
    const onResize = () => buildSlides();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [buildSlides]);

  // Start animation loop
  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  // Setup Wheel Listener for Scroll Trapping - Attached to window
  useEffect(() => {
    const handleWheel = (e) => {
      const s = stateRef.current;

      // Always prevent default when scroll is locked
      if (s.isScrollLocked) {
        e.preventDefault();

        // Move the slider based on wheel delta
        const delta = e.deltaY * CONFIG.SCROLL_SPEED;
        s.targetX -= delta;
        s.lastScrollTime = Date.now();

        // Track total scroll distance
        s.totalScrollDistance += Math.abs(delta);

        // Check if we've completed a full rotation
        if (s.totalScrollDistance >= s.fullCycleDistance) {
          s.isScrollLocked = false;
        }
      } else {
        // Scroll is unlocked - check direction
        if (e.deltaY < 0) {
          // Scrolling UP - lock it and move slider backward
          e.preventDefault();
          const delta = e.deltaY * CONFIG.SCROLL_SPEED;
          s.targetX -= delta;
          s.lastScrollTime = Date.now();

          // Update total scroll distance when going back
          s.totalScrollDistance = Math.max(
            0,
            s.totalScrollDistance - Math.abs(delta),
          );

          // If we go back enough, lock it again
          if (s.totalScrollDistance < s.fullCycleDistance) {
            s.isScrollLocked = true;
          }
        }
        // Scrolling DOWN - let it pass (don't preventDefault)
      }
    };

    // Add wheel listener to window with passive: false
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // Global mouse listeners
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const slideW = isMobile ? "w-[175px]" : "w-[350px]";
  const slideH = isMobile ? "h-[250px]" : "h-[500px]";

  return (
    <div
      className="relative w-screen h-screen bg-[#0f0f0f] overflow-hidden select-none"
      style={{ fontFamily: "'DM Mono', monospace" }}
    >
      <style>{`@import url("https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap");`}</style>

      {/* Nav */}
      <nav className="absolute top-0 left-0 w-full px-6 py-6 flex justify-between items-center z-20">
        <a
          href="#"
          className="text-white no-underline uppercase text-xs font-medium tracking-wide hover:opacity-70 transition-opacity"
        >
          Glasswake
        </a>
        <div className="flex gap-8">
          <a
            href="#"
            className="text-white no-underline uppercase text-xs font-medium hover:opacity-70 transition-opacity"
          >
            Work
          </a>
          <a
            href="#"
            className="text-white no-underline uppercase text-xs font-medium hover:opacity-70 transition-opacity"
          >
            Studio
          </a>
          <a
            href="#"
            className="text-white no-underline uppercase text-xs font-medium hover:opacity-70 transition-opacity"
          >
            Contact
          </a>
        </div>
      </nav>

      {/* Slider */}
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-hidden "
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onDragStart={(e) => e.preventDefault()}
      >
        <div
          ref={trackRef}
          className="absolute w-full h-full flex"
          style={{ willChange: "transform" }}
        >
          {slides.map((slide, i) => (
            <div
              key={slide.key}
              ref={(el) => (slidesRef.current[i] = el) as any}
              className={`flex-shrink-0 ${slideW} ${slideH} mx-[20px] relative top-1/2 -translate-y-1/2 overflow-visible flex flex-col cursor-pointer group`}
              onClick={() => handleSlideClick(slide.url)}
            >
              {/* Image container */}
              <div className="w-full h-full overflow-hidden flex-1">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full h-full object-cover select-none"
                  style={{ willChange: "transform", transform: "scale(2.25)" }}
                  draggable={false}
                />
              </div>

              {/* Overlay */}
              <div
                className="absolute bottom-[-1.75rem] left-0 right-0 flex justify-between items-center pointer-events-none z-10 transition-opacity duration-300"
                style={{ opacity: isMoving ? 0 : 1 }}
              >
                <p className="text-white uppercase font-medium text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {slide.title}
                </p>
                <div className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    viewBox="0 0 24 24"
                    className="stroke-white"
                    strokeWidth={2}
                    fill="none"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
