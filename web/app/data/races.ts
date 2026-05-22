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
  },
];
