import { motion } from "motion/react";
import { Instagram, Link2, MapPin, Phone } from "lucide-react";
import { EASE, MaskedLines, Reveal } from "./motion-primitives";
import { LINKS, useI18n } from "@/lib/i18n";

export function Contact() {
  const { t } = useI18n();

  const CARDS = [
    {
      icon: Instagram,
      label: t.contact.instagram,
      value: "@minoj.official",
      note: t.contact.instagram,
      href: LINKS.instagram,
    },
    {
      icon: Link2,
      label: t.contact.taplink,
      value: "taplink.cc/minoj.official.uz",
      note: t.contact.taplinkNote,
      href: LINKS.taplink,
    },
    {
      icon: Phone,
      label: t.contact.phone,
      value: LINKS.phoneDisplay,
      note: t.contact.phoneNote,
      href: `tel:${LINKS.phone}`,
    },
    {
      icon: MapPin,
      label: t.contact.location,
      value: "Yandex Maps",
      note: t.contact.locationNote,
      href: LINKS.maps,
    },
  ];

  return (
    <section id="contact" className="py-28 md:py-40">
      <div className="mx-auto w-full max-w-[1360px] px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-6">
            <Reveal weight="small">
              <p className="eyebrow" style={{ color: "var(--ember)" }}>
                {t.contact.eyebrow}
              </p>
            </Reveal>
            <MaskedLines
              lines={t.contact.title}
              className="font-display mt-5 block text-[2.8rem] leading-[1.05] md:text-[4.4rem]"
              lineClassName="text-[color:var(--petrol-deep)]"
              delay={0.05}
            />
          </div>
          <Reveal weight="secondary" delay={0.16} className="md:col-span-6">
            <p className="max-w-[48ch] text-sm leading-[1.9] text-muted-foreground md:text-base">
              {t.contact.text}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden border sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("tel:") ? undefined : "_blank"}
              rel="noreferrer"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
              className="group relative flex min-h-[240px] flex-col justify-between overflow-hidden bg-background p-8 outline outline-border transition-colors duration-[700ms]"
            >
              <span
                className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                style={{ background: "var(--petrol-deep)" }}
                aria-hidden
              />
              <span className="relative z-10 flex items-center justify-between">
                <c.icon
                  className="h-6 w-6 transition-colors duration-[700ms] group-hover:text-[color:var(--cream)]"
                  style={{ color: "var(--ember)" }}
                  strokeWidth={1.4}
                />
                <span className="text-lg transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:text-[color:var(--cream)]">
                  ↗
                </span>
              </span>
              <span className="relative z-10">
                <span className="eyebrow block text-muted-foreground transition-colors duration-[700ms] group-hover:text-[color:var(--cream)]/60">
                  {c.note}
                </span>
                <span className="font-display mt-3 block text-2xl leading-snug transition-colors duration-[700ms] group-hover:text-[color:var(--cream)] md:text-[1.75rem]">
                  {c.value}
                </span>
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
