import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE, MaskedLines, Reveal } from "./motion-primitives";
import tableImg from "@/assets/table.jpg";

const FIELDS = [
  { id: "name", label: "Name", type: "text", placeholder: "Your name" },
  { id: "date", label: "Date", type: "date", placeholder: "" },
  { id: "time", label: "Time", type: "time", placeholder: "" },
  { id: "guests", label: "Guests", type: "number", placeholder: "2" },
];

export function Reserve() {
  const [sent, setSent] = useState(false);

  return (
    <section id="reserve" className="relative overflow-hidden py-28 md:py-40">
      <div className="mx-auto grid w-full max-w-[1240px] gap-14 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <Reveal weight="small">
            <p className="eyebrow text-muted-foreground">Reservations</p>
          </Reveal>
          <MaskedLines
            lines={["Keep a table", "for the evening"]}
            className="font-display mt-5 block text-4xl leading-[1.08] md:text-[3.2rem]"
            lineClassName="text-[color:var(--olive)]"
            delay={0.05}
          />
          <Reveal weight="secondary" delay={0.2}>
            <p className="mt-7 max-w-[42ch] text-sm leading-[1.9] text-muted-foreground">
              We hold a small number of tables each service. Send a request and
              we reply the same day — or simply call the dining room.
            </p>
          </Reveal>
          <Reveal weight="small" delay={0.3}>
            <a href="tel:+390612345678" className="link-wipe mt-8 inline-block font-display text-2xl">
              +39 06 1234 5678
            </a>
          </Reveal>

          <Reveal weight="secondary" delay={0.36}>
            <div className="media-frame mt-12 hidden aspect-[7/5] md:block">
              <img
                src={tableImg}
                alt="A reserved table at Minoj"
                loading="lazy"
                width={1400}
                height={1000}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-7">
          <Reveal weight="secondary" delay={0.15}>
            <div className="border border-border bg-card p-8 md:p-12">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="flex min-h-[380px] flex-col items-start justify-center"
                  >
                    <p className="eyebrow text-muted-foreground">Request received</p>
                    <h3 className="font-display mt-4 text-3xl text-[color:var(--olive)]">
                      We'll write back shortly.
                    </h3>
                    <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-muted-foreground">
                      Thank you — the dining room will confirm your table by email
                      before the end of the day.
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="eyebrow link-wipe mt-8 text-[color:var(--ember)]"
                    >
                      Make another request
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                    className="grid gap-7 sm:grid-cols-2"
                  >
                    {FIELDS.map((f) => (
                      <label key={f.id} className="block">
                        <span className="eyebrow text-muted-foreground">{f.label}</span>
                        <input
                          required
                          type={f.type}
                          placeholder={f.placeholder}
                          min={f.type === "number" ? 1 : undefined}
                          className="mt-3 w-full border-b border-border bg-transparent pb-3 font-display text-xl outline-none transition-colors duration-500 focus:border-[color:var(--ember)]"
                        />
                      </label>
                    ))}
                    <label className="block sm:col-span-2">
                      <span className="eyebrow text-muted-foreground">Notes</span>
                      <input
                        type="text"
                        placeholder="Occasion, allergies, seating…"
                        className="mt-3 w-full border-b border-border bg-transparent pb-3 font-display text-xl outline-none transition-colors duration-500 focus:border-[color:var(--ember)]"
                      />
                    </label>
                    <button
                      type="submit"
                      className="group mt-4 inline-flex items-center justify-center gap-3 bg-primary px-8 py-4 text-[0.68rem] uppercase tracking-[0.24em] text-primary-foreground transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 sm:col-span-2"
                    >
                      Request the table
                      <span className="transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                        →
                      </span>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
