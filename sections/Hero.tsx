"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  BadgeCheck,
  BarChart3,
  CircleDollarSign,
  FileCheck2,
  Leaf,
  PanelTop,
  ShieldCheck,
  SunMedium,
  TrendingDown,
  Zap
} from "lucide-react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import {
  buildGeneralWhatsAppMessage,
  createWhatsAppUrl
} from "@/lib/whatsappFormatter";

const indicators = [
  { icon: TrendingDown, label: "Até 95% de economia" },
  { icon: BadgeCheck, label: "Projeto homologado" },
  { icon: Leaf, label: "Energia limpa" },
  { icon: Zap, label: "Alta eficiência" }
];

const proofPoints = [
  { icon: BarChart3, value: "+500", label: "análises de projeto" },
  { icon: CircleDollarSign, value: "95%", label: "economia estimada" },
  { icon: FileCheck2, value: "360°", label: "gestão técnica" }
];

export function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 44]);

  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[82svh] items-center overflow-hidden bg-navy pt-24 sm:pt-28"
    >
      <motion.div
        aria-hidden
        style={{ y }}
        className="solar-panel-field absolute inset-0"
      />
      <div aria-hidden className="hero-solar-cells" />
      <div aria-hidden className="hero-solar-ridge" />
      <div aria-hidden className="premium-grid absolute inset-0 opacity-50" />
      <div aria-hidden className="solar-cell-texture absolute inset-0 opacity-[0.42]" />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_83%_10%,rgba(255,215,0,0.38),transparent_26%),radial-gradient(circle_at_18%_82%,rgba(0,208,132,0.24),transparent_34%),linear-gradient(90deg,rgba(0,18,54,0.92),rgba(0,26,77,0.74)_48%,rgba(0,26,77,0.5))]"
      />

      <svg
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-32 w-full opacity-35 sm:h-44"
        viewBox="0 0 1440 260"
        preserveAspectRatio="none"
      >
        <path
          className="energy-line"
          d="M0 190 C210 120 325 230 520 156 S840 86 1025 152 S1260 232 1440 126"
          fill="none"
          stroke="url(#heroEnergyGradient)"
          strokeWidth="2"
        />
        <path
          className="energy-line energy-line-delay"
          d="M0 224 C240 164 360 246 565 186 S880 128 1060 196 S1280 244 1440 174"
          fill="none"
          stroke="rgba(245,247,250,0.28)"
          strokeWidth="1.25"
        />
        <defs>
          <linearGradient id="heroEnergyGradient" x1="0" x2="1" y1="0" y2="0">
            <stop stopColor="#00d084" />
            <stop offset="1" stopColor="#ffd700" />
          </linearGradient>
        </defs>
      </svg>

      {Array.from({ length: 10 }).map((_, index) => (
        <span
          key={index}
          aria-hidden="true"
          className="animate-float-slow absolute hidden h-1.5 w-1.5 rounded-full bg-solar-green/[0.58] shadow-[0_0_18px_rgba(0,208,132,0.75)] sm:block"
          style={{
            left: `${14 + ((index * 13) % 72)}%`,
            top: `${20 + ((index * 17) % 54)}%`,
            animationDelay: `${index * 0.3}s`
          }}
        />
      ))}

      <Container className="relative z-10 pb-12 pt-6 sm:pb-16 lg:pb-[72px]">
        <div className="grid items-center gap-9 lg:grid-cols-[minmax(0,1.02fr)_minmax(330px,0.78fr)] xl:gap-14">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="mb-5 inline-flex max-w-full items-center gap-3 rounded-md border border-white/[0.16] bg-white/[0.09] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.12em] text-white shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-2xl sm:text-sm">
              <PanelTop aria-hidden className="h-5 w-5 shrink-0 text-solar-gold" />
              Energia solar premium com engenharia no Ceará
            </div>

            <h1 className="max-w-4xl text-balance text-[2.25rem] font-black leading-[1] tracking-normal text-white sm:text-[3.6rem] lg:text-[4.45rem] xl:text-[5.05rem]">
              Energia solar inteligente para um futuro{" "}
              <span className="text-solar-green">mais eficiente</span>
            </h1>

            <p className="mt-5 max-w-2xl text-pretty text-base leading-8 text-gray-dark/[0.86] sm:text-lg lg:text-xl">
              Soluções fotovoltaicas com engenharia, segurança e alta performance para
              transformar consumo de energia em economia previsível.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button
                href={createWhatsAppUrl(buildGeneralWhatsAppMessage())}
                target="_blank"
                rel="noreferrer"
                showArrow
                className="sm:px-6"
              >
                Solicitar orçamento agora
              </Button>
              <Button href="#solucoes" variant="secondary" showArrow className="sm:px-6">
                Conhecer soluções
              </Button>
            </div>

            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
            >
              {indicators.map((item) => (
                <div
                  key={item.label}
                  className="group rounded-lg border border-white/[0.14] bg-white/[0.075] p-4 text-white shadow-[0_16px_44px_rgba(0,0,0,0.18)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-solar-green/60 hover:bg-white/[0.11]"
                >
                  <item.icon
                    aria-hidden
                    className="mb-3 h-5 w-5 text-solar-gold transition group-hover:text-solar-green"
                  />
                  <p className="text-sm font-bold leading-5">{item.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.aside
            initial={false}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16 }}
            className="relative mx-auto w-full max-w-[410px] lg:max-w-none"
          >
            <div aria-hidden className="hero-solar-orbit -right-14 -top-14 hidden lg:block" />
            <div className="absolute -inset-4 rounded-lg bg-[conic-gradient(from_180deg,rgba(0,208,132,0.22),rgba(255,215,0,0.18),rgba(0,82,204,0.18),rgba(0,208,132,0.22))] opacity-70 blur-2xl" />
            <div className="hero-side-card engineering-card relative overflow-hidden rounded-lg border border-white/[0.18] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.38)] backdrop-blur-2xl sm:p-7">
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
              <div className="relative flex items-center justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-solar-gold/25 bg-solar-gold/10 text-solar-gold shadow-gold">
                  <SunMedium aria-hidden className="h-6 w-6" />
                </div>
                <span className="rounded-full border border-solar-green/25 bg-solar-green/10 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-solar-green">
                  Solar premium
                </span>
              </div>

              <div className="relative mt-7">
                <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-solar-green">
                  Engenharia + economia
                </p>
                <h2 className="mt-3 text-3xl font-black leading-tight text-white">
                  Um plano solar completo, do diagnóstico à geração.
                </h2>
                <p className="mt-4 text-sm leading-7 text-gray-dark/[0.8]">
                  Dimensionamento técnico, homologação, instalação e suporte para reduzir
                  custos sem improviso operacional.
                </p>
              </div>

              <div className="relative mt-7 grid gap-3">
                {proofPoints.map((point) => (
                  <div
                    key={point.label}
                    className="flex items-center gap-4 rounded-lg border border-white/[0.12] bg-navy/[0.36] p-4"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-solar-green/25 bg-solar-green/10 text-solar-green">
                      <point.icon aria-hidden className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-black leading-none text-white">
                        {point.value}
                      </p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-gray-dark/[0.68]">
                        {point.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative mt-5 rounded-lg border border-solar-green/25 bg-solar-green/10 p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-solar-green" />
                  <p className="text-sm font-medium leading-6 text-gray-dark/[0.88]">
                    Atendimento consultivo para entender consumo, retorno estimado e melhor
                    configuração para cada imóvel ou operação.
                  </p>
                </div>
              </div>

              <div className="relative mt-4 grid grid-cols-3 gap-2 text-center text-[0.68rem] font-extrabold uppercase tracking-[0.1em] text-gray-dark/70">
                {["Viabilidade", "Retorno", "Homologação"].map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-white/[0.1] bg-white/[0.055] px-2 py-2"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </Container>
    </section>
  );
}
