import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE, MaskedLines, Reveal } from "./motion-primitives";
import { useI18n } from "@/lib/i18n";

export function Menu() {
  const { t } = useI18n();
  const categories = t.menu.categories;
  const [active, setActive] = useState<string>(categories[0]?.key ?? "starters");
  const items = t.menu.items[active] ?? [];

  return (
    <section
      id="menu"
      className="py-28 md:py-40"
      style={{ background: "var(--petrol-deep)", color: "var(--cream)" }}
    >
      <div className="mx-auto w-full max-w-[1120px] px-6 md:px-10">
        <div className="text-center">
          <Reveal weight="small">
            <p className="eyebrow" style={{ color: "rgba(240,236,229,0.5)" }}>
              {t.menu.eyebrow}
            </p>
          </Reveal>
          <MaskedLines
            lines={t.menu.title}
            className="font-display mt-5 block text-[2.8rem] md:text-[4.2rem]"
            delay={0.05}
          />
        </div>

        <Reveal weight="small" delay={0.18}>
          <div className="mt-12 flex flex-wrap justify-center gap-2 md:gap-3">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setActive(c.key)}
                className="relative px-5 py-2.5 text-[0.7rem] uppercase tracking-[0.22em] transition-colors duration-500"
                style={{ color: active === c.key ? "var(--cream)" : "rgba(240,236,229,0.5)" }}
              >
                {active === c.key && (
                  <motion.span
                    layoutId="menu-pill"
                    transition={{ duration: 0.55, ease: EASE }}
                    className="absolute inset-0 -z-0"
                    style={{ background: "rgba(240,236,229,0.09)" }}
                  />
                )}
                <span className="relative z-10">{c.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.ul
              key={active}
              initial="hidden"
              animate="show"
              exit="exit"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06 } },
                exit: { transition: { staggerChildren: 0.025, staggerDirection: -1 } },
              }}
            >
              {items.map((item) => (
                <motion.li
                  key={item.name}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
                    exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: EASE } },
                  }}
                  className="group grid grid-cols-[1fr_auto] items-baseline gap-6 border-b py-7"
                  style={{ borderColor: "rgba(240,236,229,0.14)" }}
                >
                  <div>
                    <h3 className="font-display text-2xl transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5 md:text-[2rem]">
                      {item.name}
                    </h3>
                    <p
                      className="mt-2 max-w-[54ch] text-[0.8rem] leading-relaxed transition-colors duration-500"
                      style={{ color: "rgba(240,236,229,0.55)" }}
                    >
                      {item.note}
                    </p>
                  </div>
                  <span className="font-display text-xl md:text-2xl" style={{ color: "var(--ember)" }}>
                    {item.price}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
