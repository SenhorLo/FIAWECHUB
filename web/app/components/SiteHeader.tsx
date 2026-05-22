"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const navLinks = [
  { label: "Hypercar", href: "#hypercar" },
  { label: "LMGT3", href: "#lmgt3" },
  { label: "Calendário", href: "#calendar" },
  { label: "24h Le Mans", href: "#lemans" },
];

export function SiteHeader() {
  const { scrollY } = useScroll();
  const backdrop = useTransform(scrollY, [0, 120], [0, 0.85]);
  const borderOpacity = useTransform(scrollY, [0, 120], [0, 1]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <motion.div
        className="absolute inset-0 bg-night -z-10"
        style={{ opacity: backdrop }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-graphite"
        style={{ opacity: borderOpacity }}
      />

      <div className="flex items-center justify-between px-6 md:px-12 lg:px-16 py-5">
        <a
          href="#top"
          className="font-display text-xl md:text-2xl tracking-[0.25em] text-foreground hover:text-accent transition-colors"
        >
          FIA·WEC
        </a>

        <nav className="hidden md:flex gap-8 lg:gap-12 text-xs uppercase tracking-[0.22em] text-muted">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-foreground transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Fan hub · 2026
        </div>
      </div>
    </motion.header>
  );
}
