"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Countdown } from "./Countdown";
import { asset } from "../lib/asset";

const heroStats = [
  { value: "14", label: "fabricantes" },
  { value: "35", label: "carros" },
  { value: "2", label: "classes" },
  { value: "8", label: "rondas" },
];

const lineVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

function AnimatedLine({ children, className = "" }: { children: string; className?: string }) {
  return (
    <motion.span
      variants={lineVariants}
      className={`block ${className}`}
    >
      {children.split(" ").map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          variants={wordVariants}
          className="inline-block mr-[0.25em]"
        >
          {w}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src={asset("/cars/hypercar/ferrari-499p.jpg")}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
          aria-hidden
        />
      </div>

      {/* Layered gradients */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(ellipse at 70% 30%, rgba(15,26,61,0.35), transparent 60%),
            radial-gradient(ellipse at 20% 80%, rgba(0,210,106,0.12), transparent 55%),
            linear-gradient(180deg, rgba(10,10,15,0.5) 0%, rgba(10,10,15,0.7) 50%, rgba(10,10,15,0.95) 100%)
          `,
        }}
      />

      {/* Subtle grain via radial gradient pattern */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "4px 4px",
        }}
      />

      <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-16 pt-32 pb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs md:text-sm uppercase tracking-[0.35em] text-accent mb-8"
        >
          Temporada 2026 · 14ª edição do mundial
        </motion.p>

        <motion.h1
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
          }}
          initial="hidden"
          animate="show"
          className="font-display text-[clamp(3rem,11vw,10rem)] leading-[0.85] tracking-tight uppercase max-w-[18ch]"
        >
          <AnimatedLine>Catorze marcas.</AnimatedLine>
          <AnimatedLine className="text-accent">Duas classes.</AnimatedLine>
          <AnimatedLine className="text-heritage">Vinte e quatro horas.</AnimatedLine>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-10 max-w-2xl text-base md:text-lg lg:text-xl text-foreground/70 leading-relaxed"
        >
          O Mundial de Endurance reúne os carros mais avançados do automobilismo
          em corridas que atravessam o dia e a noite. Da abertura em Imola ao
          clímax do Bahrein, passando pelo coração do esporte:{" "}
          <span className="text-heritage">as 24 Horas de Le Mans</span>.
        </motion.p>

        <div className="mt-12 flex flex-col lg:flex-row lg:items-end gap-12">
          {/* Stats */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1, delayChildren: 1.4 } },
            }}
            className="grid grid-cols-4 gap-4 md:gap-8 flex-1 max-w-2xl"
          >
            {heroStats.map((s) => (
              <motion.div
                key={s.label}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                className="border-l-2 border-accent/40 pl-3 md:pl-4"
              >
                <div className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground">
                  {s.value}
                </div>
                <div className="mt-1 md:mt-2 text-[10px] md:text-xs uppercase tracking-[0.22em] text-muted">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Countdown */}
          <Countdown />
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-6 left-6 md:left-12 lg:left-16 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-muted"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
        Role para conhecer
      </motion.div>

      {/* Race tag right side */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-6 right-6 md:right-12 lg:right-16 text-right hidden md:block"
      >
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted">Foto em destaque</div>
        <div className="text-sm text-foreground/80 mt-1">Ferrari 499P · 6h Spa-Francorchamps</div>
      </motion.div>
    </section>
  );
}
