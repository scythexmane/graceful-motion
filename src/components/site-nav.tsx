import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { EASE } from "./motion-primitives";
import { Logo } from "./logo";
import { LANGS, LANG_LABEL, useI18n } from "@/lib/i18n";

export function SiteNav() {
  const { scrollY } = useScroll();
  const { t, lang, setLang } = useI18n();
  const [condensed, setCondensed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  const LINKS = [
    { label: t.nav.atmosphere, href: "#atmosphere" },
    { label: t.nav.menu, href: "#menu" },
    { label: t.nav.guests, href: "#guests" },
    { label: t.nav.contact, href: "#contact" },
  ];

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

  const LangSwitch = ({ stacked = false }: { stacked?: boolean }) => (
    <div
      className={`flex items-center gap-1 ${stacked ? "" : "rounded-full border px-1.5 py-1"}`}
      style={stacked ? undefined : { borderColor: "rgba(240,236,229,0.22)" }}
    >
      {LANGS.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className="relative px-2.5 py-1 text-[0.7rem] tracking-[0.18em] transition-colors duration-500"
          style={{ color: lang === l ? "var(--cream)" : "rgba(240,236,229,0.5)" }}
        >
          {lang === l && (
            <motion.span
              layoutId={stacked ? "lang-pill-m" : "lang-pill"}
              transition={{ duration: 0.5, ease: EASE }}
              className="absolute inset-0 rounded-full"
              style={{ background: "var(--ember)" }}
            />
          )}
          <span className="relative z-10">{LANG_LABEL[l]}</span>
        </button>
      ))}
    </div>
  );

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: hidden ? -120 : 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <motion.div
          animate={{
            backgroundColor: condensed ? "rgba(9,32,34,0.88)" : "rgba(9,32,34,0)",
            backdropFilter: condensed ? "blur(14px)" : "blur(0px)",
            paddingTop: condensed ? 12 : 22,
            paddingBottom: condensed ? 12 : 22,
          }}
          transition={{ duration: 0.7, ease: EASE }}
          className="w-full"
        >
          <nav className="mx-auto flex w-full max-w-[1360px] items-center justify-between px-6 md:px-10">
            <a href="#top" className="flex items-center gap-3">
              <Logo className="h-12 w-12 md:h-14 md:w-14" />
            </a>

            <ul className="hidden items-center gap-10 lg:flex">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="eyebrow link-wipe text-cream/75 transition-colors duration-300 hover:text-cream"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <LangSwitch />
              </div>
              <a
                href="#contact"
                className="hidden bg-primary px-7 py-3.5 text-[0.7rem] uppercase tracking-[0.24em] text-primary-foreground transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 lg:inline-block"
              >
                {t.nav.book}
              </a>
              <button
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((v) => !v)}
                className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
              >
                <motion.span
                  animate={{ rotate: open ? 45 : 0, y: open ? 3.5 : 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="block h-px w-7 bg-cream"
                />
                <motion.span
                  animate={{ rotate: open ? -45 : 0, y: open ? -3.5 : 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="block h-px w-7 bg-cream"
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
            className="fixed inset-0 z-40 lg:hidden"
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
              {LINKS.map((l) => (
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
              <motion.li
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                }}
                className="mt-8"
              >
                <LangSwitch stacked />
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
