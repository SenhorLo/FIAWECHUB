"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { lmgt3Cars, type LMGT3Car } from "../data/lmgt3";
import { asset } from "../lib/asset";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

function LMGT3Card({ car, index }: { car: LMGT3Car; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const hasPhoto = car.slug !== null;

  return (
    <motion.article
      ref={ref}
      variants={fadeUp}
      className="group relative aspect-[4/3] overflow-hidden bg-graphite"
    >
      {hasPhoto ? (
        <motion.div className="absolute inset-0" style={{ y }}>
          <Image
            src={asset(`/cars/lmgt3/${car.slug}.jpg`)}
            alt={`${car.marca} ${car.modelo}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading={index < 3 ? "eager" : "lazy"}
            quality={90}
            className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          />
        </motion.div>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, rgba(255,210,0,0.08), transparent 60%),
              radial-gradient(circle at 70% 70%, rgba(15,26,61,0.5), transparent 60%),
              linear-gradient(135deg, #1f2330 0%, #0a0a0f 100%)
            `,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <div className="font-display text-7xl md:text-8xl text-foreground/15 leading-none">
                ⌬
              </div>
              <div className="mt-4 text-[10px] uppercase tracking-[0.3em] text-heritage">
                Foto em coleta
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
      <div className="absolute inset-0 bg-night/0 group-hover:bg-night/30 transition-colors duration-500" />

      {/* Top row: badge + origem */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
        {car.badge ? (
          <div
            className={`text-[10px] uppercase tracking-[0.22em] px-2 py-1 ${
              car.badge === "Foto pendente"
                ? "border border-heritage/40 text-heritage/80 backdrop-blur-sm"
                : "bg-heritage text-night"
            }`}
          >
            {car.badge}
          </div>
        ) : (
          <div className="text-[10px] uppercase tracking-[0.22em] px-2 py-1 border border-graphite text-foreground/70 backdrop-blur-sm">
            LMGT3
          </div>
        )}
        <div className="text-[10px] uppercase tracking-[0.18em] text-foreground/70 backdrop-blur-sm px-2 py-1 border border-graphite/60">
          {car.origem}
        </div>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
        <div className="text-[10px] uppercase tracking-[0.25em] text-heritage">
          GT3 · {car.numeros.join(" / ")}
        </div>
        <div className="font-display text-3xl md:text-4xl uppercase mt-2 leading-none">
          {car.marca}
        </div>
        <div className="text-foreground/80 text-sm mt-1">{car.modelo}</div>
        <div className="text-muted text-xs mt-2">{car.equipe}</div>

        {/* Reveal-on-hover */}
        <div className="mt-4 max-h-0 group-hover:max-h-48 opacity-0 group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-out">
          <p className="text-xs text-foreground/70 leading-relaxed">
            {car.destaque}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export function LMGT3Showcase() {
  return (
    <section
      id="lmgt3"
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
            className="text-sm uppercase tracking-[0.3em] text-heritage mb-6"
          >
            Classe GT
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.9]"
          >
            Nove fabricantes.
            <br />
            <span className="text-heritage">Mesmo asfalto, outra batalha.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-xl text-foreground/70 text-base md:text-lg leading-relaxed"
          >
            Os GTs partilham a pista com os Hypercars — convivendo com o tráfego
            é parte do jogo. Tripulações de três pilotos, ao menos um deles
            Bronze: o espírito original do endurance preservado na velocidade
            moderna.
          </motion.p>
        </div>
        <motion.span
          variants={fadeUp}
          className="hidden lg:block font-display text-[12rem] leading-none text-heritage/10 select-none"
          aria-hidden
        >
          09
        </motion.span>
      </motion.div>

      {/* Grid */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1 } },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      >
        {lmgt3Cars.map((car, i) => (
          <LMGT3Card key={`${car.marca}-${car.modelo}`} car={car} index={i} />
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-12 text-xs text-muted max-w-2xl"
      >
        Categorização dos pilotos: <span className="text-foreground/80">Bronze</span> ·{" "}
        <span className="text-foreground/80">Silver</span> ·{" "}
        <span className="text-foreground/80">Gold</span> ·{" "}
        <span className="text-foreground/80">Platinum</span> — definida pela FIA com
        base em histórico, idade e nível profissional. Cada GT3 obriga ao menos um Bronze a bordo.
      </motion.p>
    </section>
  );
}
