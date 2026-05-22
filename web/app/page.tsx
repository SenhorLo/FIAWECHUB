import { HeroSection } from "./components/HeroSection";
import { WhatIsWEC } from "./components/WhatIsWEC";
import { HypercarsShowcase } from "./components/HypercarsShowcase";
import { LMGT3Showcase } from "./components/LMGT3Showcase";
import { CalendarSection } from "./components/CalendarSection";
import { LeMansSection } from "./components/LeMansSection";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />

      <WhatIsWEC />

      <HypercarsShowcase />

      <LMGT3Showcase />

      <CalendarSection />

      <LeMansSection />

      {/* === FOOTER === */}
      <footer className="px-6 md:px-12 lg:px-16 py-16 border-t border-graphite">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="font-display text-lg tracking-[0.25em]">
              FIA·WEC FAN HUB
            </div>
            <div className="text-xs text-muted mt-2 max-w-md">
              Fan site não-oficial · Temporada 2026 · Não afiliado à FIA, ACO
              ou qualquer fabricante representado.
            </div>
          </div>
          <div className="text-xs text-muted max-w-sm">
            Imagens via Wikimedia Commons (Creative Commons). Marcas registradas
            pertencem aos respectivos detentores. Construído por amor ao endurance.
          </div>
        </div>
      </footer>
    </main>
  );
}
