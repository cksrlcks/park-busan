"use client";

import { PropsWithChildren } from "react";
import { motion } from "motion/react";

export default function TransitionView({ children }: PropsWithChildren) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
    >
      {children}
    </motion.div>
  );
}
