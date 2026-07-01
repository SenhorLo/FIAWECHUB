"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { races, getNextRace, type Race } from "../data/races";
import { asset } from "../lib/asset";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

function RaceCard({
  race,
  isNext,
}: {
  race: Race;
  isNext: boolean;
}) {
  const crownStyles = race.isCrown
    ? "border-heritage/40 hover:border-heritage"
    : isNext
    ? "border-accent hover:border-accent"
    : "border-graphite hover:border-foreground/30";

  const eyebrowColor = race.isCrown
    ? "text-heritage"
    : isNext
    ? "text-accent"
    : "text-muted";

  return (
    <motion.article
      variants={fadeUp}
      className={`group relative aspect-[5/6] overflow-hidden border ${crownStyles} bg-night transition-colors duration-500`}
    >
      {/* Track map background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(`/tracks/${race.slug}.svg`)}
          alt=""
          aria-hidden
          className="w-[85%] h-[85%] object-contain opacity-[0.12] group-hover:opacity-[0.22] transition-opacity duration-700"
          style={{
            filter: race.isCrown
              ? "invert(1) sepia(1) saturate(5) hue-rotate(0deg) brightness(0.9)"
              : isNext
              ? "invert(1) sepia(1) saturate(8) hue-rotate(80deg) brightness(0.95)"
              : "invert(1) brightness(0.9)",
          }}
        />
      </div>

      {/* Subtle radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 40%, rgba(10,10,15,0.85) 100%)",
        }}
      />

      {/* "PRÓXIMA" indicator */}
      {isNext && (
        <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-accent">
            Próxima
          </span>
        </div>
      )}

      {/* Crown badge (Le Mans) */}
      {race.isCrown && (
        <div className="absolute top-4 right-4 z-20">
          <span className="text-[10px] uppercase tracking-[0.25em] bg-heritage text-night px-2 py-1">
            Coroa
          </span>
        </div>
      )}

      {/* Round number watermark */}
      <div className="absolute top-4 left-4 z-10">
        <div className="font-display text-xs uppercase tracking-[0.3em] text-muted">
          Ronda
        </div>
        <div
          className={`font-display text-5xl md:text-6xl leading-none mt-1 ${
            race.isCrown
              ? "text-heritage"
              : isNext
              ? "text-accent"
              : "text-foreground/30"
          }`}
        >
          {race.round.toString().padStart(2, "0")}
        </div>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10">
        <div className={`text-[10px] uppercase tracking-[0.28em] ${eyebrowColor} mb-3`}>
          {race.flag} {race.country} · {race.duration}
        </div>
        <h3 className="font-display text-2xl md:text-3xl uppercase leading-[0.95]">
          {race.name}
        </h3>
        <div className="mt-3 text-xs text-foreground/60">{race.track}</div>
        <div className="mt-4 pt-3 border-t border-graphite/60 text-sm tabular-nums text-foreground/80">
          {race.date}
        </div>
      </div>
    </motion.article>
  );
}

export function CalendarSection() {
  const [nextSlug, setNextSlug] = useState<string | null>(null);

  useEffect(() => {
    // Recalcula periodicamente para o card "próxima" avançar sozinho
    // assim que a etapa atual termina, mesmo com a aba aberta.
    const sync = () => setNextSlug(getNextRace()?.slug ?? null);
    sync();
    const id = setInterval(sync, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="calendar"
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
        className="max-w-5xl mb-16"
      >
        <motion.p
          variants={fadeUp}
          className="text-sm uppercase tracking-[0.3em] text-accent mb-6"
        >
          Calendário
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-display text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.9]"
        >
          Oito corridas.
          <br />
          <span className="text-accent">Cinco continentes.</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mt-8 max-w-2xl text-foreground/70 text-base md:text-lg leading-relaxed"
        >
          Da abertura em Imola ao desfecho noturno no Bahrein, o Mundial
          atravessa Europa, América do Sul, América do Norte, Ásia-Pacífico e
          Oriente Médio. Sempre voltando ao centro de tudo: Le Mans.
        </motion.p>
      </motion.div>

      {/* Grid de corridas */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
      >
        {races.map((race) => (
          <RaceCard
            key={race.slug}
            race={race}
            isNext={race.slug === nextSlug}
          />
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-12 text-xs text-muted max-w-2xl"
      >
        Calendário oficial confirmado pela <span className="text-foreground/80">FIA + ACO</span>{" "}
        para a temporada 2026 — datas sujeitas a ajustes pelos organizadores.
        Card &ldquo;próxima&rdquo; calculado dinamicamente conforme a data de acesso.
      </motion.p>
    </section>
  );
}
