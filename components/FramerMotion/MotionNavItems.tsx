"use client";
import { useAnimationToggle } from "@/app/contexts/GlobalContext";
import { motion } from "framer-motion";

import React, { ReactNode } from "react";

const variants = {
  visible: {
    opacity: 1,
    y: 0,
  },
  hidden: {
    opacity: 0,
    y: 20,
  },
};

const MotionNavItems = ({
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
        animate="visible"
        transition={{
          duration: 1,
          delay: delay,
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
      >
        {content}
      </motion.div>
    )
  );
};

export default MotionNavItems;
