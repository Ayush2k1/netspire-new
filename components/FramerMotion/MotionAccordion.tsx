"use client";
import { useAnimationToggle } from "@/app/contexts/GlobalContext";
import { motion } from "framer-motion";

import React from "react";

const variants = {
  hidden: { opacity: 0, y: 50, rotate: 5 }, // Starting from below with a slight rotation
  visible: { opacity: 1, y: 0, rotate: 0 }, // Ending at the original position with no rotation
};

const MotionAccordion = ({
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
        transition={{
          delay: delay,
          duration: 0.3, // Extended duration for smoother transition
          stiffness: 1000,
          velocity: -100,
        }}
        viewport={{ once: true }}
      >
        {content}
      </motion.div>
    )
  );
};

export default MotionAccordion;
