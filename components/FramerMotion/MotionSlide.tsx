"use client";
import { useAnimationToggle } from "@/app/contexts/GlobalContext";
import { motion } from "framer-motion";

import React, { ReactNode } from "react";

const variants = {
  hidden: { clipPath: "inset(0% 100% 0% 0%)" },
  visible: { clipPath: "inset(0% 0% 0% 0%)" },
};

const MotionSlide = ({
  content,
  className,
  index,
  delay,
}: {
  content: ReactNode;
  className?: string;
  index?: number;
  delay?: number;
}) => {
  const { isAnimation, toggleAnimation } = useAnimationToggle();
  return (
    !isAnimation && (
      <motion.div
        variants={variants}
        className={className}
        initial="hidden"
        whileInView="visible"
        transition={{
          duration: 1.5,
          delay: delay || 0,
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        viewport={{ once: true }}
      >
        {content}
      </motion.div>
    )
  );
};

export default MotionSlide;
