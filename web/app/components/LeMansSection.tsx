"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, type Variants } from "framer-motion";
import { leMansStats, leMansSectors } from "../data/le-mans";
import { asset } from "../lib/asset";
import { useNextRace } from "../lib/useNextRace";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ---------- Dramatic countdown for the next WEC round ---------- */
function FinalCountdown() {
  const { mounted, race, live, parts } = useNextRace();

  const pad = (n: number) => n.toString().padStart(2, "0");
  const cells = [
    { value: pad(parts.days), label: "Dias" },
    { value: pad(parts.hours), label: "Horas" },
    { value: pad(parts.minutes), label: "Minutos" },
    { value: pad(parts.seconds), label: "Segundos" },
  ];

  const eyebrow = !race
    ? "Temporada encerrada"
    : live
    ? "Prova em andamento"
    : "Faltam para a largada";

  const heading = race ? race.name : "Até a temporada 2027";
  const subheading = race
    ? `${race.flag} ${race.country} · ${race.date}`
    : "Novo calendário em breve";

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <div
          className="text-[10px] uppercase tracking-[0.3em] text-heritage mb-4"
          suppressHydrationWarning
        >
          {mounted ? eyebrow : "Próxima etapa"}
        </div>
        <h3
          className="font-display text-4xl md:text-6xl uppercase leading-[0.95]"
          suppressHydrationWarning
        >
          {mounted ? heading : "Próxima etapa"}
        </h3>
        <div
          className="mt-4 text-xs uppercase tracking-[0.3em] text-muted"
          suppressHydrationWarning
        >
          {mounted ? subheading : ""}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-heritage/15"
          suppressHydrationWarning
        >
          {cells.map((c) => (
            <div key={c.label} className="bg-black p-6 md:p-10 text-center">
              <div className="font-display text-6xl md:text-8xl lg:text-9xl text-heritage tabular-nums leading-none">
                {mounted && race ? c.value : "--"}
              </div>
              <div className="mt-3 text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted">
                {c.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-8 text-center text-xs text-muted"
        suppressHydrationWarning
      >
        {mounted && race
          ? live
            ? `${race.name} está acontecendo agora em ${race.track}.`
            : `Largada em ${race.track}, ${race.country}.`
          : "Contagem regressiva para a próxima etapa do Mundial."}
      </motion.p>
    </>
  );
}

/* ---------- Fullscreen map modal ---------- */
function MapModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-10 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-heritage hover:text-foreground transition-colors"
            aria-label="Fechar mapa em tela cheia"
          >
            Fechar
            <span className="inline-flex w-8 h-8 items-center justify-center border border-heritage/40 hover:border-foreground/60 transition-colors">
              ✕
            </span>
          </button>

          <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
            <div className="text-[10px] uppercase tracking-[0.3em] text-heritage">
              Circuit de la Sarthe
            </div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted mt-1">
              Le Mans · 13,626 km · 94ª edição em 2026
            </div>
          </div>

          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset("/tracks/le-mans.svg")}
              alt="Circuit de la Sarthe — tela cheia"
              className="max-w-full max-h-full object-contain"
              style={{
                filter:
                  "invert(1) sepia(1) saturate(6) hue-rotate(0deg) brightness(0.95) drop-shadow(0 0 60px rgba(255,210,0,0.3))",
              }}
            />
          </motion.div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-muted">
            Pressione <kbd className="text-heritage">Esc</kbd> ou clique fora para fechar
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Hero mapa com parallax ---------- */
function MapHero({ onExpand }: { onExpand: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden border-y border-heritage/20 h-screen"
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ y, scale }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/tracks/le-mans.svg")}
          alt="Circuit de la Sarthe — traçado completo"
          className="w-full h-full object-cover"
          style={{
            filter:
              "invert(1) sepia(1) saturate(6) hue-rotate(0deg) brightness(0.95) drop-shadow(0 0 60px rgba(255,210,0,0.25))",
          }}
        />
      </motion.div>

      {/* Vignette pra suavizar bordas e dar profundidade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* Top-left annotation */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 flex flex-col gap-1 z-10">
        <div className="text-[10px] uppercase tracking-[0.3em] text-heritage">
          Circuit de la Sarthe
        </div>
        <div className="text-[10px] uppercase tracking-[0.25em] text-muted">
          Le Mans · França · 13,626 km
        </div>
      </div>

      {/* Expand button — top-right */}
      <button
        type="button"
        onClick={onExpand}
        className="absolute top-6 right-6 md:top-8 md:right-8 z-10 group flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-heritage hover:text-foreground transition-colors"
        aria-label="Expandir mapa em tela cheia"
      >
        Expandir mapa
        <span className="inline-flex w-10 h-10 items-center justify-center border border-heritage/40 group-hover:border-heritage transition-colors">
          ⤢
        </span>
      </button>

      {/* Bottom-right race info */}
      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 text-right z-10">
        <div className="text-[10px] uppercase tracking-[0.3em] text-heritage">
          Largada
        </div>
        <div className="font-display text-2xl md:text-4xl text-foreground">
          15:00 CEST
        </div>
        <div className="text-[10px] uppercase tracking-[0.25em] text-muted mt-1">
          Sábado, 13 jun 2026
        </div>
      </div>

      {/* Bottom-left scroll hint */}
      <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-10 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted">
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
        Continue
      </div>
    </div>
  );
}

export function LeMansSection() {
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <section
      id="lemans"
      className="relative border-t border-heritage/20 bg-black overflow-hidden"
    >
      {/* Layered ambient lighting */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%, rgba(255,210,0,0.06), transparent 50%),
            radial-gradient(ellipse at 20% 100%, rgba(15,26,61,0.4), transparent 60%)
          `,
        }}
      />

      {/* ============ OPENING ============ */}
      <div className="relative px-6 md:px-12 lg:px-16 pt-32 pb-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
          className="max-w-5xl"
        >
          <motion.p
            variants={fadeUp}
            className="text-sm uppercase tracking-[0.35em] text-heritage mb-6"
          >
            A Coroa
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-6xl md:text-8xl lg:text-9xl uppercase leading-[0.85]"
          >
            Vinte e quatro horas
            <br />
            <span className="text-heritage">contra o relógio.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-10 max-w-2xl text-foreground/70 text-base md:text-lg leading-relaxed"
          >
            Desde 1923, o Automobile Club de l&apos;Ouest organiza a corrida
            mais importante do automobilismo. Quase um século depois, o desafio
            permanece o mesmo: percorrer a maior distância possível em uma
            única volta do relógio, atravessando o crepúsculo, a madrugada e o
            amanhecer sobre as estradas da Sarthe.
          </motion.p>
        </motion.div>
      </div>

      {/* ============ MAP HERO ============ */}
      <MapHero onExpand={() => setMapOpen(true)} />
      <MapModal open={mapOpen} onClose={() => setMapOpen(false)} />

      {/* ============ SECTORS ============ */}
      <div className="relative px-6 md:px-12 lg:px-16 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 max-w-3xl"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-heritage mb-4">
            Anatomia do circuito
          </p>
          <h3 className="font-display text-3xl md:text-5xl uppercase leading-[0.95]">
            Seis pontos onde a corrida é decidida.
          </h3>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-heritage/15"
        >
          {leMansSectors.map((sector, i) => (
            <motion.div
              key={sector.name}
              variants={fadeUp}
              className="bg-black p-6 md:p-8 group hover:bg-graphite/30 transition-colors duration-500"
            >
              <div className="font-display text-5xl text-heritage/30 mb-3 leading-none">
                {(i + 1).toString().padStart(2, "0")}
              </div>
              <div className="font-display text-2xl uppercase leading-tight text-foreground">
                {sector.name}
              </div>
              <p className="mt-4 text-sm text-foreground/70 leading-relaxed">
                {sector.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ============ STATS ============ */}
      <div className="relative px-6 md:px-12 lg:px-16 py-24 border-t border-heritage/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 max-w-3xl"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-heritage mb-4">
            Em números
          </p>
          <h3 className="font-display text-3xl md:text-5xl uppercase leading-[0.95]">
            A escala da prova.
          </h3>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
        >
          {leMansStats.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              className="border-l-2 border-heritage/40 pl-4 md:pl-6"
            >
              <div className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground leading-none tabular-nums">
                {s.value}
              </div>
              <div className="mt-3 text-xs uppercase tracking-[0.22em] text-heritage">
                {s.label}
              </div>
              <div className="mt-2 text-xs text-muted leading-relaxed">
                {s.note}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ============ PULL QUOTE ============ */}
      <div className="relative px-6 md:px-12 lg:px-16 py-32 border-t border-heritage/10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto text-center"
        >
          <div className="text-heritage text-6xl md:text-7xl font-display leading-none mb-8">
            &ldquo;
          </div>
          <p className="font-display text-3xl md:text-5xl lg:text-6xl uppercase leading-[1.05]">
            Você não vence as 24 Horas. Você <span className="text-heritage">sobrevive</span> a elas
            e descobre que o relógio decidiu te coroar.
          </p>
          <p className="mt-8 text-xs uppercase tracking-[0.3em] text-muted">
            Sabedoria não atribuída · folclore da paddock
          </p>
        </motion.div>
      </div>

      {/* ============ FINAL COUNTDOWN ============ */}
      <div className="relative px-6 md:px-12 lg:px-16 py-24 border-t border-heritage/10">
        <FinalCountdown />
      </div>
    </section>
  );
}
