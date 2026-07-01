"use client";

import { useEffect, useState } from "react";
import { getNextRace, isRaceLive, type Race } from "../data/races";

export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const ZERO: CountdownParts = { days: 0, hours: 0, minutes: 0, seconds: 0 };

export type NextRaceState = {
  /** false até o primeiro tick no cliente — evita mismatch de hidratação. */
  mounted: boolean;
  /** Próxima etapa que ainda não terminou, ou null se a temporada acabou. */
  race: Race | null;
  /** true enquanto a etapa está acontecendo (largada já foi, bandeirada não). */
  live: boolean;
  /** Tempo restante até a largada da próxima etapa. */
  parts: CountdownParts;
};

/**
 * Recalcula a cada segundo qual é a próxima etapa e quanto falta para a
 * largada. Ao fim de uma corrida, `getNextRace` passa a devolver a etapa
 * seguinte automaticamente — o cronômetro vira para a próxima sozinho.
 */
export function useNextRace(): NextRaceState {
  const [mounted, setMounted] = useState(false);
  const [race, setRace] = useState<Race | null>(null);
  const [live, setLive] = useState(false);
  const [parts, setParts] = useState<CountdownParts>(ZERO);

  useEffect(() => {
    const tick = () => {
      setMounted(true);

      const now = new Date();
      const next = getNextRace(now);
      setRace(next);

      if (!next) {
        setLive(false);
        setParts(ZERO);
        return;
      }

      setLive(isRaceLive(next, now));

      const ms = Math.max(0, new Date(next.startISO).getTime() - now.getTime());
      const s = Math.floor(ms / 1000);
      setParts({
        days: Math.floor(s / 86400),
        hours: Math.floor((s % 86400) / 3600),
        minutes: Math.floor((s % 3600) / 60),
        seconds: s % 60,
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return { mounted, race, live, parts };
}
