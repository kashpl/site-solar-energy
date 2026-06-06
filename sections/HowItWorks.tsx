import { FadeIn } from "@/components/animations/FadeIn";
import {
  BadgeCheck,
  ClipboardList,
  FileCheck2,
  PlugZap,
  Wrench
} from "lucide-react";
import { Section } from "@/components/Section";

const steps = [
  {
    icon: ClipboardList,
    title: "Análise de consumo",
    text: "Avaliamos sua conta e identificamos o melhor cenário de economia."
  },
  {
    icon: BadgeCheck,
    title: "Projeto personalizado",
    text: "Desenvolvemos uma solução sob medida para imóvel, empresa ou operação."
  },
  {
    icon: FileCheck2,
    title: "Homologação",
    text: "Cuidamos da aprovação técnica junto à concessionária."
  },
  {
    icon: Wrench,
    title: "Instalação profissional",
    text: "Executamos a instalação com segurança, qualidade e eficiência."
  },
  {
    icon: PlugZap,
    title: "Geração de energia",
    text: "Seu sistema começa a gerar energia limpa e reduzir custos."
  }
];

export function HowItWorks() {
  return (
    <Section
      id="como-funciona"
      eyebrow="Processo"
      title="Como funciona"
      subtitle="Cinco etapas conectadas para transformar análise técnica em economia real, com acompanhamento claro em todo o caminho."
      className="section-process section-divider-bottom"
      compact
    >
      <div className="relative mx-auto max-w-6xl">
        <svg
          aria-hidden
          className="absolute left-[8%] right-[8%] top-[88px] hidden h-24 w-[84%] lg:block"
          viewBox="0 0 100 105"
          preserveAspectRatio="none"
        >
          <polyline
            points="0,72 25,30 50,72 75,30 100,72"
            fill="none"
            stroke="url(#zigzagGradient)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="0,72 25,30 50,72 75,30 100,72"
            fill="none"
            stroke="rgba(255,255,255,0.16)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.22"
          />
          <defs>
            <linearGradient id="zigzagGradient" x1="0" x2="1" y1="0" y2="0">
              <stop stopColor="#00d084" />
              <stop offset="0.5" stopColor="#ffd700" />
              <stop offset="1" stopColor="#00d084" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute left-6 top-4 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-solar-green via-solar-gold to-solar-green lg:hidden" />

        <div className="relative grid gap-4 lg:grid-cols-5 lg:gap-4">
          {steps.map((step, index) => {
            const isLower = index % 2 === 1;

            return (
              <FadeIn
                key={step.title}
                direction="up"
                distance={22}
                amount={0.32}
                duration={0.5}
                delay={index * 0.06}
              >
                <article
                  className={`relative ml-12 rounded-lg border border-white/[0.12] bg-white/[0.075] p-4 shadow-[0_18px_54px_rgba(0,0,0,0.22)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-solar-green/[0.45] sm:p-5 lg:ml-0 ${
                    isLower ? "lg:mt-12" : "lg:mb-12"
                  }`}
                >
                <span className="absolute -left-[43px] top-6 flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-navy bg-[linear-gradient(135deg,#ffd700,#00d084)] text-xs font-black text-navy shadow-[0_0_24px_rgba(255,215,0,0.24)] lg:hidden">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={`absolute left-1/2 hidden h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-[#061b49] bg-[linear-gradient(135deg,#ffd700,#00d084)] text-xs font-black text-navy shadow-[0_0_24px_rgba(255,215,0,0.24)] lg:flex ${
                    isLower ? "top-[-42px]" : "bottom-[-42px]"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-solar-green/25 bg-solar-green/10 text-solar-green">
                  <step.icon aria-hidden className="h-5 w-5" />
                </div>
                <h3 className="text-base font-black text-white sm:text-lg">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-dark/[0.74]">{step.text}</p>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
