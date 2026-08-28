import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { MaskedLines, Reveal } from "./motion-primitives";
import { useI18n } from "@/lib/i18n";
import reel1 from "@/assets/reel-1.mp4.asset.json";
import reel2 from "@/assets/reel-2.mp4.asset.json";
import reel3 from "@/assets/reel-3.mp4.asset.json";

const REELS = [reel1.url, reel2.url, reel3.url];

function Reel({ src, index, y }: { src: string; index: number; y: MotionValue<string> }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);

  return (
    <motion.div style={{ y }} className={index === 1 ? "md:-mt-16" : index === 2 ? "md:mt-10" : ""}>
      <motion.div
        initial={{ clipPath: "inset(10% 6% 10% 6% round 14px)", opacity: 0 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0% round 14px)", opacity: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.25, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="group relative aspect-[9/16] w-full overflow-hidden rounded-[14px]"
        style={{ background: "var(--petrol-deep)" }}
      >
        <video
          ref={videoRef}
          src={src}
          muted={muted}
          loop
          playsInline
          autoPlay
          preload="metadata"
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(6,22,24,0.55) 0%, rgba(6,22,24,0) 45%)",
          }}
        />
        <button
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border text-sm opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100 focus-visible:opacity-100"
          style={{
            borderColor: "rgba(240,236,229,0.35)",
            color: "var(--cream)",
            background: "rgba(6,22,24,0.35)",
          }}
        >
          {muted ? "♪" : "✕"}
        </button>
      </motion.div>
    </motion.div>
  );
}

export function Atmosphere() {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const { t } = useI18n();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const up = useTransform(scrollYProgress, [0, 1], ["0px", reduced ? "0px" : "-56px"]);
  const down = useTransform(scrollYProgress, [0, 1], ["0px", reduced ? "0px" : "38px"]);
  const mid = useTransform(scrollYProgress, [0, 1], ["0px", reduced ? "0px" : "-20px"]);
  const drifts = [up, down, mid];

  return (
    <section id="atmosphere" ref={ref} className="py-28 md:py-40">
      <div className="mx-auto w-full max-w-[1360px] px-6 md:px-10">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Reveal weight="small">
              <p className="eyebrow" style={{ color: "var(--ember)" }}>
                {t.atmosphere.eyebrow}
              </p>
            </Reveal>
            <MaskedLines
              lines={t.atmosphere.title}
              className="font-display mt-5 block text-[2.8rem] leading-[1.06] md:text-[4.2rem]"
              delay={0.05}
            />
          </div>
          <Reveal weight="secondary" delay={0.16} className="md:col-span-5">
            <p className="max-w-[46ch] text-sm leading-[1.9] text-muted-foreground md:text-base">
              {t.atmosphere.text}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-20 md:grid-cols-3 md:gap-8">
          {REELS.map((src, i) => (
            <Reel key={src} src={src} index={i} y={drifts[i] ?? up} />
          ))}
        </div>

        <Reveal weight="small" delay={0.1}>
          <p className="mt-8 text-center text-xs tracking-[0.2em] text-muted-foreground uppercase">
            {t.atmosphere.hint}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
