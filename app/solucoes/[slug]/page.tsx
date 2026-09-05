import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, Phone } from "lucide-react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { PageChrome } from "@/components/PageChrome";
import { company } from "@/data/company";
import { servicePages } from "@/data/seoContent";
import {
  buildSolutionWhatsAppMessage,
  createWhatsAppUrl
} from "@/lib/whatsappFormatter";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return servicePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = servicePages.find((item) => item.slug === slug);
  if (!page) return {};

  const canonical = `/solucoes/${page.slug}`;

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonical,
      images: [{ url: page.image, alt: page.imageAlt }]
    }
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const page = servicePages.find((item) => item.slug === slug);
  if (!page) notFound();

  const canonical = `${company.siteUrl}/solucoes/${page.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: page.title,
        description: page.description,
        url: canonical,
        areaServed: ["Ceará", "Nordeste"],
        provider: {
          "@type": "LocalBusiness",
          "@id": `${company.siteUrl}/#empresa`,
          name: company.name
        }
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer }
        }))
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: company.siteUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Soluções",
            item: `${company.siteUrl}/#solucoes`
          },
          { "@type": "ListItem", position: 3, name: page.title, item: canonical }
        ]
      }
    ]
  };

  return (
    <PageChrome>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />

      <section className="bg-[#00245f] pb-16 pt-32 text-white sm:pb-20 sm:pt-36">
        <Container>
          <Link
            href="/#solucoes"
            className="inline-flex items-center gap-2 text-sm font-bold text-solar-green"
          >
            <ArrowLeft aria-hidden className="h-4 w-4" />
            Voltar para soluções
          </Link>
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-solar-green">
                {page.eyebrow}
              </p>
              <h1 className="mt-5 text-4xl font-black leading-[1.02] tracking-[-0.05em] sm:text-6xl">
                {page.title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-dark/75">{page.introduction}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/#simulador" showArrow>
                  Simular economia
                </Button>
                <Button
                  href={createWhatsAppUrl(buildSolutionWhatsAppMessage())}
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                  icon={<Phone aria-hidden className="h-4 w-4" />}
                >
                  Falar com especialista
                </Button>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[30px] border border-white/10">
              <Image
                src={page.image}
                alt={page.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00245f]/55 to-transparent" />
              <p className="absolute bottom-5 left-5 rounded-full bg-solar-green px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-navy">
                {page.audience}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#f5f7fa] py-16 text-[#001a4d] sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00735c]">
                Benefícios do projeto
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                Resultado começa com um bom dimensionamento.
              </h2>
              <div className="mt-8 grid gap-4">
                {page.benefits.map((benefit) => (
                  <p key={benefit} className="flex items-start gap-3 text-base leading-7 text-[#4b5f75]">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-solar-green text-navy">
                      <Check aria-hidden className="h-3 w-3 stroke-[3]" />
                    </span>
                    {benefit}
                  </p>
                ))}
              </div>
            </div>
            <div className="rounded-[28px] bg-white p-7 sm:p-9">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00735c]">
                Escopo integrado
              </p>
              <ol className="mt-6 divide-y divide-[#e0e7f0]">
                {page.deliverables.map((item, index) => (
                  <li key={item} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                    <span className="text-xs font-black text-[#87938d]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-bold leading-6">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#00245f] py-16 text-white sm:py-20">
        <Container className="max-w-5xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-solar-green">
            Perguntas frequentes
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
            O que avaliar antes de avançar.
          </h2>
          <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {page.faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="cursor-pointer list-none text-lg font-black text-white">
                  {faq.question}
                </summary>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-dark/70">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
          <a
            href={createWhatsAppUrl(buildSolutionWhatsAppMessage())}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm font-black text-solar-green"
          >
            Solicitar análise deste perfil
            <ArrowUpRight aria-hidden className="h-4 w-4" />
          </a>
        </Container>
      </section>
    </PageChrome>
  );
}
