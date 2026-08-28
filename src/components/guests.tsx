import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE, MaskedLines, Reveal } from "./motion-primitives";
import { useI18n } from "@/lib/i18n";

const ROTATIONS = [-1.4, 0.9, -0.6];

function Note({
  quote,
  index,
}: {
  quote: { text: string; name: string };
  index: number;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 26, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate: ROTATIONS[index] ?? 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.75, delay: index * 0.08, ease: EASE }}
      whileHover={{ rotate: 0, y: -6 }}
      className="paper-note relative px-7 py-9 pl-12 text-center"
    >
      <span className="note-holes" aria-hidden />
      <span
        className="font-display block text-4xl leading-none"
        style={{ color: "var(--ember)" }}
      >
        “
      </span>
      <blockquote
        className="mt-4 text-[0.95rem] leading-[1.7] tracking-[0.01em]"
        style={{ color: "var(--petrol-deep)" }}
      >
        {quote.text}
      </blockquote>
      <div className="mt-6 text-sm" style={{ color: "var(--ember)" }}>
        ★★★★★
      </div>
      <figcaption
        className="mt-3 text-xs font-medium tracking-[0.12em] uppercase"
        style={{ color: "var(--petrol)" }}
      >
        {quote.name}
      </figcaption>
    </motion.figure>
  );
}

export function Guests() {
  const { t } = useI18n();
  const quotes = t.guests.quotes;
  const [start, setStart] = useState(0);

  const visible = [0, 1, 2].map((o) => quotes[(start + o) % quotes.length]!);
  const move = (d: number) => setStart((v) => (v + d + quotes.length) % quotes.length);

  return (
    <section
      id="guests"
      className="py-28 md:py-36"
      style={{ background: "var(--petrol)", color: "var(--cream)" }}
    >
      <div className="mx-auto w-full max-w-[1360px] px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Reveal weight="small">
              <p className="eyebrow" style={{ color: "rgba(240,236,229,0.5)" }}>
                {t.guests.eyebrow}
              </p>
            </Reveal>
            <MaskedLines
              lines={t.guests.title}
              className="font-display mt-5 block text-[2.6rem] leading-[1.06] md:text-[4rem]"
              delay={0.05}
            />
          </div>

          <Reveal weight="small" delay={0.18}>
            <div className="flex items-center gap-3">
              {[-1, 1].map((d) => (
                <button
                  key={d}
                  aria-label={d < 0 ? "Previous reviews" : "Next reviews"}
                  onClick={() => move(d)}
                  className="flex h-12 w-12 items-center justify-center rounded-full border transition-colors duration-500 hover:border-[color:var(--ember)] hover:bg-[color:var(--ember)]"
                  style={{ borderColor: "rgba(240,236,229,0.3)" }}
                >
                  {d < 0 ? "←" : "→"}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((q, i) => (
              <Note key={q.text} quote={q} index={i} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
