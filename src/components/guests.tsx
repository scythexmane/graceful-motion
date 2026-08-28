import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE, MaskedLines, Reveal } from "./motion-primitives";

const QUOTES = [
  {
    text: "The carbonara arrived without ceremony and quietly ruined every other version for me.",
    name: "Olivia M.",
    city: "London",
  },
  {
    text: "Three hours passed at the corner table and nobody once made us feel rushed.",
    name: "Ethan W.",
    city: "Berlin",
  },
  {
    text: "A dining room that feels lived in, and food that tastes like someone's grandmother approved it.",
    name: "Noah R.",
    city: "Milan",
  },
  {
    text: "Everything about the evening was measured — the light, the pace, the pepper.",
    name: "Alba T.",
    city: "Rome",
  },
];

export function Guests() {
  const [i, setI] = useState(0);
  const q = QUOTES[i];

  return (
    <section
      id="guests"
      className="py-28 md:py-36"
      style={{ background: "var(--petrol)", color: "var(--cream)" }}
    >
      <div className="mx-auto grid w-full max-w-[1240px] gap-12 px-6 md:grid-cols-12 md:items-center md:px-10">
        <div className="md:col-span-4">
          <Reveal weight="small">
            <p className="eyebrow" style={{ color: "rgba(240,236,229,0.5)" }}>
              Guests
            </p>
          </Reveal>
          <MaskedLines
            lines={["What our", "guests say"]}
            className="font-display mt-5 block text-4xl leading-[1.08] md:text-[3.2rem]"
            delay={0.05}
          />
          <Reveal weight="small" delay={0.2}>
            <div className="mt-10 flex items-center gap-3">
              {[-1, 1].map((d) => (
                <button
                  key={d}
                  aria-label={d < 0 ? "Previous quote" : "Next quote"}
                  onClick={() => setI((v) => (v + d + QUOTES.length) % QUOTES.length)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-500 hover:bg-[color:var(--ember)] hover:border-[color:var(--ember)]"
                  style={{ borderColor: "rgba(240,236,229,0.3)" }}
                >
                  {d < 0 ? "←" : "→"}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-8">
          <div className="relative min-h-[240px] md:min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
                transition={{ duration: 0.7, ease: EASE }}
                className="border-l pl-8"
                style={{ borderColor: "rgba(240,236,229,0.2)" }}
              >
                <blockquote className="font-display text-2xl leading-[1.4] md:text-[2.25rem]">
                  “{q.text}”
                </blockquote>
                <figcaption
                  className="eyebrow mt-8"
                  style={{ color: "rgba(240,236,229,0.55)" }}
                >
                  {q.name} — {q.city}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex gap-2">
            {QUOTES.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Go to quote ${idx + 1}`}
                onClick={() => setI(idx)}
                className="h-px w-12 transition-colors duration-500"
                style={{
                  background:
                    idx === i ? "var(--ember)" : "rgba(240,236,229,0.25)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
