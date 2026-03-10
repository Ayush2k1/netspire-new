"use client";
import { useEffect } from "react";
import { AnimatePresence, motion, cubicBezier } from "framer-motion";
import { useAnimationToggle } from "../app/contexts/GlobalContext";

const containerVariants = {
  initial: {
    clipPath: "inset(0% 0% 0% 0%)",
  },
  exit: {
    clipPath: "inset(50% 0% 50% 0%)",
    transition: {
      duration: 0.4,
      ease: cubicBezier(0.76, 0, 0.24, 1),
    },
  },
};

const fadeVariants = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

const LogoAnimation = ({ settingsData }: { settingsData: any }) => {
  const { isAnimation, toggleAnimation } = useAnimationToggle();

  useEffect(() => {
    toggleAnimation(true);
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      toggleAnimation(false);
      document.body.style.overflow = "";
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isAnimation && (
        <motion.div
          key="loader-overlay"
          variants={containerVariants}
          initial="initial"
          animate="initial"
          exit="exit"
          style={{ background: "#ffffff", willChange: "clip-path" }}
          className="w-full h-screen fixed inset-0 z-9999 flex items-center justify-center overflow-hidden pointer-events-none!"
        >
          {/* Slightly darker full blue background that fades to white in the middle */}
          <motion.div
            variants={fadeVariants as any}
            initial="initial"
            animate="visible"
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,255,255,1) 0%, rgba(210,235,255,1) 8%, rgba(140,200,255,1) 18%, rgba(60,150,240,1) 30%, rgba(10,90,210,1) 45%, rgba(0,45,140,1) 60%, rgba(0,18,75,1) 75%, rgba(0,8,40,1) 88%, rgba(0,4,22,1) 100%)",
              willChange: "opacity",
            }}
          />

          <motion.img
            src="/NETSPIRE-removebg-preview.png"
            alt="Netspire Logo"
            variants={fadeVariants as any}
            initial="initial"
            animate="visible"
            style={{
              willChange: "opacity",
            }}
            className="relative z-10 w-[70vw] max-w-125 h-auto object-contain"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LogoAnimation;
