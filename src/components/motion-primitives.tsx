import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

/**
 * One shared motion language.
 * - EASE: a single easing curve used everywhere (soft decelerate).
 * - Durations scale with visual weight: primary > secondary > small UI.
 */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const DUR = {
  primary: 1.1,
  secondary: 0.85,
  small: 0.5,
} as const;

export function useMotionScale() {
  const reduced = useReducedMotion();
  return reduced ? 0 : 1;
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** visual weight of the element — controls distance + duration */
  weight?: "primary" | "secondary" | "small";
  as?: "div" | "section" | "span" | "li";
};

const DISTANCE = { primary: 34, secondary: 22, small: 10 };

/** Fade + rise reveal, hierarchy-aware. */
export function Reveal({
  children,
  className,
  delay = 0,
  weight = "secondary",
}: RevealProps) {
  const scale = useMotionScale();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: DISTANCE[weight] * scale }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -10% 0px" }}
      transition={{ duration: DUR[weight], delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Masked headline reveal — clip from the bottom, no letter gimmicks. */
export function MaskedLines({
  lines,
  className,
  lineClassName,
  delay = 0,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  const scale = useMotionScale();
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            initial={{ y: `${55 * scale}%`, opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{
              duration: 1.15,
              delay: delay + i * 0.11,
              ease: EASE,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Stagger container for lists — used sparingly, only where hierarchy helps. */
export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

/** Image that reveals behind a clip mask while its content settles from a slight scale. */
export function MaskedImage({
  src,
  alt,
  className,
  imgClassName,
  width,
  height,
  priority = false,
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  delay?: number;
}) {
  const scale = useMotionScale();
  return (
    <motion.div
      className={`media-frame relative ${className ?? ""}`}
      initial={{ clipPath: `inset(${12 * scale}% ${6 * scale}% ${12 * scale}% ${6 * scale}% round 2px)`, opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 2px)", opacity: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.3, delay, ease: EASE }}
    >
      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        className={`h-full w-full object-cover ${imgClassName ?? ""}`}
        initial={{ scale: 1 + 0.07 * scale }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.6, delay, ease: EASE }}
      />
    </motion.div>
  );
}
