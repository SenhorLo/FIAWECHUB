export type Hypercar = {
  slug: string;
  marca: string;
  modelo: string;
  equipe: string;
  categoria: "LMH" | "LMDh";
  estreia: number;
  numeros: string[];
  badge?: string;
  destaque: string;
};

export const hypercars: Hypercar[] = [
  {
    slug: "ferrari-499p",
    marca: "Ferrari",
    modelo: "499P",
    equipe: "AF Corse",
    categoria: "LMH",
    estreia: 2023,
    numeros: ["#50", "#51"],
    badge: "Campeão 2024",
    destaque:
      "Tricampeão consecutivo das 24h de Le Mans desde seu retorno. O 499P levou a Ferrari de volta ao topo do endurance após meio século de ausência.",
  },
  {
    slug: "toyota-gr010",
    marca: "Toyota",
    modelo: "GR010 Hybrid",
    equipe: "Toyota Gazoo Racing",
    categoria: "LMH",
    estreia: 2021,
    numeros: ["#7", "#8"],
    badge: "Joker 2026",
    destaque:
      "A referência da era Hypercar. Cinco vitórias consecutivas em Le Mans (2018–2022) antes de ceder o trono. Em 2026 recebe atualização homologada (joker).",
  },
  {
    slug: "cadillac-vseriesr",
    marca: "Cadillac",
    modelo: "V-Series.R",
    equipe: "Cadillac Hertz Team Jota",
    categoria: "LMDh",
    estreia: 2023,
    numeros: ["#12", "#38"],
    badge: "Joker 2026",
    destaque:
      "Som de V8 5.5L atmosférico no meio da pista híbrida. Trouxe a Cadillac de volta ao protótipo de topo após décadas, com pódio em Le Mans 2023 e operação 2026 sob o Hertz Team Jota.",
  },
  {
    slug: "bmw-m-hybrid-v8",
    marca: "BMW",
    modelo: "M Hybrid V8",
    equipe: "BMW M Team WRT",
    categoria: "LMDh",
    estreia: 2024,
    numeros: ["#15", "#20"],
    badge: "Joker 2026",
    destaque:
      "BMW M voltou ao endurance global em 2024 com o M Hybrid V8. Parceria com WRT estabilizou o programa rumo à briga pela vitória em 2026.",
  },
  {
    slug: "alpine-a424",
    marca: "Alpine",
    modelo: "A424",
    equipe: "Alpine Endurance Team",
    categoria: "LMDh",
    estreia: 2024,
    numeros: ["#35", "#36"],
    badge: "Joker 2026",
    destaque:
      "Primeiro projeto LMDh da marca francesa. Motor V6 turbo desenvolvido pela Mecachrome, mesma arquitetura que abastece a Alpine na F1.",
  },
  {
    slug: "aston-martin-valkyrie",
    marca: "Aston Martin",
    modelo: "Valkyrie",
    equipe: "Aston Martin Thor Team",
    categoria: "LMH",
    estreia: 2025,
    numeros: ["#007", "#009"],
    destaque:
      "O único Hypercar com motor V12 atmosférico no grid. Derivado direto do hipercarro de rua, é também a homologação mais radical da categoria.",
  },
  {
    slug: "peugeot-9x8",
    marca: "Peugeot",
    modelo: "9X8",
    equipe: "Peugeot TotalEnergies",
    categoria: "LMH",
    estreia: 2022,
    numeros: ["#93", "#94"],
    destaque:
      "Estreou sem asa traseira — uma aposta aerodinâmica radical. Em 2024 ganhou um spoiler convencional, mas mantém a estética futurista do leão.",
  },
  {
    slug: "genesis-gmr-001",
    marca: "Genesis",
    modelo: "GMR-001",
    equipe: "Genesis Magma Racing",
    categoria: "LMDh",
    estreia: 2026,
    numeros: ["#17", "#19"],
    badge: "Novato 2026",
    destaque:
      "A primeira investida coreana no topo do endurance. Construído pela Oreca, lidera com pilotos como Lotterer, Derani, Jaminet e Juncadella.",
  },
];
