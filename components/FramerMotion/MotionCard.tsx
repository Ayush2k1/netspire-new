"use client";
import { useAnimationToggle } from "@/app/contexts/GlobalContext";
import { motion, useTransform, useScroll } from "framer-motion";
import React, { useRef } from "react";
import { useMediaQuery } from "usehooks-ts";

const MotionCard = ({
  content,
  className,
  delay,
  index,
  open = false,
  style,
}: {
  content: React.ReactNode;
  className?: string;
  delay?: number;
  index: number;
  open?: boolean;
  style?: any;
}) => {
  const isDesktop = useMediaQuery("(min-width: 600px)");

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const rotateDesktop = useTransform(
    scrollYProgress,
    [0, 0.85, 1],
    [0, 0, -10],
  );
  const roatateMobile = useTransform(scrollYProgress, [0, 0.9, 1], [0, 0, -10]);

  const { isAnimation, toggleAnimation } = useAnimationToggle();

  const rotate = isDesktop ? rotateDesktop : roatateMobile;

  return (
    !isAnimation && (
      <motion.div
        ref={ref}
        className={className}
        style={!open && { rotate, ...style }}
        transition={{
          duration: 1,
          delay: delay,
          stiffness: 100,
          velocity: -100,
        }}
      >
        {content}
      </motion.div>
    )
  );
};

export default MotionCard;
