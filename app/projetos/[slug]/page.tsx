import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { PageChrome } from "@/components/PageChrome";
import { caseStudies } from "@/data/caseStudies";
import { company } from "@/data/company";
import {
  buildProjectWhatsAppMessage,
  createWhatsAppUrl
} from "@/lib/whatsappFormatter";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = caseStudies.find((item) => item.slug === slug);
  if (!project) return {};

  const canonical = `/projetos/${project.slug}`;
  const title = `${project.title} — Projeto solar em ${project.location}`;

  return {
    title,
    description: project.summary,
    alternates: { canonical },
    openGraph: {
      title,
      description: project.summary,
      url: canonical,
      images: [{ url: project.image, alt: `${project.title} em ${project.location}` }]
    }
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = caseStudies.find((item) => item.slug === slug);
  if (!project) notFound();

  const canonical = `${company.siteUrl}/projetos/${project.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project.title,
    description: project.summary,
    image: `${company.siteUrl}${project.image}`,
    mainEntityOfPage: canonical,
    author: { "@type": "Organization", name: company.name }
  };

  return (
    <PageChrome>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
      <article className="bg-[#00245f] pb-20 pt-32 text-white sm:pt-36">
        <Container>
          <Link
            href="/#projetos"
            className="inline-flex items-center gap-2 text-sm font-bold text-solar-green"
          >
            <ArrowLeft aria-hidden className="h-4 w-4" />
            Voltar para projetos
          </Link>

          <header className="mt-10 grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-solar-green">
                Estudo de caso · {project.category}
              </p>
              <h1 className="mt-5 text-4xl font-black leading-[1.02] tracking-[-0.05em] sm:text-6xl">
                {project.title}
              </h1>
              <p className="mt-5 flex items-center gap-2 text-sm font-bold text-gray-dark/65">
                <MapPin aria-hidden className="h-4 w-4 text-solar-green" />
                {project.location}
              </p>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-gray-dark/75 lg:justify-self-end">
              {project.summary}
            </p>
          </header>

          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[30px] border border-white/10">
            <Image
              src={project.image}
              alt={`${project.title} realizado pela Solar Energy em ${project.location}`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: project.objectPosition }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00245f]/65 via-transparent to-transparent" />
            <span className="absolute bottom-5 left-5 rounded-full bg-solar-green px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-navy">
              {project.status}
            </span>
          </div>

          <div className="mt-6 grid overflow-hidden rounded-[26px] border border-white/10 bg-[#00346f] sm:grid-cols-3 sm:divide-x sm:divide-white/10">
            <ProjectFact label="Potência" value={project.power} />
            <ProjectFact label={project.savings.includes("%") ? "Economia" : "Performance"} value={project.savings} />
            <ProjectFact label="Localização" value={project.location} />
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-solar-green">
                Aplicação
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.04em]">
                Engenharia compatível com o perfil do projeto.
              </h2>
              <p className="mt-5 text-base leading-8 text-gray-dark/70">
                {project.description}
              </p>
            </div>
            <div className="rounded-[28px] bg-[#00346f] p-7 sm:p-9">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-solar-green">
                Escopo apresentado
              </p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {project.scope.map((item) => (
                  <li key={item} className="flex items-start gap-3 font-bold leading-6">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-solar-green text-navy">
                      <Check aria-hidden className="h-3 w-3 stroke-[3]" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-16 rounded-[28px] bg-solar-green p-7 text-navy sm:p-10">
            <h2 className="max-w-3xl text-3xl font-black tracking-[-0.04em] sm:text-4xl">
              Quer avaliar um projeto semelhante para seu imóvel ou operação?
            </h2>
            <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-[#36502e]">
              Envie sua conta e o perfil do local para uma análise inicial da Solar Energy.
            </p>
            <Button
              href={createWhatsAppUrl(buildProjectWhatsAppMessage(project.title))}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
              className="mt-6 border-navy bg-navy"
              icon={<Phone aria-hidden className="h-4 w-4" />}
            >
              Solicitar projeto semelhante
            </Button>
          </div>
        </Container>
      </article>
    </PageChrome>
  );
}

function ProjectFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-6 sm:p-7">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-gray-dark/45">
        {label}
      </p>
      <p className="mt-2 text-xl font-black text-white">{value}</p>
    </div>
  );
}
