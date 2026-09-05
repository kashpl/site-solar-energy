import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  MapPin,
  Zap
} from "lucide-react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

const capabilities = [
  "Análise de consumo",
  "Projeto elétrico",
  "Homologação",
  "Instalação",
  "Monitoramento"
];

const assurances = ["Projeto sob medida", "Gestão técnica completa"];

function PerformanceLine() {
  return (
    <svg aria-hidden viewBox="0 0 220 56" className="h-14 w-full" fill="none">
      <path d="M1 47.5H219" stroke="white" strokeOpacity="0.1" />
      <path d="M1 29.5H219" stroke="white" strokeOpacity="0.1" />
      <path d="M1 11.5H219" stroke="white" strokeOpacity="0.1" />
      <path
        className="hero-performance-line"
        d="M2 46C28 43 38 35 59 37C82 39 91 23 112 27C139 31 151 12 174 17C193 21 204 7 218 8"
        stroke="url(#performance-gradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="218" cy="8" r="4" fill="#ffd700" />
      <defs>
        <linearGradient id="performance-gradient" x1="2" y1="46" x2="218" y2="8">
          <stop stopColor="#0052cc" />
          <stop offset="0.52" stopColor="#00d084" />
          <stop offset="1" stopColor="#ffd700" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ProjectPanel({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      className={
        mobile
          ? "absolute inset-x-4 bottom-4 border-l-2 border-solar-green bg-navy/95 p-5 shadow-2xl"
          : "grid w-[520px] grid-cols-[1fr_190px] border border-white/15 border-l-2 border-l-solar-green bg-[#00133d]/95 shadow-[0_28px_80px_rgba(0,0,0,0.38)]"
      }
    >
      <div className={mobile ? "" : "p-6"}>
        <p className="text-sm font-semibold text-solar-green">Projeto em destaque</p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.035em] text-white">
          Usina Solar Corporativa
        </h2>
        <p className="mt-3 flex items-center gap-2 text-sm text-gray-dark/60">
          <MapPin aria-hidden className="h-4 w-4 text-solar-gold" />
          Jaboatão dos Guararapes, PE
        </p>
        <Link
          href="/projetos/usina-solar-corporativa-jaboatao"
          className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-white underline decoration-solar-green/70 underline-offset-4 transition-colors hover:text-solar-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-solar-green"
        >
          Ver estudo de caso
          <ArrowUpRight aria-hidden className="h-4 w-4" />
        </Link>
      </div>

      {!mobile ? (
        <div className="border-l border-white/10 p-5">
          <p className="font-display text-4xl font-black tracking-[-0.05em] text-white">
            432
          </p>
          <p className="mt-1 text-sm font-bold text-solar-gold">kWp instalados</p>
          <div className="mt-4">
            <PerformanceLine />
          </div>
          <p className="mt-1 text-xs leading-5 text-gray-dark/45">
            Projeto dimensionado para alta geração.
          </p>
        </div>
      ) : null}
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden bg-navy pt-28 lg:min-h-[820px] lg:pt-[76px] xl:min-h-[900px]"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_8%_20%,rgba(0,82,204,0.26),transparent_28%),linear-gradient(112deg,#00143d_0%,#001a4d_48%,#003170_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-[52%] opacity-[0.11] [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:68px_68px] [mask-image:linear-gradient(to_right,black,transparent)]"
      />

      <div
        aria-hidden
        className="absolute inset-y-0 right-0 hidden w-[58%] overflow-hidden lg:block [clip-path:polygon(13%_0,100%_0,100%_100%,0_100%)]"
      >
        <Image
          src="/images/optimized/usina.webp"
          alt=""
          fill
          priority
          sizes="58vw"
          className="object-cover"
          style={{ objectPosition: "center 48%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/75 via-navy/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/20 via-transparent to-navy/80" />
        <div className="absolute inset-0 bg-solar-blue/10 mix-blend-color" />
        <div className="absolute inset-y-0 left-[13%] w-px bg-gradient-to-b from-transparent via-solar-green/80 to-transparent" />

        <svg
          className="absolute -right-24 -top-16 h-[680px] w-[720px] opacity-70"
          viewBox="0 0 720 680"
          fill="none"
        >
          <path
            className="hero-energy-path"
            d="M742 12C482 18 312 130 275 307C240 477 360 598 649 699"
            stroke="url(#energy-flow)"
            strokeWidth="2"
          />
          <path
            d="M728 68C516 76 386 165 357 315C330 453 419 555 674 642"
            stroke="#ffd700"
            strokeOpacity="0.48"
          />
          <defs>
            <linearGradient id="energy-flow" x1="278" y1="119" x2="645" y2="650">
              <stop stopColor="#0052cc" stopOpacity="0" />
              <stop offset="0.46" stopColor="#00d084" />
              <stop offset="0.72" stopColor="#ffd700" />
              <stop offset="1" stopColor="#ffd700" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute right-8 top-28 border-r border-solar-gold/70 pr-4 text-right text-sm text-white/75">
          <p className="font-bold">Solar Energy</p>
          <p className="mt-1 text-xs text-white/45">Engenharia & eficiência</p>
        </div>
      </div>

      <Container className="relative z-10 flex min-h-[692px] flex-col pb-10 lg:min-h-[744px] lg:justify-center lg:pb-28 xl:min-h-[824px]">
        <div className="max-w-[610px] lg:w-[48%] lg:max-w-[560px] xl:max-w-[610px]">
          <div className="flex items-center gap-3 text-sm text-gray-dark/65">
            <MapPin aria-hidden className="h-4 w-4 text-solar-green" />
            <span>Projetos no Ceará e Nordeste</span>
            <span className="h-px w-8 bg-solar-gold/70" />
          </div>

          <h1 className="font-display mt-8 text-balance text-[3.1rem] font-black leading-[0.94] tracking-[-0.055em] text-white sm:text-[4.7rem] lg:text-[4rem] xl:text-[4.6rem]">
            Energia solar. Economia calculada.
          </h1>

          <p className="mt-7 max-w-[590px] text-pretty text-lg leading-8 text-gray-dark/75">
            A Solar Energy transforma consumo em estratégia: dimensiona, projeta,
            homologa, instala e acompanha cada sistema de ponta a ponta.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#simulador" showArrow className="min-h-14 rounded-md px-7">
              Simular economia
            </Button>
            <Button
              href="#projetos"
              variant="secondary"
              className="min-h-14 rounded-md px-7"
            >
              Conhecer projetos
            </Button>
          </div>

          <div className="mt-9 hidden flex-col gap-4 border-t border-white/12 pt-6 text-sm font-semibold text-gray-dark/70 sm:flex sm:flex-row sm:gap-8">
            {assurances.map((item) => (
              <span key={item} className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center border border-solar-green/50 bg-solar-green/10 text-solar-green">
                  <Check aria-hidden className="h-3.5 w-3.5 stroke-[3]" />
                </span>
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mt-8 overflow-hidden border border-white/15 lg:hidden">
          <div className="relative aspect-[4/5] min-h-[520px]">
            <Image
              src="/images/optimized/usina.webp"
              alt="Usina solar corporativa instalada pela Solar Energy"
              fill
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: "center 48%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-navy/10 via-transparent to-navy/85" />
            <ProjectPanel mobile />
          </div>
        </div>

        <div className="absolute bottom-[118px] right-8 hidden lg:block">
          <ProjectPanel />
        </div>

      </Container>

      <div className="relative z-20 border-y border-white/10 bg-[#000f33]/95 lg:absolute lg:inset-x-0 lg:bottom-0">
        <Container className="flex min-h-20 flex-col justify-center gap-4 py-5 lg:flex-row lg:items-center lg:justify-between lg:py-0">
          <div className="flex items-center gap-3 text-sm font-extrabold text-white">
            <Zap aria-hidden className="h-5 w-5 fill-solar-gold text-solar-gold" />
            Uma entrega. Cinco frentes coordenadas.
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-gray-dark/50">
            {capabilities.map((capability, index) => (
              <span key={capability} className="flex items-center gap-5">
                {capability}
                {index < capabilities.length - 1 ? (
                  <span aria-hidden className="h-1 w-1 bg-solar-green" />
                ) : null}
              </span>
            ))}
          </div>
          <a
            href="#solucoes"
            aria-label="Ir para as soluções"
            className="hidden h-10 w-10 shrink-0 items-center justify-center border border-white/15 text-white transition-colors hover:border-solar-green hover:text-solar-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-solar-green lg:flex"
          >
            <ArrowDown aria-hidden className="h-4 w-4" />
          </a>
        </Container>
      </div>
    </section>
  );
}
