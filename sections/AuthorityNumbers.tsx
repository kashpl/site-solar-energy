import { BadgeCheck, Factory, Gauge, Leaf, TrendingDown } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Card } from "@/components/Card";
import { Section } from "@/components/Section";

const stats = [
  {
    icon: BadgeCheck,
    value: 500,
    prefix: "+",
    suffix: "",
    title: "Projetos analisados",
    text: "Base técnica para orientar decisões com mais segurança."
  },
  {
    icon: TrendingDown,
    value: 95,
    suffix: "%",
    title: "De economia estimada",
    text: "Potencial de redução de custo conforme perfil de consumo."
  },
  {
    icon: Factory,
    value: 3,
    suffix: "",
    title: "Frentes de atuação",
    text: "Residencial, comercial e industrial com abordagem sob medida."
  },
  {
    icon: Leaf,
    value: 5,
    suffix: "",
    title: "Etapas integradas",
    text: "Da análise à geração, com menos atrito para o cliente."
  },
  {
    icon: Gauge,
    value: 360,
    suffix: "°",
    title: "Acompanhamento técnico",
    text: "Gestão completa para preservar performance e previsibilidade."
  }
];

export function AuthorityNumbers() {
  return (
    <Section
      eyebrow="Credibilidade operacional"
      title="Números que sustentam a decisão"
      subtitle="Indicadores comerciais claros para quem busca economia real, engenharia confiável e uma empresa preparada para executar."
      className="section-solar-soft section-divider-bottom py-[68px]"
      headingAlign="left"
      compact
    >
      <div aria-hidden className="solar-cell-texture absolute inset-0 opacity-25" />
      <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat, index) => (
          <FadeIn
            key={stat.title}
            direction="up"
            distance={24}
            amount={0.35}
            duration={0.55}
            delay={index * 0.08}
          >
            <Card className="group h-full p-5 text-left transition duration-300 after:absolute after:bottom-0 after:left-5 after:h-px after:w-16 after:bg-gradient-to-r after:from-solar-green after:to-solar-gold after:opacity-70 hover:-translate-y-1 hover:border-solar-green/50 hover:shadow-glow">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-solar-gold/25 bg-solar-gold/10 text-solar-gold transition group-hover:border-solar-green/40 group-hover:bg-solar-green/10 group-hover:text-solar-green">
                <stat.icon aria-hidden className="h-6 w-6" />
              </div>
              <p className="text-5xl font-black leading-none text-white">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </p>
              <p className="mt-4 text-sm font-extrabold uppercase leading-5 tracking-[0.08em] text-gray-dark/95">
                {stat.title}
              </p>
              <p className="mt-3 text-sm leading-6 text-gray-dark/[0.68]">{stat.text}</p>
            </Card>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
