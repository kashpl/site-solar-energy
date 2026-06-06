"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useMotionValue, useSpring } from "framer-motion";

type AnimatedCounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 80, damping: 18 });
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      setDisplay(Number(latest.toFixed(decimals)));
    });

    return () => unsubscribe();
  }, [decimals, spring]);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    const controls = animate(motionValue, value, {
      duration: 1.7,
      ease: "easeOut"
    });

    return controls.stop;
  }, [isInView, motionValue, value]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString("pt-BR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      })}
      {suffix}
    </span>
  );
}
