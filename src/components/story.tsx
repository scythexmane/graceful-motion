import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { MaskedImage, MaskedLines, Reveal } from "./motion-primitives";
import interiorImg from "@/assets/interior.jpg";
import pastaImg from "@/assets/pasta.jpg";

export function Story() {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const driftA = useTransform(scrollYProgress, [0, 1], ["0px", reduced ? "0px" : "-56px"]);
  const driftB = useTransform(scrollYProgress, [0, 1], ["0px", reduced ? "0px" : "38px"]);

  return (
    <section id="story" ref={ref} className="relative py-28 md:py-40">
      <div className="mx-auto grid w-full max-w-[1240px] gap-14 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <Reveal weight="small">
            <p className="eyebrow text-muted-foreground">Our story</p>
          </Reveal>
          <MaskedLines
            lines={["Cooked slowly,", "served warmly"]}
            className="font-display mt-6 block text-4xl leading-[1.08] md:text-[3.4rem]"
            lineClassName="text-[color:var(--olive)]"
            delay={0.05}
          />
          <Reveal weight="secondary" delay={0.18}>
            <p className="mt-8 max-w-[46ch] text-sm leading-[1.9] text-muted-foreground">
              Minoj began as a single room with six tables and one oven. Three
              decades later the oven is the same. Pasta is rolled each morning,
              sauces simmer until afternoon, and the dining room fills the moment
              the light turns amber.
            </p>
          </Reveal>
          <Reveal weight="secondary" delay={0.3}>
            <dl className="mt-12 grid grid-cols-2 gap-8 border-t border-border pt-8">
              {[
                ["1998", "First room in Trastevere"],
                ["6", "Pasta shapes made daily"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-display text-4xl text-[color:var(--ember)]">{k}</dt>
                  <dd className="mt-2 text-xs leading-relaxed text-muted-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="md:col-span-7">
          <div className="grid grid-cols-2 gap-5">
            <motion.div style={{ y: driftA }}>
              <MaskedImage
                src={interiorImg}
                alt="Warm dining room of Minoj at dusk"
                className="aspect-[3/4] w-full"
                width={1200}
                height={1500}
              />
            </motion.div>
            <motion.div style={{ y: driftB }} className="mt-14">
              <MaskedImage
                src={pastaImg}
                alt="Chef dusting flour over handmade dough"
                className="aspect-[3/4] w-full"
                width={1200}
                height={1500}
                delay={0.12}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
