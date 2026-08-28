import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { EASE } from "./motion-primitives";
import { useI18n } from "@/lib/i18n";
import heroImg from "@/assets/hero.jpg";

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const { t } = useI18n();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "9%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.08]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);

  return (
    <section id="top" ref={ref} className="relative h-[100svh] w-full overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <motion.img
          src={heroImg}
          alt="Minoj family style restaurant dining room"
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
              "linear-gradient(to right, rgba(6,22,24,0.9) 0%, rgba(6,22,24,0.6) 45%, rgba(6,22,24,0.3) 100%)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="relative mx-auto flex h-full w-full max-w-[1360px] flex-col justify-end px-6 pb-20 md:px-10 md:pb-28"
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
          className="eyebrow mb-7"
          style={{ color: "var(--ember)" }}
        >
          {t.hero.eyebrow}
        </motion.p>

        <h1
          className="font-display max-w-[16ch] text-[3.4rem] leading-[1.02] tracking-[0.01em] sm:text-7xl md:text-[6.4rem]"
          style={{ color: "var(--cream)" }}
        >
          {[t.hero.title, t.hero.titleSub].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className={`block ${i === 1 ? "text-[0.6em] tracking-[0.02em] text-cream/85" : "tracking-[0.06em]"}`}
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
          className="mt-7 max-w-[48ch] text-base leading-relaxed md:text-lg"
          style={{ color: "rgba(240,236,229,0.78)" }}
        >
          {t.hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.14, ease: EASE }}
          className="mt-11 flex flex-wrap items-center gap-7"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 bg-primary px-9 py-4.5 text-[0.7rem] uppercase tracking-[0.24em] text-primary-foreground transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5"
          >
            {t.hero.cta}
            <span className="inline-block transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#menu"
            className="eyebrow link-wipe"
            style={{ color: "rgba(240,236,229,0.8)" }}
          >
            {t.hero.menu}
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
