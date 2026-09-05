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
    text: "Leitura da conta e definição do cenário com melhor potencial de economia."
  },
  {
    icon: BadgeCheck,
    title: "Projeto personalizado",
    text: "Dimensionamento compatível com imóvel, consumo e objetivo financeiro."
  },
  {
    icon: FileCheck2,
    title: "Homologação",
    text: "Condução da documentação e aprovação junto à concessionária."
  },
  {
    icon: Wrench,
    title: "Instalação",
    text: "Execução profissional com segurança e atenção aos detalhes técnicos."
  },
  {
    icon: PlugZap,
    title: "Geração e suporte",
    text: "Ativação, acompanhamento e orientação para preservar a performance."
  }
];

export function HowItWorks() {
  return (
    <Section
      id="como-funciona"
      eyebrow="Processo integrado"
      title="Uma jornada clara, sem etapas soltas."
      subtitle="A Solar Energy coordena todo o projeto para que você tenha um ponto de contato e visibilidade do início à geração."
      className="bg-[#f4f6f0]"
      headingAlign="left"
      tone="light"
      compact
    >
      <div className="grid border-y border-[#d8ded3] md:grid-cols-2 lg:grid-cols-5 lg:divide-x lg:divide-[#d8ded3]">
        {steps.map((step, index) => (
          <article
            key={step.title}
            className="border-b border-[#d8ded3] py-7 md:px-5 md:odd:border-r md:odd:pr-7 md:even:pl-7 lg:border-b-0 lg:border-r-0 lg:px-6 lg:first:pl-0 lg:last:pr-0"
          >
            <div className="flex items-center justify-between gap-4">
              <step.icon aria-hidden className="h-6 w-6 text-[#4d7c0f]" />
              <span className="text-xs font-black tracking-[0.14em] text-[#9aa59f]">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-8 text-lg font-black text-[#071a22]">{step.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[#617078]">{step.text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
