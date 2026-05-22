"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { hypercars, type Hypercar } from "../data/hypercars";
import { asset } from "../lib/asset";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ---------- Featured (Ferrari, primeiro do array) ---------- */
function FeaturedCar({ car }: { car: Hypercar }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
      className="relative group overflow-hidden aspect-[16/10] md:aspect-[21/9] bg-graphite"
    >
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src={asset(`/cars/hypercar/${car.slug}.jpg`)}
          alt={`${car.marca} ${car.modelo}`}
          fill
          sizes="100vw"
          loading="eager"
          quality={95}
          className="object-cover object-center"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-night via-night/60 to-night/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-transparent to-transparent" />

      <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-12 lg:p-16 max-w-3xl">
        {car.badge && (
          <div className="inline-flex self-start text-[10px] uppercase tracking-[0.25em] bg-accent text-night px-3 py-1.5 mb-6">
            {car.badge}
          </div>
        )}
        <div className="text-[10px] uppercase tracking-[0.3em] text-accent mb-3">
          Em destaque · {car.categoria} · estreia {car.estreia}
        </div>
        <h3 className="font-display text-6xl md:text-8xl lg:text-9xl uppercase leading-[0.85]">
          {car.marca}
        </h3>
        <div className="mt-2 text-2xl md:text-3xl text-foreground/80">
          {car.modelo}
        </div>
        <div className="mt-1 text-sm uppercase tracking-[0.2em] text-muted">
          {car.equipe} · {car.numeros.join(" / ")}
        </div>
        <p className="mt-6 text-base md:text-lg text-foreground/75 leading-relaxed">
          {car.destaque}
        </p>
      </div>
    </motion.article>
  );
}

/* ---------- Card no grid ---------- */
function HypercarCard({ car, index }: { car: Hypercar; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const badgeClass =
    car.badge === "Novato 2026"
      ? "bg-heritage text-night"
      : "bg-accent text-night";

  return (
    <motion.article
      ref={ref}
      variants={fadeUp}
      className="group relative w-full sm:w-[calc(50%-8px)] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] aspect-[4/3] overflow-hidden bg-graphite"
    >
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src={asset(`/cars/hypercar/${car.slug}.jpg`)}
          alt={`${car.marca} ${car.modelo}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading={index < 2 ? "eager" : "lazy"}
          quality={90}
          className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
      <div className="absolute inset-0 bg-night/0 group-hover:bg-night/30 transition-colors duration-500" />

      {/* Top badges */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
        {car.badge ? (
          <div
            className={`text-[10px] uppercase tracking-[0.22em] px-2 py-1 ${badgeClass}`}
          >
            {car.badge}
          </div>
        ) : (
          <div className="text-[10px] uppercase tracking-[0.22em] px-2 py-1 border border-graphite text-foreground/70 backdrop-blur-sm">
            {car.categoria}
          </div>
        )}
        {car.badge && (
          <div className="text-[10px] uppercase tracking-[0.22em] px-2 py-1 border border-graphite text-foreground/70 backdrop-blur-sm">
            {car.categoria}
          </div>
        )}
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
        <div className="text-[10px] uppercase tracking-[0.25em] text-accent">
          Hypercar · {car.numeros.join(" / ")}
        </div>
        <div className="font-display text-3xl md:text-4xl uppercase mt-2 leading-none">
          {car.marca}
        </div>
        <div className="text-foreground/80 text-sm mt-1">{car.modelo}</div>
        <div className="text-muted text-xs mt-2">{car.equipe}</div>

        {/* Reveal-on-hover */}
        <div className="mt-4 max-h-0 group-hover:max-h-40 opacity-0 group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-out">
          <p className="text-xs text-foreground/70 leading-relaxed">
            {car.destaque}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

/* ---------- Showcase principal ---------- */
export function HypercarsShowcase() {
  const featured = hypercars[0];
  const grid = hypercars.slice(1);

  return (
    <section
      id="hypercar"
      className="relative px-6 md:px-12 lg:px-16 py-32 border-t border-graphite overflow-hidden"
    >
      {/* Header */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.15 } },
        }}
        className="flex items-end justify-between mb-16"
      >
        <div className="max-w-3xl">
          <motion.p
            variants={fadeUp}
            className="text-sm uppercase tracking-[0.3em] text-accent mb-6"
          >
            Classe topo
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.9]"
          >
            Oito marcas.
            <br />
            <span className="text-accent">Um mesmo cap de 500&thinsp;kW.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-xl text-foreground/70 text-base md:text-lg leading-relaxed"
          >
            Cada fabricante escolhe sua filosofia — LMH (livre) ou LMDh
            (padronizado) — mas o BoP garante que todos brigam pela vitória
            absoluta no mesmo asfalto, hora após hora.
          </motion.p>
        </div>
        <motion.span
          variants={fadeUp}
          className="hidden lg:block font-display text-[12rem] leading-none text-accent/10 select-none"
          aria-hidden
        >
          08
        </motion.span>
      </motion.div>

      {/* Featured */}
      <FeaturedCar car={featured} />

      {/* Grid */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
        }}
        className="mt-6 flex flex-wrap justify-center gap-4 md:gap-6"
      >
        {grid.map((car, i) => (
          <HypercarCard key={car.slug} car={car} index={i} />
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-12 text-xs text-muted max-w-2xl"
      >
        Passe o mouse sobre cada carro para ler o destaque editorial.
        Categorias <span className="text-foreground/80">LMH</span> (Le Mans
        Hypercar) e <span className="text-foreground/80">LMDh</span> (Le Mans
        Daytona h) competem na mesma classe sob BoP harmonizado.
      </motion.p>
    </section>
  );
}
