import { Reveal } from "./motion-primitives";
import { Logo } from "./logo";
import { LINKS, useI18n } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useI18n();

  const COLUMNS = [
    { title: t.footer.hours, items: t.footer.hoursLines.map((l) => ({ label: l })) },
    { title: t.footer.findUs, items: t.footer.address.map((l) => ({ label: l })) },
    {
      title: t.footer.follow,
      items: [
        { label: "Instagram", href: LINKS.instagram },
        { label: "Taplink", href: LINKS.taplink },
        { label: "Yandex Maps", href: LINKS.maps },
      ],
    },
  ];

  return (
    <footer
      className="pt-20 pb-10"
      style={{ background: "var(--petrol-deep)", color: "var(--cream)" }}
    >
      <div className="mx-auto w-full max-w-[1360px] px-6 md:px-10">
        <Reveal weight="secondary">
          <Logo className="h-24 w-24 md:h-32 md:w-32" />
        </Reveal>

        <div
          className="mt-14 grid gap-10 border-t pt-10 md:grid-cols-3"
          style={{ borderColor: "rgba(240,236,229,0.15)" }}
        >
          {COLUMNS.map((col, i) => (
            <Reveal key={col.title} weight="small" delay={i * 0.08}>
              <p className="eyebrow" style={{ color: "rgba(240,236,229,0.45)" }}>
                {col.title}
              </p>
              <ul className="mt-5 space-y-3">
                {col.items.map((item) => (
                  <li key={item.label} className="text-sm" style={{ color: "rgba(240,236,229,0.8)" }}>
                    {"href" in item && item.href ? (
                      <a href={item.href} target="_blank" rel="noreferrer" className="link-wipe">
                        {item.label}
                      </a>
                    ) : (
                      item.label
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div
          className="mt-16 flex flex-col gap-3 border-t pt-6 text-xs md:flex-row md:items-center md:justify-between"
          style={{ borderColor: "rgba(240,236,229,0.15)", color: "rgba(240,236,229,0.45)" }}
        >
          <span>© {new Date().getFullYear()} {t.footer.rights}</span>
          <a href="#top" className="link-wipe self-start">
            {t.footer.top}
          </a>
        </div>
      </div>
    </footer>
  );
}
