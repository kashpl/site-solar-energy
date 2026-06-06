import { FadeIn } from "@/components/animations/FadeIn";
import {
  Activity,
  Building2,
  ClipboardCheck,
  Factory,
  Home,
  SearchCheck
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { solutions } from "@/data/solutions";
import {
  buildSolutionWhatsAppMessage,
  createWhatsAppUrl
} from "@/lib/whatsappFormatter";

const iconMap: Record<string, LucideIcon> = {
  home: Home,
  building: Building2,
  factory: Factory,
  activity: Activity,
  clipboard: ClipboardCheck,
  search: SearchCheck
};

const accents = [
  "from-solar-green/20 via-white/[0.04] to-transparent",
  "from-solar-gold/20 via-white/[0.04] to-transparent",
  "from-solar-blue/30 via-white/[0.04] to-transparent"
];

export function Solutions() {
  return (
    <Section
      id="solucoes"
      eyebrow="Soluções"
      title="Soluções completas em energia solar"
      subtitle="Projetos desenhados para reduzir custos, aumentar previsibilidade e transformar energia limpa em vantagem competitiva."
      className="section-blueprint section-divider-bottom"
    >
      <div aria-hidden className="premium-grid absolute inset-0 opacity-[0.28]" />
      <div className="relative grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {solutions.map((solution, index) => {
          const Icon = iconMap[solution.icon] ?? Home;

          return (
            <FadeIn
              key={solution.title}
              direction="up"
              distance={28}
              amount={0.25}
              duration={0.5}
              delay={index * 0.06}
            >
              <a
                href={createWhatsAppUrl(buildSolutionWhatsAppMessage())}
                target="_blank"
                rel="noreferrer"
                className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-solar-gold"
              >
              <Card className="engineering-card relative h-full overflow-hidden p-6 transition duration-500 after:absolute after:inset-x-6 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-solar-gold/50 after:to-transparent hover:-translate-y-1.5 hover:border-solar-green/60 hover:shadow-glow">
                <div className={`absolute inset-0 bg-gradient-to-br ${accents[index % accents.length]} opacity-80`} />
                <div className="relative mb-6 flex items-center justify-between gap-4">
                  <div className="flex h-[54px] w-[54px] items-center justify-center rounded-lg border border-solar-green/30 bg-navy/45 text-solar-green shadow-[0_16px_44px_rgba(0,208,132,0.12)] transition group-hover:border-solar-gold/40 group-hover:text-solar-gold">
                    <Icon aria-hidden className="h-6 w-6" />
                  </div>
                  <span className="muted-badge rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em] text-gray-dark/75">
                    {solution.tag}
                  </span>
                </div>
                <h3 className="relative text-xl font-black text-white">{solution.title}</h3>
                <p className="relative mt-4 text-sm leading-7 text-gray-dark/80">
                  {solution.description}
                </p>
                <p className="relative mt-6 inline-flex items-center whitespace-nowrap rounded-md border border-solar-green/30 bg-solar-green/10 px-3.5 py-2 text-sm font-bold text-solar-green transition group-hover:bg-solar-green/20 group-hover:text-white">
                  Conversar com especialista
                </p>
              </Card>
              </a>
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
}
