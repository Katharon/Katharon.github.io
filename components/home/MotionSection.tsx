"use client";

import { motion, useReducedMotion } from "framer-motion";

type MotionSectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  ariaLabelledby?: string;
};

export function MotionSection({ children, className, id, ariaLabelledby }: MotionSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
