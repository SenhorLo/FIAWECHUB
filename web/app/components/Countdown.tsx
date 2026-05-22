"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// 24h Le Mans 2026 — sábado 13 de junho, largada 15h CEST (UTC+2)
const TARGET = new Date("2026-06-13T15:00:00+02:00");

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function diff(now: Date): Parts {
  const ms = Math.max(0, TARGET.getTime() - now.getTime());
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

const PAD = (n: number) => n.toString().padStart(2, "0");

export function Countdown() {
  const [mounted, setMounted] = useState(false);
  const [parts, setParts] = useState<Parts>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);
    const update = () => setParts(diff(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const cells = [
    { value: PAD(parts.days), label: "dias" },
    { value: PAD(parts.hours), label: "horas" },
    { value: PAD(parts.minutes), label: "min" },
    { value: PAD(parts.seconds), label: "seg" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.8 }}
      className="border border-graphite bg-night/40 backdrop-blur-md p-5 md:p-6 max-w-xl"
    >
      <div className="flex items-center gap-2 mb-4 text-[10px] uppercase tracking-[0.3em] text-heritage">
        <span className="w-1.5 h-1.5 rounded-full bg-heritage animate-pulse" />
        próxima: 24 horas de Le Mans
      </div>
      <div className="grid grid-cols-4 gap-2 md:gap-4" suppressHydrationWarning>
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
      <div className="mt-4 text-xs text-muted">
        13–14 jun · Circuit de la Sarthe · França
      </div>
    </motion.div>
  );
}
