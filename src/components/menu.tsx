import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE, MaskedLines, Reveal } from "./motion-primitives";

type Item = { name: string; note: string; price: string };

const MENU: Record<string, Item[]> = {
  Antipasti: [
    { name: "Bruschetta al Pomodoro", note: "Sourdough, datterini, basil, cold-pressed oil", price: "9" },
    { name: "Burrata di Andria", note: "Stracciatella, grilled peach, black pepper", price: "14" },
    { name: "Carciofi alla Romana", note: "Braised artichoke, mint, lemon", price: "12" },
    { name: "Prosciutto e Focaccia", note: "24-month San Daniele, rosemary focaccia", price: "16" },
  ],
  Primi: [
    { name: "Tagliolini al Tartufo", note: "Hand-cut pasta, cream, winter truffle", price: "24" },
    { name: "Spaghetti alla Carbonara", note: "Guanciale, pecorino romano, egg yolk", price: "18" },
    { name: "Cacio e Pepe", note: "Tonnarelli, pecorino, cracked pepper", price: "17" },
    { name: "Ravioli di Zucca", note: "Pumpkin, sage butter, amaretti", price: "19" },
  ],
  Secondi: [
    { name: "Pollo alla Parmigiana", note: "Marinara, fior di latte, basil", price: "22" },
    { name: "Branzino al Forno", note: "Whole sea bass, fennel, olives", price: "28" },
    { name: "Pizza Margherita", note: "Wood fire, San Marzano, buffalo mozzarella", price: "15" },
    { name: "Tagliata di Manzo", note: "Aged sirloin, rocket, aged balsamic", price: "32" },
  ],
  Dolci: [
    { name: "Tiramisù", note: "Mascarpone, espresso, cocoa", price: "9" },
    { name: "Panna Cotta", note: "Vanilla, macerated cherries", price: "8" },
    { name: "Affogato", note: "Fior di latte gelato, hot espresso", price: "7" },
  ],
};

const CATEGORIES = Object.keys(MENU);

const itemsFor = (c: string): Item[] => MENU[c] ?? [];

export function Menu() {
  const [active, setActive] = useState<string>(CATEGORIES[0] ?? "Antipasti");

  return (
    <section
      id="menu"
      className="py-28 md:py-40"
      style={{ background: "var(--petrol-deep)", color: "var(--cream)" }}
    >
      <div className="mx-auto w-full max-w-[1040px] px-6 md:px-10">
        <div className="text-center">
          <Reveal weight="small">
            <p className="eyebrow" style={{ color: "rgba(240,236,229,0.5)" }}>
              The table
            </p>
          </Reveal>
          <MaskedLines
            lines={["Crafted Italian menu"]}
            className="font-display mt-5 block text-4xl md:text-[3.6rem]"
            delay={0.05}
          />
        </div>

        <Reveal weight="small" delay={0.18}>
          <div className="mt-12 flex flex-wrap justify-center gap-2 md:gap-3">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className="relative px-5 py-2.5 text-[0.68rem] uppercase tracking-[0.22em] transition-colors duration-500"
                style={{ color: active === c ? "var(--cream)" : "rgba(240,236,229,0.5)" }}
              >
                {active === c && (
                  <motion.span
                    layoutId="menu-pill"
                    transition={{ duration: 0.55, ease: EASE }}
                    className="absolute inset-0 -z-0"
                    style={{ background: "rgba(240,236,229,0.09)" }}
                  />
                )}
                <span className="relative z-10">{c}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 min-h-[380px]">
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
              {itemsFor(active).map((item) => (
                <motion.li
                  key={item.name}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
                    exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: EASE } },
                  }}
                  className="group grid grid-cols-[1fr_auto] items-baseline gap-6 border-b py-6"
                  style={{ borderColor: "rgba(240,236,229,0.14)" }}
                >
                  <div>
                    <h3 className="font-display text-2xl transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5 md:text-[1.75rem]">
                      {item.name}
                    </h3>
                    <p
                      className="mt-2 max-w-[52ch] text-xs leading-relaxed transition-colors duration-500"
                      style={{ color: "rgba(240,236,229,0.55)" }}
                    >
                      {item.note}
                    </p>
                  </div>
                  <span
                    className="font-display text-xl"
                    style={{ color: "var(--ember)" }}
                  >
                    €{item.price}
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
