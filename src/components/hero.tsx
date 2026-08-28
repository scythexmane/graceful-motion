import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { EASE } from "./motion-primitives";
import heroImg from "@/assets/hero.jpg";

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "9%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.08]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);

  return (
    <section id="top" ref={ref} className="relative h-[100svh] w-full overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <motion.img
          src={heroImg}
          alt="Guest twirling spaghetti pomodoro by candlelight at Minoj"
          width={1600}
          height={1104}
          className="h-full w-full object-cover"
          initial={{ scale: reduced ? 1 : 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: EASE }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(6,26,28,0.88) 0%, rgba(6,26,28,0.55) 45%, rgba(6,26,28,0.25) 100%)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="relative mx-auto flex h-full w-full max-w-[1240px] flex-col justify-end px-6 pb-16 md:px-10 md:pb-24"
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
          className="eyebrow mb-6"
          style={{ color: "rgba(240,236,229,0.65)" }}
        >
          Trattoria · Rome, since 1998
        </motion.p>

        <h1
          className="font-display max-w-[15ch] text-[2.9rem] leading-[1.03] tracking-[0.01em] sm:text-6xl md:text-[5.4rem]"
          style={{ color: "var(--cream)" }}
        >
          {["A slower", "taste of Italy"].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: "60%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 1.25, delay: 0.62 + i * 0.12, ease: EASE }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.98, ease: EASE }}
          className="mt-6 max-w-[46ch] text-sm leading-relaxed md:text-base"
          style={{ color: "rgba(240,236,229,0.75)" }}
        >
          Handmade pasta, wood fire and quiet rooms. Cooked the way it has always
          been cooked, served without hurry.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.14, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-6"
        >
          <a
            href="#reserve"
            className="group inline-flex items-center gap-3 bg-primary px-8 py-4 text-[0.68rem] uppercase tracking-[0.24em] text-primary-foreground transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5"
          >
            Book your table
            <span className="inline-block transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#menu"
            className="eyebrow link-wipe"
            style={{ color: "rgba(240,236,229,0.8)" }}
          >
            View the menu
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5, ease: EASE }}
        className="absolute bottom-8 right-6 hidden md:right-10 md:block"
      >
        <div className="h-14 w-px overflow-hidden" style={{ background: "rgba(240,236,229,0.25)" }}>
          <motion.div
            className="h-6 w-px"
            style={{ background: "var(--ember)" }}
            animate={{ y: [-24, 56] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
