import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { EASE } from "./motion-primitives";

const LINKS = [
  { label: "Our Story", href: "#story" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Guests", href: "#guests" },
  { label: "Contact", href: "#contact" },
];

export function SiteNav() {
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setCondensed(y > 40);
    setHidden(y > 320 && y > prev && !open);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <motion.div
          animate={{
            backgroundColor: condensed ? "rgba(9,42,46,0.86)" : "rgba(9,42,46,0)",
            backdropFilter: condensed ? "blur(14px)" : "blur(0px)",
            paddingTop: condensed ? 14 : 26,
            paddingBottom: condensed ? 14 : 26,
          }}
          transition={{ duration: 0.7, ease: EASE }}
          className="w-full"
        >
          <nav className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-6 md:px-10">
            <a
              href="#top"
              className="font-display text-2xl tracking-wide text-cream"
              style={{ color: "var(--cream)" }}
            >
              Minoj
            </a>

            <ul className="hidden items-center gap-9 md:flex">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="eyebrow link-wipe text-cream/80 transition-colors duration-300 hover:text-cream"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              <a
                href="#reserve"
                className="hidden bg-primary px-6 py-3 text-[0.68rem] uppercase tracking-[0.24em] text-primary-foreground transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 md:inline-block"
              >
                Reserve
              </a>
              <button
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((v) => !v)}
                className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] md:hidden"
              >
                <motion.span
                  animate={{ rotate: open ? 45 : 0, y: open ? 3.5 : 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="block h-px w-6 bg-cream"
                />
                <motion.span
                  animate={{ rotate: open ? -45 : 0, y: open ? -3.5 : 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="block h-px w-6 bg-cream"
                />
              </button>
            </div>
          </nav>
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ backgroundColor: "var(--petrol-deep)" }}
          >
            <motion.ul
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
              }}
              className="flex h-full flex-col justify-center gap-2 px-8"
            >
              {[...LINKS, { label: "Reserve", href: "#reserve" }].map((l) => (
                <motion.li
                  key={l.href}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                  }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display block py-3 text-4xl"
                    style={{ color: "var(--cream)" }}
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
