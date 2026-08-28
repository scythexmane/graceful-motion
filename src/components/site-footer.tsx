import { Reveal } from "./motion-primitives";

const COLUMNS = [
  {
    title: "Discover",
    items: ["Our story", "Menu", "Gallery", "Guests"],
  },
  {
    title: "Opening hours",
    items: ["Tue–Fri  11am — 10pm", "Sat–Sun  12pm — 11pm", "Monday closed"],
  },
  {
    title: "Find us",
    items: ["Via dei Cappellari 24", "Trastevere, Rome", "+39 06 1234 5678"],
  },
];

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="pt-20 pb-10"
      style={{ background: "var(--petrol-deep)", color: "var(--cream)" }}
    >
      <div className="mx-auto w-full max-w-[1240px] px-6 md:px-10">
        <Reveal weight="secondary">
          <p className="font-display text-5xl md:text-[5.5rem]">Minoj</p>
        </Reveal>

        <div className="mt-16 grid gap-10 border-t pt-10 md:grid-cols-3" style={{ borderColor: "rgba(240,236,229,0.15)" }}>
          {COLUMNS.map((col, i) => (
            <Reveal key={col.title} weight="small" delay={i * 0.08}>
              <p className="eyebrow" style={{ color: "rgba(240,236,229,0.45)" }}>
                {col.title}
              </p>
              <ul className="mt-5 space-y-3">
                {col.items.map((item) => (
                  <li key={item} className="text-sm" style={{ color: "rgba(240,236,229,0.8)" }}>
                    {item}
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
          <span>© {new Date().getFullYear()} Minoj Trattoria</span>
          <a href="#top" className="link-wipe self-start">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
