import Image from "next/image";
import { ClipboardCheck, HardHat, Route, ShieldCheck } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Card } from "@/components/Card";
import { Section } from "@/components/Section";

const differentials = [
  {
    icon: HardHat,
    title: "Engenharia especializada",
    text: "Dimensionamento com critérios técnicos para eficiência, segurança elétrica e vida útil do sistema."
  },
  {
    icon: Route,
    title: "Projeto personalizado",
    text: "Cada solução considera consumo, espaço disponível, perfil do imóvel e meta real de economia."
  },
  {
    icon: ClipboardCheck,
    title: "Acompanhamento completo",
    text: "Do estudo inicial à homologação, instalação e suporte pós-entrega, sem etapas soltas."
  }
];

export function About() {
  return (
    <Section
      id="sobre"
      eyebrow="Institucional"
      title="Sobre a Solar Energy"
      className="section-trust section-divider-bottom"
      headingAlign="left"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_18%,rgba(0,208,132,0.10),transparent_30%),radial-gradient(circle_at_90%_70%,rgba(255,215,0,0.10),transparent_32%)]" />

      <div className="relative grid items-center gap-8 lg:grid-cols-[0.94fr_1.06fr] xl:gap-10">
        <FadeIn direction="right" duration={0.65}>
          <div className="rounded-lg border border-white/[0.12] bg-white/[0.07] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:p-8">
            <p className="text-lg leading-8 text-gray-dark">
              A Solar Energy Qualidade e Eficiência nasceu para transformar a forma como
              pessoas e empresas consomem energia, unindo engenharia, atendimento próximo
              e execução segura em projetos fotovoltaicos.
            </p>
            <p className="mt-5 text-lg leading-8 text-gray-dark/80">
              Nosso compromisso é entregar energia limpa com clareza técnica, projeto
              personalizado e resultado financeiro real para cada cliente.
            </p>
          </div>

          <div className="mt-6 grid gap-4">
            {differentials.map((item, index) => (
              <FadeIn
                key={item.title}
                direction="up"
                distance={18}
                amount={0.45}
                duration={0.45}
                delay={index * 0.08}
              >
                <Card className="flex gap-4 p-5 transition duration-300 hover:-translate-y-1 hover:border-solar-gold/50">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-solar-green/25 bg-solar-green/10 text-solar-green">
                    <item.icon aria-hidden className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-gray-dark/75">{item.text}</p>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </FadeIn>

        <FadeIn
          direction="left"
          duration={0.65}
          className="relative"
        >
          <div className="absolute -inset-3 rounded-lg bg-gold-green opacity-20 blur-2xl" />
          <div className="relative overflow-hidden rounded-lg border border-white/[0.16] bg-white/[0.05] p-2 shadow-[0_28px_90px_rgba(0,0,0,0.32)]">
            <Image
              src="/images/optimized/639311282FIMI0026 (3).webp"
              alt="Equipe técnica da Solar Energy em campo"
              width={4000}
              height={3000}
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="aspect-[4/3] w-full rounded-md object-cover brightness-[1.28] contrast-[1.04] saturate-[1.1]"
            />
            <div className="absolute inset-2 rounded-md bg-gradient-to-t from-navy/[0.44] via-navy/[0.04] to-transparent" />
            <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-solar-green/25 bg-navy/[0.52] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.12em] text-solar-green backdrop-blur-xl">
              <ShieldCheck aria-hidden className="h-4 w-4" />
              Segurança técnica
            </div>
            <div className="absolute bottom-6 left-6 right-6 rounded-lg border border-white/[0.14] bg-navy/[0.58] p-4 backdrop-blur-xl">
              <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-solar-green">
                Equipe técnica em campo
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-dark/[0.88]">
                Instalação com acompanhamento, segurança operacional e atenção ao detalhe
                em cada etapa.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
