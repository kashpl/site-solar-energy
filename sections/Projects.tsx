import Image from "next/image";
import { FadeIn } from "@/components/animations/FadeIn";
import { BadgeCheck, MapPin, PanelsTopLeft, Sparkles, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { projects } from "@/data/projects";
import {
  buildProjectWhatsAppMessage,
  createWhatsAppUrl
} from "@/lib/whatsappFormatter";

export function Projects() {
  return (
    <Section
      id="projetos"
      eyebrow="Portfólio real"
      title="Projetos realizados"
      subtitle="Instalações reais organizadas para mostrar escala, técnica, economia e capacidade operacional."
      className="section-portfolio section-divider-bottom"
    >
      <div aria-hidden className="premium-grid absolute inset-0 opacity-[0.3]" />

      <div className="relative grid gap-6 lg:grid-cols-2">
        {projects.map((project, index) => {
          const savingsLabel = project.savings.includes("%") ? "Economia" : "Performance";

          return (
            <FadeIn
              key={project.image}
              direction="up"
              distance={28}
              amount={0.2}
              duration={0.58}
              delay={index * 0.07}
            >
              <article
                className="group overflow-hidden rounded-lg border border-white/[0.14] bg-white/[0.065] shadow-[0_26px_90px_rgba(0,0,0,0.3)] backdrop-blur-2xl transition duration-500 hover:-translate-y-1 hover:border-solar-green/[0.55] hover:shadow-glow"
              >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#02143a]">
                <Image
                  src={project.image}
                  alt={`Projeto ${project.title} da Solar Energy em ${project.location}`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105 group-hover:brightness-80"
                  style={{ objectPosition: project.objectPosition }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/[0.94] via-navy/[0.22] to-transparent opacity-90 transition group-hover:opacity-100" />
                <div className="absolute left-4 top-4 rounded-full border border-white/[0.14] bg-navy/[0.62] px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-gray-dark backdrop-blur-xl">
                  {project.category}
                </div>
                <div className="absolute right-4 top-4 rounded-full border border-solar-green/[0.28] bg-solar-green/10 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-solar-green backdrop-blur-xl">
                  {project.status}
                </div>
                <div className="absolute bottom-5 left-5 right-5 translate-y-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="flex items-center gap-2 text-sm font-semibold text-white">
                    <Sparkles aria-hidden className="h-4 w-4 text-solar-gold" />
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-2xl font-black text-white">{project.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-dark/75">
                      {project.description}
                    </p>
                  </div>
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.06] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-solar-gold">
                    <BadgeCheck aria-hidden className="h-4 w-4" />
                    {project.status}
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <ProjectMetric icon={Zap} label="Potência" value={project.power} />
                  <ProjectMetric
                    icon={PanelsTopLeft}
                    label={savingsLabel}
                    value={project.savings}
                  />
                  <ProjectMetric icon={MapPin} label="Localização" value={project.location} />
                </div>

                <Button
                  href={createWhatsAppUrl(buildProjectWhatsAppMessage(project.title))}
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                  showArrow
                  className="mt-5 w-full border-solar-green/25 bg-solar-green/10 px-3 text-solar-green hover:border-solar-green/55 hover:bg-solar-green/20 hover:text-white"
                >
                  Solicitar projeto semelhante
                </Button>
              </div>
              </article>
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
}

function ProjectMetric({
  icon: Icon,
  label,
  value
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-white/[0.12] bg-navy/[0.38] p-3">
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-gray-dark/[0.55]">
        <Icon aria-hidden className="h-4 w-4 text-solar-green" />
        {label}
      </p>
      <p className="mt-2 text-sm font-black text-white">{value}</p>
    </div>
  );
}
