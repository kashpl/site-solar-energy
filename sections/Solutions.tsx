import {
  Activity,
  ArrowUpRight,
  Building2,
  ClipboardCheck,
  Factory,
  Home,
  SearchCheck
} from "lucide-react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/Section";
import { solutions } from "@/data/solutions";

const iconMap: Record<string, LucideIcon> = {
  home: Home,
  building: Building2,
  factory: Factory,
  activity: Activity,
  clipboard: ClipboardCheck,
  search: SearchCheck
};

export function Solutions() {
  const primarySolutions = solutions.slice(0, 3);
  const technicalServices = solutions.slice(3);
  const primaryHrefs = [
    "/solucoes/energia-solar-residencial-fortaleza",
    "/solucoes/energia-solar-empresarial-ceara",
    "/solucoes/usinas-solares-nordeste"
  ];
  const technicalHrefs = [
    "/solucoes/manutencao-sistema-fotovoltaico",
    "/guias/homologacao-energia-solar",
    "/#contato"
  ];

  return (
    <Section
      id="solucoes"
      eyebrow="Soluções por perfil"
      title="Engenharia solar para diferentes escalas de consumo."
      subtitle="A mesma disciplina técnica aplicada a residências, empresas e projetos de grande porte — do estudo inicial à operação."
      className="bg-[#f4f6f0]"
      headingAlign="left"
      tone="light"
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {primarySolutions.map((solution, index) => {
          const Icon = iconMap[solution.icon] ?? Home;

          return (
            <article
              key={solution.title}
              className="group flex min-h-[360px] flex-col rounded-[28px] bg-[#0a2732] p-7 text-white transition duration-300 hover:-translate-y-1 hover:bg-[#0d303d] sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-solar-green">
                  {String(index + 1).padStart(2, "0")} / {solution.tag}
                </span>
                <Icon aria-hidden className="h-7 w-7 text-solar-green" />
              </div>
              <div className="mt-auto pt-16">
                <h3 className="max-w-xs text-3xl font-black leading-[1.05] tracking-[-0.045em]">
                  {solution.title}
                </h3>
                <p className="mt-5 text-sm leading-7 text-gray-dark/75">
                  {solution.description}
                </p>
                <Link
                  href={primaryHrefs[index]}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-solar-green outline-none transition hover:gap-3 focus-visible:ring-2 focus-visible:ring-solar-green"
                >
                  Conhecer esta solução
                  <ArrowUpRight aria-hidden className="h-4 w-4" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-5 grid overflow-hidden rounded-[28px] border border-[#d8ded3] bg-white md:grid-cols-3 md:divide-x md:divide-[#d8ded3]">
        {technicalServices.map((service, index) => {
          const Icon = iconMap[service.icon] ?? Activity;

          return (
            <div
              key={service.title}
              className="border-b border-[#d8ded3] p-6 last:border-b-0 md:border-b-0 sm:p-7"
            >
              <Icon aria-hidden className="h-6 w-6 text-[#4d7c0f]" />
              <h3 className="mt-5 text-lg font-black text-[#071a22]">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#617078]">{service.description}</p>
              <Link
                href={technicalHrefs[index]}
                className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#4d7c0f]"
              >
                Saiba mais
                <ArrowUpRight aria-hidden className="h-4 w-4" />
              </Link>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
