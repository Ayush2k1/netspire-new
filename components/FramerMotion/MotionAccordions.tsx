"use client";
import { useAnimationToggle } from "@/app/contexts/GlobalContext";
import { motion } from "framer-motion";

import React from "react";

const variants = {
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  hidden: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const MotionAccordions = ({
  content,
  delay,
  className,
}: {
  content: any;
  delay?: number;
  className?: string;
}) => {
  const { isAnimation, toggleAnimation } = useAnimationToggle();
  return (
    !isAnimation && (
      <motion.div
        variants={variants}
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {content}
      </motion.div>
    )
  );
};

export default MotionAccordions;
