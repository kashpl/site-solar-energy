import { FadeIn } from "@/components/animations/FadeIn";
import {
  Gauge,
  Home,
  Leaf,
  Lock,
  ShieldCheck,
  Sun,
  TrendingUp,
  Wallet
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/Section";
import { benefits } from "@/data/benefits";

const iconMap: Record<string, LucideIcon> = {
  wallet: Wallet,
  leaf: Leaf,
  home: Home,
  shield: ShieldCheck,
  trending: TrendingUp,
  lock: Lock,
  gauge: Gauge,
  sun: Sun
};

export function Benefits() {
  return (
    <Section
      id="beneficios"
      eyebrow="Benefícios"
      title="Por que escolher energia solar?"
      subtitle="Energia solar não é só redução de conta: é previsibilidade, valorização patrimonial e uma operação mais preparada para o futuro."
      className="section-deep-panel section-divider-bottom"
      headingAlign="left"
    >
      <div aria-hidden className="solar-cell-texture absolute inset-0 opacity-20" />
      <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit, index) => {
          const Icon = iconMap[benefit.icon] ?? Sun;
          const isGold = index % 3 === 1;

          return (
            <FadeIn
              key={benefit.title}
              direction="up"
              distance={20}
              amount={0.35}
              duration={0.45}
              delay={index * 0.05}
              className="group relative overflow-hidden rounded-lg border border-white/[0.12] bg-white/[0.065] p-5 shadow-[0_18px_54px_rgba(0,0,0,0.2)] backdrop-blur-xl transition duration-300 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-solar-green/45 before:to-transparent hover:-translate-y-1 hover:border-solar-green/50 hover:bg-white/[0.09]"
            >
              <span
                aria-hidden
                className={`absolute right-4 top-4 h-16 w-16 rounded-full ${
                  isGold ? "bg-solar-gold/10" : "bg-solar-green/10"
                } blur-2xl transition group-hover:opacity-90`}
              />
              <div
                className={`relative mb-5 flex h-12 w-12 items-center justify-center rounded-lg border ${
                  isGold
                    ? "border-solar-gold/30 bg-solar-gold/10 text-solar-gold"
                    : "border-solar-green/25 bg-solar-green/10 text-solar-green"
                } transition group-hover:scale-105`}
              >
                <Icon aria-hidden className="h-5 w-5" />
              </div>
              <h3 className="relative text-base font-black leading-6 text-white">{benefit.title}</h3>
              <p className="relative mt-3 text-sm leading-6 text-gray-dark/75">
                {benefit.description}
              </p>
              <div className="relative mt-5 h-px w-16 bg-gradient-to-r from-solar-green via-solar-gold to-transparent opacity-70" />
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
}
