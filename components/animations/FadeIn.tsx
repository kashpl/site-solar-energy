"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  amount?: number | "some" | "all";
  className?: string;
  distance?: number;
};

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  amount = 0.25,
  className
}: FadeInProps) {
  const getAnimate = () => {
    switch (direction) {
      case "up": case "down": return { opacity: 1, y: 0 };
      case "left": case "right": return { opacity: 1, x: 0 };
      case "none": return { opacity: 1 };
    }
  };

  return (
    <motion.div
      initial={false}
      whileInView={getAnimate()}
      viewport={{ once: true, amount }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
