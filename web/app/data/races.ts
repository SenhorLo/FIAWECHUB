export type Race = {
  round: number;
  slug: string;
  name: string;
  track: string;
  country: string;
  flag: string;
  duration: string;
  date: string;
  dateISO: string;
  /**
   * Largada — timestamp completo com fuso horário local da pista.
   * Alvo do cronômetro (dias/horas/min até a largada).
   */
  startISO: string;
  /**
   * Bandeirada — largada + duração da prova, também com fuso local.
   * A etapa só deixa de ser a "próxima" DEPOIS deste instante,
   * então a troca acontece ao fim da corrida, não no início do dia.
   */
  endISO: string;
  isCrown?: boolean;
};

export const races: Race[] = [
  {
    round: 1,
    slug: "imola",
    name: "6 Horas de Imola",
    track: "Autodromo Enzo e Dino Ferrari",
    country: "Itália",
    flag: "🇮🇹",
    duration: "6h",
    date: "19 abr 2026",
    dateISO: "2026-04-19",
    startISO: "2026-04-19T13:00:00+02:00",
    endISO: "2026-04-19T19:00:00+02:00",
  },
  {
    round: 2,
    slug: "spa-francorchamps",
    name: "6 Horas de Spa-Francorchamps",
    track: "Circuit de Spa-Francorchamps",
    country: "Bélgica",
    flag: "🇧🇪",
    duration: "6h",
    date: "9 mai 2026",
    dateISO: "2026-05-09",
    startISO: "2026-05-09T13:00:00+02:00",
    endISO: "2026-05-09T19:00:00+02:00",
  },
  {
    round: 3,
    slug: "le-mans",
    name: "24 Horas de Le Mans",
    track: "Circuit de la Sarthe",
    country: "França",
    flag: "🇫🇷",
    duration: "24h",
    date: "13–14 jun 2026",
    dateISO: "2026-06-13",
    startISO: "2026-06-13T15:00:00+02:00",
    endISO: "2026-06-14T15:00:00+02:00",
    isCrown: true,
  },
  {
    round: 4,
    slug: "interlagos",
    name: "6 Horas de São Paulo",
    track: "Autódromo José Carlos Pace",
    country: "Brasil",
    flag: "🇧🇷",
    duration: "6h",
    date: "12 jul 2026",
    dateISO: "2026-07-12",
    startISO: "2026-07-12T11:30:00-03:00",
    endISO: "2026-07-12T17:30:00-03:00",
  },
  {
    round: 5,
    slug: "cota",
    name: "6 Horas de Austin",
    track: "Circuit of the Americas",
    country: "EUA",
    flag: "🇺🇸",
    duration: "6h",
    date: "a definir",
    dateISO: "2026-09-01",
    startISO: "2026-09-01T13:00:00-05:00",
    endISO: "2026-09-01T19:00:00-05:00",
  },
  {
    round: 6,
    slug: "fuji",
    name: "6 Horas de Fuji",
    track: "Fuji Speedway",
    country: "Japão",
    flag: "🇯🇵",
    duration: "6h",
    date: "27 set 2026",
    dateISO: "2026-09-27",
    startISO: "2026-09-27T11:00:00+09:00",
    endISO: "2026-09-27T17:00:00+09:00",
  },
  {
    round: 7,
    slug: "lusail",
    name: "Qatar 1812 km",
    track: "Lusail International Circuit",
    country: "Catar",
    flag: "🇶🇦",
    duration: "~8h",
    date: "24 out 2026",
    dateISO: "2026-10-24",
    startISO: "2026-10-24T14:00:00+03:00",
    endISO: "2026-10-24T22:00:00+03:00",
  },
  {
    round: 8,
    slug: "bahrain",
    name: "8 Horas do Bahrein",
    track: "Bahrain International Circuit",
    country: "Bahrein",
    flag: "🇧🇭",
    duration: "8h",
    date: "7 nov 2026",
    dateISO: "2026-11-07",
    startISO: "2026-11-07T14:00:00+03:00",
    endISO: "2026-11-07T22:00:00+03:00",
  },
];

/**
 * A "próxima" etapa é a primeira do calendário que ainda NÃO terminou.
 * Como o critério é o horário de bandeirada (endISO), uma corrida em
 * andamento continua sendo a próxima até cruzar a linha — a lista só
 * avança para a etapa seguinte ao fim da atual.
 *
 * Roda 100% no cliente: cada carregamento/tick recalcula com `new Date()`,
 * então o site se atualiza sozinho conforme o tempo passa, sem servidor.
 */
export function getNextRace(now: Date = new Date()): Race | null {
  return races.find((r) => new Date(r.endISO).getTime() > now.getTime()) ?? null;
}

/** Verdadeiro enquanto a etapa está entre a largada e a bandeirada. */
export function isRaceLive(race: Race, now: Date = new Date()): boolean {
  const t = now.getTime();
  return (
    t >= new Date(race.startISO).getTime() &&
    t < new Date(race.endISO).getTime()
  );
}
