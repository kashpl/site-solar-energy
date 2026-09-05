import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  Factory,
  Gauge,
  House,
  MapPin,
  SunMedium
} from "lucide-react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

const projectStages = [
  { number: "01", title: "Estudo", text: "Viabilidade" },
  { number: "02", title: "Engenharia", text: "Projeto técnico" },
  { number: "03", title: "Entrega", text: "Homologação" }
];

const projectProfiles = [
  { label: "Residencial", icon: House },
  { label: "Empresarial", icon: Building2 },
  { label: "Grande porte", icon: Factory }
];

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden bg-navy pb-14 pt-28 sm:pb-16 sm:pt-32 lg:flex lg:min-h-[760px] lg:items-center lg:pb-16 lg:pt-28 xl:min-h-[820px]"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_8%_12%,rgba(0,82,204,0.3),transparent_28%),radial-gradient(circle_at_78%_30%,rgba(0,208,132,0.12),transparent_28%),radial-gradient(circle_at_96%_5%,rgba(255,215,0,0.11),transparent_22%),linear-gradient(118deg,#00143d_0%,#001a4d_50%,#003c8c_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)] [background-size:76px_76px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]"
      />

      <svg
        aria-hidden
        className="pointer-events-none absolute -right-32 top-8 h-[760px] w-[860px] opacity-55"
        viewBox="0 0 860 760"
        fill="none"
      >
        <path
          d="M878 30C633 49 490 147 426 306C363 464 445 612 691 760"
          stroke="url(#hero-green)"
          strokeWidth="2"
        />
        <path
          d="M854 76C663 100 548 184 502 315C455 446 513 570 707 701"
          stroke="url(#hero-gold)"
          strokeWidth="1.5"
        />
        <path
          d="M846 148C693 171 610 232 579 331C548 429 592 520 735 614"
          stroke="url(#hero-blue)"
          strokeWidth="1.5"
        />
        <defs>
          <linearGradient id="hero-green" x1="420" y1="190" x2="760" y2="700">
            <stop stopColor="#00d084" stopOpacity="0" />
            <stop offset="0.48" stopColor="#00d084" />
            <stop offset="1" stopColor="#00d084" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hero-gold" x1="500" y1="110" x2="760" y2="650">
            <stop stopColor="#ffd700" stopOpacity="0" />
            <stop offset="0.5" stopColor="#ffd700" />
            <stop offset="1" stopColor="#ffd700" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hero-blue" x1="560" y1="170" x2="790" y2="590">
            <stop stopColor="#2d8cff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#2d8cff" />
            <stop offset="1" stopColor="#2d8cff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div
        aria-hidden
        className="absolute bottom-0 left-[8%] h-px w-[38%] bg-gradient-to-r from-transparent via-solar-green/70 to-transparent"
      />

      <Container className="relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.96fr)_minmax(470px,1.04fr)] lg:gap-12 xl:gap-20">
          <div className="relative">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-10 bg-solar-gold" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-solar-gold">
                Energia com inteligência
              </span>
            </div>

            <h1 className="max-w-[680px] text-[2.8rem] font-black leading-[0.98] tracking-[-0.055em] text-white sm:text-[3.9rem] lg:text-[3.7rem] xl:text-[4.15rem]">
              <span className="block">Engenharia solar.</span>
              <span className="mt-1 block">
                Economia que se{" "}
                <span className="relative whitespace-nowrap text-solar-green">
                  mede.
                  <svg
                    aria-hidden
                    className="absolute -bottom-2 left-0 h-3 w-full text-solar-gold/75"
                    viewBox="0 0 170 12"
                    preserveAspectRatio="none"
                  >
                    <path d="M2 8.8C45 2 112 1.8 168 7" stroke="currentColor" strokeWidth="3" />
                  </svg>
                </span>
              </span>
            </h1>

            <p className="mt-8 max-w-[650px] text-pretty text-lg leading-8 text-gray-dark/78 sm:text-xl">
              Projetos completos para residências, empresas e operações de grande porte —
              da análise de consumo à homologação e ao acompanhamento da geração.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="#simulador" showArrow className="min-h-14 px-7">
                Calcular minha economia
              </Button>
              <Button href="#projetos" variant="secondary" className="min-h-14 px-7">
                Explorar projetos
              </Button>
            </div>

            <div className="mt-10 grid max-w-[650px] grid-cols-3 border-y border-white/10 py-5">
              {projectStages.map((stage, index) => (
                <div
                  key={stage.number}
                  className={index === 0 ? "pr-3" : "border-l border-white/10 px-4 sm:px-5"}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[0.65rem] font-black tracking-[0.12em] text-solar-green">
                      {stage.number}
                    </span>
                    <span className="hidden h-px flex-1 bg-white/10 sm:block" />
                  </div>
                  <p className="mt-2 text-sm font-black text-white">{stage.title}</p>
                  <p className="mt-0.5 text-xs font-medium text-gray-dark/50">{stage.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[680px] lg:max-w-none">
            <div
              aria-hidden
              className="absolute -inset-5 rounded-[44px] border border-solar-blue/35 bg-solar-blue/[0.08]"
            />
            <div
              aria-hidden
              className="absolute -right-5 -top-5 h-24 w-24 border-r border-t border-solar-gold/65"
            />
            <div
              aria-hidden
              className="absolute -bottom-5 -left-5 h-24 w-24 border-b border-l border-solar-green/65"
            />

            <div className="relative overflow-hidden rounded-[34px] border border-white/15 bg-[#00346f] p-2.5 shadow-[0_40px_110px_rgba(0,9,35,0.48)]">
              <div className="relative min-h-[500px] overflow-hidden rounded-[27px] sm:min-h-[540px] lg:min-h-[550px] xl:min-h-[580px]">
                <Image
                  src="/images/optimized/usina.webp"
                  alt="Usina solar corporativa instalada pela Solar Energy"
                  fill
                  priority
                  sizes="(min-width: 1280px) 570px, (min-width: 1024px) 48vw, 100vw"
                  className="object-cover transition duration-700 hover:scale-[1.025]"
                  style={{ objectPosition: "center 46%" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-navy/10 via-transparent to-navy/95" />
                <div className="absolute inset-0 bg-gradient-to-r from-solar-blue/15 via-transparent to-transparent" />

                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/15 bg-navy/90 px-4 py-2.5 text-xs font-black uppercase tracking-[0.13em] text-white sm:left-6 sm:top-6">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-solar-green opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-solar-green" />
                  </span>
                  Projeto em destaque
                </div>

                <div className="absolute right-5 top-5 hidden rounded-[18px] border border-white/15 bg-white/95 px-4 py-3 text-navy shadow-xl sm:block sm:right-6 sm:top-6">
                  <div className="flex items-center gap-3">
                    <Gauge aria-hidden className="h-5 w-5 text-[#00735c]" />
                    <div>
                      <p className="text-lg font-black leading-none">432 kWp</p>
                      <p className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-navy/55">
                        Potência instalada
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <div className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-solar-green">
                    <MapPin aria-hidden className="h-4 w-4" />
                    Jaboatão dos Guararapes · PE
                  </div>
                  <div className="flex flex-col gap-5 border-t border-white/15 pt-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h2 className="max-w-sm text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">
                        Usina Solar Corporativa
                      </h2>
                      <p className="mt-2 max-w-md text-sm leading-6 text-gray-dark/65">
                        Escala, engenharia e performance reunidas em uma entrega completa.
                      </p>
                    </div>
                    <Link
                      href="/projetos/usina-solar-corporativa-jaboatao"
                      aria-label="Ver estudo de caso da usina solar corporativa"
                      className="mr-14 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-solar-green text-navy transition hover:-translate-y-1 hover:bg-solar-gold sm:mr-12"
                    >
                      <ArrowUpRight aria-hidden className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-20 -mt-5 ml-4 flex max-w-[520px] flex-wrap gap-2 rounded-[20px] border border-white/15 bg-navy px-4 py-3 shadow-2xl sm:ml-8 sm:px-5">
              {projectProfiles.map((profile) => (
                <div
                  key={profile.label}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-xs font-bold text-gray-dark/75"
                >
                  <profile.icon aria-hidden className="h-4 w-4 text-solar-green" />
                  {profile.label}
                </div>
              ))}
            </div>

            <div className="absolute -left-10 top-[38%] z-20 hidden rounded-[22px] border border-white/15 bg-navy p-4 shadow-2xl xl:block">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-solar-gold text-navy">
                  <SunMedium aria-hidden className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-2xl font-black leading-none text-white">+500</p>
                  <p className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-gray-dark/50">
                    análises realizadas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
