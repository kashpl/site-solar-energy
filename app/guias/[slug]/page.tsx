import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, BookOpenCheck, ExternalLink } from "lucide-react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { PageChrome } from "@/components/PageChrome";
import { company } from "@/data/company";
import { guidePages } from "@/data/seoContent";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guidePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = guidePages.find((item) => item.slug === slug);
  if (!page) return {};

  const canonical = `/guias/${page.slug}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonical,
      type: "article"
    }
  };
}

export default async function GuideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const page = guidePages.find((item) => item.slug === slug);
  if (!page) notFound();

  const canonical = `${company.siteUrl}/guias/${page.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.description,
    mainEntityOfPage: canonical,
    author: { "@type": "Organization", name: company.name },
    publisher: {
      "@type": "Organization",
      name: company.name,
      logo: { "@type": "ImageObject", url: `${company.siteUrl}/brand-mark.svg` }
    }
  };

  return (
    <PageChrome>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
      <article className="bg-[#f5f7fa] pb-20 pt-32 text-[#001a4d] sm:pt-36">
        <Container className="max-w-5xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#00735c]"
          >
            <ArrowLeft aria-hidden className="h-4 w-4" />
            Voltar para o site
          </Link>

          <header className="mt-10 border-b border-[#d8e1ec] pb-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-solar-green text-navy">
              <BookOpenCheck aria-hidden className="h-6 w-6" />
            </div>
            <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-[#00735c]">
              Guia Solar Energy
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.04] tracking-[-0.05em] sm:text-6xl">
              {page.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#4b5f75]">
              {page.introduction}
            </p>
          </header>

          <div className="mt-12 grid gap-12">
            {page.sections.map((section, index) => (
              <section key={section.title} aria-labelledby={`guide-section-${index}`}>
                <p className="text-xs font-black tracking-[0.14em] text-[#87938d]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2
                  id={`guide-section-${index}`}
                  className="mt-3 text-2xl font-black tracking-[-0.03em] sm:text-3xl"
                >
                  {section.title}
                </h2>
                <div className="mt-5 grid gap-4 text-base leading-8 text-[#4b5f75]">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.bullets ? (
                  <ul className="mt-6 grid gap-3 rounded-[24px] border border-[#d8e1ec] bg-white p-6 sm:grid-cols-2">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm font-semibold leading-6 text-[#33474f]">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#5d8f16]" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          {page.slug === "como-funciona-energia-solar" ||
          page.slug === "homologacao-energia-solar" ? (
            <aside className="mt-12 rounded-[24px] bg-[#00245f] p-6 text-white sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-solar-green">
                Fonte regulatória
              </p>
              <p className="mt-3 text-sm leading-7 text-gray-dark/70">
                Regras de conexão e compensação podem mudar. Consulte a referência oficial
                atualizada da Agência Nacional de Energia Elétrica.
              </p>
              <a
                href="https://www.gov.br/aneel/pt-br/assuntos/geracao-distribuida/"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-black text-solar-green"
              >
                Micro e Minigeração Distribuída — ANEEL
                <ExternalLink aria-hidden className="h-4 w-4" />
              </a>
            </aside>
          ) : null}

          <div className="mt-12 rounded-[28px] bg-solar-green p-7 sm:p-9">
            <h2 className="text-2xl font-black tracking-[-0.03em]">
              Quer aplicar esta análise ao seu consumo?
            </h2>
            <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-[#36502e]">
              Use o simulador como referência e depois confirme o cenário com a equipe
              técnica da Solar Energy.
            </p>
            <Button href="/#simulador" variant="secondary" className="mt-6 border-navy bg-navy" showArrow>
              Fazer simulação
            </Button>
          </div>

          <Link
            href="/#contato"
            className="mt-8 inline-flex items-center gap-2 text-sm font-black text-[#00735c]"
          >
            Solicitar análise técnica
            <ArrowUpRight aria-hidden className="h-4 w-4" />
          </Link>
        </Container>
      </article>
    </PageChrome>
  );
}
