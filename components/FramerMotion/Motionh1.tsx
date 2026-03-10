"use client";
import { useAnimationToggle } from "@/app/contexts/GlobalContext";
import { motion } from "framer-motion";

import React, { ReactNode } from "react";

const variants: any = {
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
  hidden: {
    opacity: 0,
    y: 20,
    transition: { duration: 1 },
  },
};

const Motionh1 = ({
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
      <motion.h1
        variants={variants}
        className={className}
        initial="hidden"
        whileInView="visible"
        transition={{
          delay: delay,
        }}
        viewport={{ once: true }}
      >
        {content}
      </motion.h1>
    )
  );
};

export default Motionh1;
