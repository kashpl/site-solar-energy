import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, MapPin } from "lucide-react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

const projectStages = [
  "Diagnóstico",
  "Projeto",
  "Homologação",
  "Instalação",
  "Monitoramento"
];

const assurances = ["Projeto sob medida", "Gestão técnica completa"];

function EnergyOrbit() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 760 760"
      fill="none"
      className="absolute -right-40 -top-52 h-[760px] w-[760px] opacity-80"
    >
      <circle cx="380" cy="380" r="238" stroke="white" strokeOpacity="0.13" />
      <circle cx="380" cy="380" r="304" stroke="white" strokeOpacity="0.08" />
      <path
        className="hero-energy-path"
        d="M117 228C178 79 338 13 495 72C654 132 736 309 671 470"
        stroke="url(#hero-orbit-gradient)"
        strokeWidth="2"
      />
      <path
        d="M173 541C106 426 121 282 212 182"
        stroke="#ffd700"
        strokeOpacity="0.58"
        strokeWidth="1.4"
      />
      <circle cx="671" cy="470" r="6" fill="#ffd700" />
      <circle cx="117" cy="228" r="4" fill="#00d084" />
      <defs>
        <linearGradient id="hero-orbit-gradient" x1="117" y1="228" x2="671" y2="470">
          <stop stopColor="#0052cc" stopOpacity="0" />
          <stop offset="0.48" stopColor="#00d084" />
          <stop offset="1" stopColor="#ffd700" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function DesktopProjectData() {
  return (
    <aside className="hero-project-reveal absolute bottom-28 right-0 hidden w-[49%] lg:block xl:w-[47%]">
      <div className="grid grid-cols-[1fr_180px] border-y border-white/20 bg-[linear-gradient(90deg,rgba(0,20,63,.97),rgba(0,20,63,.9)_68%,rgba(0,20,63,.82))] backdrop-blur-sm">
        <div className="border-l-2 border-solar-green px-7 py-6">
          <div className="flex items-center gap-3 text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-solar-green">
            <span>Case 01</span>
            <span className="h-px w-8 bg-solar-green/60" />
            <span>Em destaque</span>
          </div>
          <h2 className="mt-4 max-w-[330px] text-2xl font-black leading-tight tracking-[-0.035em] text-white xl:text-[1.7rem]">
            Usina Solar Corporativa
          </h2>
          <p className="mt-3 flex items-center gap-2 text-sm text-white/62">
            <MapPin aria-hidden className="h-4 w-4 text-solar-gold" />
            Jaboatão dos Guararapes, PE
          </p>
          <Link
            href="/projetos/usina-solar-corporativa-jaboatao"
            className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-white transition-colors hover:text-solar-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-solar-green"
          >
            Conhecer o projeto
            <ArrowUpRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative flex flex-col justify-between border-l border-white/15 px-6 py-6">
          <span className="absolute right-0 top-0 h-2 w-2 border-r border-t border-solar-gold" />
          <div>
            <p className="font-display text-[3.4rem] font-black leading-none tracking-[-0.06em] text-white">
              432
            </p>
            <p className="mt-2 text-sm font-extrabold text-solar-gold">kWp instalados</p>
          </div>
          <p className="mt-6 border-t border-white/12 pt-4 text-xs leading-5 text-white/48">
            Engenharia aplicada a projetos de alta geração.
          </p>
        </div>
      </div>
    </aside>
  );
}

function MobileProjectData() {
  return (
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#000b27] via-[#000b27]/95 to-transparent px-5 pb-5 pt-20">
      <div className="flex items-end justify-between gap-5 border-l-2 border-solar-green pl-4">
        <div>
          <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-solar-green">
            Projeto em destaque
          </p>
          <p className="mt-2 text-xl font-black tracking-[-0.03em] text-white">
            Usina Solar Corporativa
          </p>
          <p className="mt-1 text-xs text-white/58">Jaboatão dos Guararapes, PE</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-display text-3xl font-black leading-none text-white">432</p>
          <p className="mt-1 text-xs font-bold text-solar-gold">kWp</p>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden bg-navy pt-[76px] lg:min-h-[860px]"
    >
      <div aria-hidden className="absolute inset-0 hidden lg:block">
        <Image
          src="/images/optimized/usina.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[67%_48%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#00143f_0%,rgba(0,20,63,.99)_31%,rgba(0,20,63,.93)_44%,rgba(0,20,63,.56)_61%,rgba(0,14,47,.14)_82%,rgba(0,10,35,.34)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/10 via-transparent to-[#000b27]/88" />
        <div className="absolute inset-0 bg-solar-blue/10 mix-blend-color" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.22)_1px,transparent_1px)] [background-size:96px_96px] [mask-image:linear-gradient(to_right,transparent_20%,black_65%,black)]" />
        <EnergyOrbit />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(0,82,204,.25),transparent_34%)] lg:hidden"
      />

      <Container className="relative z-10">
        <div className="hero-intro-reveal flex min-h-[610px] flex-col justify-center pb-10 pt-12 sm:min-h-[640px] lg:min-h-[784px] lg:w-[55%] lg:max-w-[720px] lg:pb-28 lg:pt-16 xl:w-[52%]">
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.16em] text-white/62 sm:text-sm sm:normal-case sm:tracking-normal">
            <span className="h-2 w-2 bg-solar-green shadow-[0_0_18px_rgba(0,208,132,.9)]" />
            Projetos no Ceará e Nordeste
            <span className="hidden h-px w-10 bg-solar-gold/80 sm:block" />
          </div>

          <h1 className="font-display mt-7 max-w-[720px] text-balance text-[3.25rem] font-black leading-[0.92] tracking-[-0.06em] text-white sm:text-[4.8rem] lg:text-[4.6rem] xl:text-[5.4rem]">
            Engenharia solar para quem mede resultado<span className="text-solar-gold">.</span>
          </h1>

          <p className="mt-7 max-w-[610px] text-pretty text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
            Da análise de consumo ao monitoramento: sistemas fotovoltaicos projetados
            para entregar economia, previsibilidade e desempenho de longo prazo.
          </p>

          <div className="mt-8 flex flex-col gap-3 min-[360px]:flex-row">
            <Button
              href="#simulador"
              showArrow
              className="min-h-14 w-full flex-1 rounded-md px-3 text-[0.8rem] sm:px-7 sm:text-sm"
            >
              <span className="sm:hidden">Simular economia</span>
              <span className="hidden sm:inline">Calcular minha economia</span>
            </Button>
            <Button
              href="#projetos"
              variant="secondary"
              className="min-h-14 w-full flex-1 rounded-md border-white/25 bg-navy/35 px-3 text-[0.8rem] backdrop-blur-sm sm:px-7 sm:text-sm"
            >
              <span className="sm:hidden">Ver projetos</span>
              <span className="hidden sm:inline">Ver projetos realizados</span>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/16 pt-5 text-sm font-semibold text-white/65">
            {assurances.map((item) => (
              <span key={item} className="flex items-center gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center border border-solar-green/60 text-solar-green">
                  <Check aria-hidden className="h-3 w-3 stroke-[3]" />
                </span>
                {item}
              </span>
            ))}
          </div>
        </div>
      </Container>

      <div className="relative mx-4 mb-5 overflow-hidden border border-white/15 lg:hidden">
        <div className="relative aspect-[4/3] min-h-[300px]">
          <Image
            src="/images/optimized/usina.webp"
            alt="Usina solar corporativa instalada pela Solar Energy"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[58%_48%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/5 via-transparent to-[#000b27]/45" />
          <MobileProjectData />
        </div>
      </div>

      <DesktopProjectData />

      <div className="relative z-20 hidden border-t border-white/15 bg-[#000b27]/72 backdrop-blur-sm lg:block lg:absolute lg:inset-x-0 lg:bottom-0">
        <Container className="grid min-h-[88px] grid-cols-[190px_1fr_46px] items-center gap-8">
          <div>
            <p className="text-[0.64rem] font-extrabold uppercase tracking-[0.2em] text-solar-green">
              Jornada completa
            </p>
            <p className="mt-1 text-sm font-bold text-white">Uma equipe. Um resultado.</p>
          </div>

          <ol className="grid grid-cols-5 border-x border-white/10">
            {projectStages.map((stage, index) => (
              <li key={stage} className="border-r border-white/10 px-5 last:border-r-0">
                <span className="text-[0.62rem] font-black text-solar-green">0{index + 1}</span>
                <p className="mt-1 text-xs font-semibold text-white/58 xl:text-sm">{stage}</p>
              </li>
            ))}
          </ol>

          <a
            href="#solucoes"
            aria-label="Ir para as soluções"
            className="flex h-11 w-11 items-center justify-center border border-white/20 text-white transition-colors hover:border-solar-green hover:text-solar-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-solar-green"
          >
            <ArrowDown aria-hidden className="h-4 w-4" />
          </a>
        </Container>
      </div>
    </section>
  );
}
