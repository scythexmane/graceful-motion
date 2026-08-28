import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { MaskedImage, MaskedLines } from "./motion-primitives";
import ovenImg from "@/assets/oven.jpg";
import aperitivoImg from "@/assets/aperitivo.jpg";
import tableImg from "@/assets/table.jpg";
import interiorImg from "@/assets/interior.jpg";

export function Gallery() {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const up = useTransform(scrollYProgress, [0, 1], ["0px", reduced ? "0px" : "-70px"]);
  const down = useTransform(scrollYProgress, [0, 1], ["0px", reduced ? "0px" : "44px"]);

  return (
    <section id="gallery" ref={ref} className="py-28 md:py-40">
      <div className="mx-auto w-full max-w-[1240px] px-6 md:px-10">
        <MaskedLines
          lines={["Gallery"]}
          className="font-display block text-4xl md:text-[3.4rem]"
          lineClassName="text-[color:var(--olive)]"
        />

        <div className="mt-12 grid gap-5 md:grid-cols-12">
          <motion.div style={{ y: up }} className="md:col-span-7">
            <MaskedImage
              src={ovenImg}
              alt="Wood-fired oven with open flame"
              className="aspect-[7/5] w-full"
              width={1400}
              height={1000}
            />
          </motion.div>
          <motion.div style={{ y: down }} className="md:col-span-5 md:mt-16">
            <MaskedImage
              src={aperitivoImg}
              alt="Aperitivo glasses on a terrace at golden hour"
              className="aspect-[4/5] w-full"
              width={1400}
              height={1000}
              delay={0.1}
            />
          </motion.div>
          <motion.div style={{ y: down }} className="md:col-span-5">
            <MaskedImage
              src={interiorImg}
              alt="Dining room detail"
              className="aspect-[4/5] w-full"
              width={1200}
              height={1500}
              delay={0.05}
            />
          </motion.div>
          <motion.div style={{ y: up }} className="md:col-span-7 md:-mt-10">
            <MaskedImage
              src={tableImg}
              alt="Set table with linen, glassware and olive branch"
              className="aspect-[7/5] w-full"
              width={1400}
              height={1000}
              delay={0.12}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
