export type LMGT3Car = {
  slug: string | null;
  marca: string;
  modelo: string;
  equipe: string;
  origem: string;
  numeros: string[];
  badge?: string;
  destaque: string;
};

export const lmgt3Cars: LMGT3Car[] = [
  {
    slug: "porsche-911-gt3r",
    marca: "Porsche",
    modelo: "911 GT3 R",
    equipe: "Manthey",
    origem: "🇩🇪 Alemanha",
    numeros: ["#91", "#92"],
    badge: "Referência GT",
    destaque:
      "A operação Manthey é praticamente sinônimo de 911 GT3 R desde os anos 2000. O nove-onze é a referência absoluta dos GTs no endurance — chassi traseiro, flat-six aspirado, lenda viva.",
  },
  {
    slug: "ferrari-296-gt3",
    marca: "Ferrari",
    modelo: "296 GT3 Evo",
    equipe: "Vista AF Corse",
    origem: "🇮🇹 Itália",
    numeros: ["#54", "#55"],
    badge: "Evo 2026",
    destaque:
      "Substituto natural do icônico 488 GT3, o 296 GT3 entra na sua versão Evo em 2026 — V6 biturbo de 3 litros derivado do hipercarro de rua, operado pela mesma AF Corse da classe topo.",
  },
  {
    slug: "bmw-m4-gt3",
    marca: "BMW",
    modelo: "M4 GT3 EVO",
    equipe: "Team WRT",
    origem: "🇩🇪 Alemanha",
    numeros: ["#31", "#46"],
    destaque:
      "BMW e WRT renovam as duplas duplas em 2026. O M4 GT3 EVO traz refinamentos aerodinâmicos e mecânicos sobre a base já vencedora — line-ups novos buscando o título de pilotos da classe.",
  },
  {
    slug: "aston-martin-vantage-gt3",
    marca: "Aston Martin",
    modelo: "Vantage AMR LMGT3",
    equipe: "Heart of Racing",
    origem: "🇺🇸 EUA",
    numeros: ["#27", "#777"],
    destaque:
      "Heart of Racing é a operação americana que carrega as cores britânicas no WEC. O Vantage chega ao GT3 totalmente reformulado, com aerodinâmica derivada do Valkyrie da classe Hypercar.",
  },
  {
    slug: "corvette-z06-gt3r",
    marca: "Corvette",
    modelo: "Z06 GT3.R",
    equipe: "TF Sport",
    origem: "🇺🇸 EUA",
    numeros: ["#81", "#82"],
    destaque:
      "O primeiro Corvette com motor central a competir em GT3. V8 5.5L atmosférico de cabeça plana, com TF Sport britânica conduzindo o programa global da Chevrolet.",
  },
  {
    slug: "ford-mustang-gt3",
    marca: "Ford",
    modelo: "Mustang GT3 Evo",
    equipe: "Proton Competition",
    origem: "🇺🇸 EUA",
    numeros: ["#77", "#88"],
    badge: "Evo 2026",
    destaque:
      "A Ford retorna ao endurance global em parceria com a Multimatic e a Proton. O Mustang GT3 Evo refina o pacote estreante de 2024 — Ford Racing assumindo o programa diretamente.",
  },
  {
    slug: "lexus-rcf-gt3",
    marca: "Lexus",
    modelo: "RC F LMGT3",
    equipe: "Akkodis ASP",
    origem: "🇯🇵 Japão",
    numeros: ["#78", "#87"],
    destaque:
      "Único representante japonês na LMGT3, o RC F é operado pela francesa Akkodis ASP — uma das equipes-cliente mais experientes do endurance europeu.",
  },
  {
    slug: "mclaren-720s-gt3",
    marca: "McLaren",
    modelo: "720S GT3 Evo",
    equipe: "United Autosports",
    origem: "🇬🇧 Reino Unido",
    numeros: ["#59", "#95"],
    badge: "Rumo a 2027",
    destaque:
      "United Autosports leva o 720S GT3 enquanto prepara terreno pra McLaren retornar à classe topo Hypercar em 2027. Quem corre LMGT3 hoje pode estar liderando o desenvolvimento de amanhã.",
  },
  {
    slug: "mercedes-amg-gt3",
    marca: "Mercedes-AMG",
    modelo: "AMG GT3",
    equipe: "Iron Lynx",
    origem: "🇮🇹 Itália",
    numeros: ["#61", "#79"],
    badge: "Estreante 2026",
    destaque:
      "A italiana Iron Lynx muda de marca para 2026 e leva a estrela tridente da Mercedes-AMG ao WEC. Operação experiente que já correu com Lamborghini e Iron Dames — agora com a engenharia de Affalterbach por trás.",
  },
];
