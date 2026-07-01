"use client";

import { motion } from "framer-motion";
import { useNextRace } from "../lib/useNextRace";

const PAD = (n: number) => n.toString().padStart(2, "0");

export function Countdown() {
  const { mounted, race, live, parts } = useNextRace();

  const cells = [
    { value: PAD(parts.days), label: "dias" },
    { value: PAD(parts.hours), label: "horas" },
    { value: PAD(parts.minutes), label: "min" },
    { value: PAD(parts.seconds), label: "seg" },
  ];

  const header = !race
    ? "temporada 2026 encerrada"
    : live
    ? `agora: ${race.name}`
    : `próxima: ${race.name}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.8 }}
      className="border border-graphite bg-night/40 backdrop-blur-md p-5 md:p-6 max-w-xl"
    >
      <div className="flex items-center gap-2 mb-4 text-[10px] uppercase tracking-[0.3em] text-heritage">
        <span className="w-1.5 h-1.5 rounded-full bg-heritage animate-pulse" />
        {header}
      </div>

      {race ? (
        <>
          <div
            className="grid grid-cols-4 gap-2 md:gap-4"
            suppressHydrationWarning
          >
            {cells.map((c) => (
              <div key={c.label} className="text-center">
                <div className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground tabular-nums">
                  {mounted ? c.value : "--"}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted">
                  {c.label}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-muted" suppressHydrationWarning>
            {mounted && live
              ? "Em andamento · acompanhe ao vivo"
              : `${race.date} · ${race.track} · ${race.country}`}
          </div>
        </>
      ) : (
        <div className="text-sm text-muted">
          As oito etapas de 2026 já foram disputadas. Aguardando o calendário da
          próxima temporada.
        </div>
      )}
    </motion.div>
  );
}
