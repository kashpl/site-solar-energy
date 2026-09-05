import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Section } from "@/components/Section";
import { caseStudies } from "@/data/caseStudies";
import {
  buildProjectWhatsAppMessage,
  createWhatsAppUrl
} from "@/lib/whatsappFormatter";

export function Projects() {
  const featured = caseStudies[3];
  const secondary = caseStudies.slice(0, 3);

  return (
    <Section
      id="projetos"
      eyebrow="Portfólio real"
      title="Da geração residencial à escala corporativa."
      subtitle="Projetos executados e em andamento que demonstram capacidade para atender diferentes perfis, potências e objetivos."
      className="bg-[#00245f]"
      headingAlign="left"
    >
      <article className="grid overflow-hidden rounded-[30px] border border-white/10 bg-[#00346f] lg:grid-cols-[1.35fr_0.65fr]">
        <div className="relative min-h-[360px] overflow-hidden sm:min-h-[500px]">
          <Image
            src={featured.image}
            alt={`Projeto ${featured.title} em ${featured.location}`}
            fill
            sizes="(min-width: 1024px) 65vw, 100vw"
            className="object-cover"
            style={{ objectPosition: featured.objectPosition }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00245f]/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#00245f]/20" />
          <span className="absolute left-5 top-5 rounded-full bg-solar-green px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-navy">
            {featured.status}
          </span>
        </div>

        <div className="flex flex-col justify-between p-7 sm:p-9 lg:p-10">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-solar-green">
              Projeto em destaque · {featured.category}
            </p>
            <h3 className="mt-5 text-3xl font-black leading-[1.05] tracking-[-0.045em] text-white sm:text-4xl">
              {featured.title}
            </h3>
            <p className="mt-5 text-base leading-7 text-gray-dark/75">
              {featured.description}
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-2 gap-5 border-y border-white/10 py-6">
              <ProjectValue label="Potência" value={featured.power} />
              <ProjectValue label="Performance" value={featured.savings} />
            </div>
            <p className="mt-6 flex items-start gap-2 text-sm font-semibold leading-6 text-gray-dark/75">
              <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-solar-green" />
              {featured.location}
            </p>
            <ProjectLinks title={featured.title} slug={featured.slug} />
          </div>
        </div>
      </article>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        {secondary.map((project) => (
          <article
            key={project.title}
            className="group overflow-hidden rounded-[26px] border border-white/10 bg-[#00346f]"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={project.image}
                alt={`Projeto ${project.title} em ${project.location}`}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
                style={{ objectPosition: project.objectPosition }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00245f]/55 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-[#00245f]/95 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-white">
                {project.category}
              </span>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-black text-white">{project.title}</h3>
                <span className="shrink-0 text-sm font-black text-solar-green">
                  {project.power}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-dark/70">
                {project.description}
              </p>
              <p className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-gray-dark/60">
                <MapPin aria-hidden className="h-4 w-4 text-solar-green" />
                {project.location}
              </p>
              <ProjectLinks title={project.title} slug={project.slug} />
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function ProjectValue({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-dark/50">
        {label}
      </p>
      <p className="mt-2 text-xl font-black text-white">{value}</p>
    </div>
  );
}

function ProjectLinks({ title, slug }: { title: string; slug: string }) {
  return (
    <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
      <Link
        href={`/projetos/${slug}`}
        className="inline-flex items-center gap-2 text-sm font-extrabold text-white transition hover:gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-solar-green"
      >
        Ver estudo de caso
        <ArrowUpRight aria-hidden className="h-4 w-4" />
      </Link>
      <a
        href={createWhatsAppUrl(buildProjectWhatsAppMessage(title))}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 text-sm font-extrabold text-solar-green transition hover:gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-solar-green"
      >
        Solicitar semelhante
        <ArrowUpRight aria-hidden className="h-4 w-4" />
      </a>
    </div>
  );
}
