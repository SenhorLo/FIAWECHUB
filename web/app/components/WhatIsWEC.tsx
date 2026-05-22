"use client";

import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const classData = {
  hypercar: {
    tag: "Classe topo",
    name: "Hypercar",
    sub: "LMH · LMDh",
    accent: "text-accent",
    border: "border-accent/30",
    bgGlow: "rgba(0,210,106,0.08)",
    intro:
      "Protótipos de última geração desenhados sob duas filosofias — LMH dá liberdade total ao fabricante; LMDh padroniza chassis e híbrido. BoP mantém a competição equilibrada.",
    stats: [
      { value: "500", unit: "kW", label: "Potência (cap)" },
      { value: "1030", unit: "kg", label: "Peso mínimo" },
      { value: "3", unit: "", label: "Pilotos por carro" },
      { value: "8", unit: "", label: "Fabricantes 2026" },
    ],
    features: [
      "Híbrido obrigatório em LMDh, opcional em LMH",
      "Tração traseira (LMDh) ou integral (LMH)",
      "Velocidade máxima ~340 km/h",
      "Briga pela vitória absoluta",
    ],
    brands: ["Ferrari", "Toyota", "Cadillac", "BMW", "Alpine", "Aston Martin", "Peugeot", "Genesis"],
  },
  lmgt3: {
    tag: "Classe GT",
    name: "LMGT3",
    sub: "FIA GT3 spec",
    accent: "text-heritage",
    border: "border-heritage/30",
    bgGlow: "rgba(255,210,0,0.06)",
    intro:
      "GTs derivados de carros de produção, sob o regulamento FIA GT3. Tripulações mistas obrigatórias — pelo menos um piloto Bronze por carro — preservam o espírito gentleman do endurance.",
    stats: [
      { value: "~500", unit: "HP", label: "Potência (BoP)" },
      { value: "~1300", unit: "kg", label: "Peso mínimo" },
      { value: "3", unit: "", label: "Pilotos por carro" },
      { value: "9", unit: "", label: "Fabricantes 2026" },
    ],
    features: [
      "Pelo menos 1 piloto Bronze obrigatório",
      "Sem sistema híbrido",
      "Success ballast (exceto Le Mans)",
      "Vitória de classe, não absoluta",
    ],
    brands: ["Porsche", "Ferrari", "BMW", "Aston Martin", "Corvette", "Ford", "Lexus", "McLaren", "Mercedes-AMG"],
  },
} as const;

function ClassColumn({
  data,
}: {
  data: typeof classData.hypercar | typeof classData.lmgt3;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className={`relative p-8 md:p-10 border ${data.border} bg-night`}
    >
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top, ${data.bgGlow}, transparent 60%)`,
        }}
      />

      <div className={`text-[10px] uppercase tracking-[0.3em] ${data.accent} mb-4`}>
        {data.tag}
      </div>
      <div className="flex items-baseline gap-4 mb-1">
        <h3 className="font-display text-5xl md:text-6xl uppercase leading-none">
          {data.name}
        </h3>
      </div>
      <div className="text-xs uppercase tracking-[0.2em] text-muted mb-8">
        {data.sub}
      </div>

      <p className="text-foreground/75 leading-relaxed text-sm md:text-base">
        {data.intro}
      </p>

      {/* Stats grid */}
      <div className="mt-10 grid grid-cols-2 gap-px bg-graphite">
        {data.stats.map((s) => (
          <div key={s.label} className="bg-night p-5">
            <div className="flex items-baseline gap-1">
              <span className="font-display text-4xl md:text-5xl text-foreground">
                {s.value}
              </span>
              {s.unit && (
                <span className="text-xs uppercase tracking-[0.15em] text-muted">
                  {s.unit}
                </span>
              )}
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Features */}
      <ul className="mt-8 space-y-3">
        {data.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm text-foreground/70">
            <span className={`mt-1.5 w-1 h-1 rounded-full ${data.accent === "text-accent" ? "bg-accent" : "bg-heritage"}`} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* Brands */}
      <div className="mt-10 pt-6 border-t border-graphite">
        <div className="text-[10px] uppercase tracking-[0.25em] text-muted mb-3">
          Fabricantes 2026
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-2 text-xs text-foreground/60">
          {data.brands.map((b, i) => (
            <span key={b}>
              {b}
              {i < data.brands.length - 1 && <span className="text-graphite ml-3">·</span>}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function WhatIsWEC() {
  return (
    <section
      id="what-is-wec"
      className="relative px-6 md:px-12 lg:px-16 py-32 border-t border-graphite overflow-hidden"
    >
      {/* Editorial intro */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.15 } },
        }}
        className="max-w-5xl"
      >
        <motion.p
          variants={fadeUp}
          className="text-sm uppercase tracking-[0.3em] text-accent mb-6"
        >
          O Mundial
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="font-display text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.9] max-w-4xl"
        >
          Duas filosofias.
          <br />
          <span className="text-accent">Uma corrida.</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-10 max-w-2xl text-base md:text-lg text-foreground/70 leading-relaxed"
        >
          O FIA World Endurance Championship é organizado pela{" "}
          <span className="text-foreground">FIA</span> e pelo{" "}
          <span className="text-foreground">ACO</span> — o mesmo clube que
          inventou as 24 Horas de Le Mans em 1923. A grade reúne duas classes
          dividindo a pista ao mesmo tempo, em corridas que duram de 6 a 24
          horas, atravessando dia e noite.
        </motion.p>
      </motion.div>

      {/* Pull quote */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="my-24 max-w-5xl mx-auto text-center"
      >
        <div className="text-heritage text-5xl md:text-6xl font-display leading-none mb-6">
          &ldquo;
        </div>
        <p className="font-display text-3xl md:text-4xl lg:text-5xl uppercase leading-tight max-w-4xl mx-auto">
          A vitória em Le Mans vale mais do que <span className="text-heritage">qualquer outra do ano</span>.
        </p>
        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-muted">
          Tradição compartilhada por toda a paddock
        </p>
      </motion.div>

      {/* Comparison diptych */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.2 } },
        }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
      >
        <ClassColumn data={classData.hypercar} />
        <ClassColumn data={classData.lmgt3} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-12 text-xs text-muted max-w-3xl"
      >
        Valores aproximados — o sistema de <span className="text-foreground/80">Balance of Performance (BoP)</span> ajusta
        peso, potência e energia disponível por corrida pra manter a competição equilibrada entre marcas.
      </motion.p>
    </section>
  );
}
