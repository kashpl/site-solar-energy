import Image from "next/image";
import { ArrowDownRight, Check, MapPin, ShieldCheck, SunMedium } from "lucide-react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import {
  buildGeneralWhatsAppMessage,
  createWhatsAppUrl
} from "@/lib/whatsappFormatter";

const proofPoints = [
  "Projeto personalizado",
  "Homologação incluída",
  "Acompanhamento pós-entrega"
];

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate min-h-screen overflow-hidden bg-navy pb-12 pt-28 supports-[height:100svh]:min-h-[100svh] sm:pb-16 sm:pt-32 lg:flex lg:items-center lg:pb-20"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_10%_12%,rgba(0,208,132,0.14),transparent_24%),radial-gradient(circle_at_88%_8%,rgba(255,215,0,0.1),transparent_26%),linear-gradient(115deg,#001a4d_0%,#001a4d_48%,#003a88_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.93fr)_minmax(420px,0.77fr)] lg:gap-14 xl:gap-20">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-solar-green/25 bg-solar-green/[0.08] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-solar-green">
              <MapPin aria-hidden className="h-4 w-4" />
              Engenharia solar no Ceará e Nordeste
            </div>

            <h1 className="max-w-4xl text-balance text-[2.65rem] font-black leading-[0.98] tracking-[-0.06em] text-white sm:text-[4rem] lg:text-[4.8rem] xl:text-[5.6rem]">
              Energia solar para reduzir custos com{" "}
              <span className="text-solar-green">previsibilidade.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-gray-dark/72 sm:text-xl">
              Da análise de consumo à homologação e ao monitoramento: projetos
              fotovoltaicos completos para residências, empresas e operações de grande
              porte.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="#simulador" showArrow className="sm:px-7">
                Simular minha economia
              </Button>
              <Button href="#projetos" variant="secondary" className="sm:px-7">
                Ver projetos realizados
              </Button>
            </div>

            <ul className="mt-8 grid gap-3 text-sm font-semibold text-gray-dark/80 sm:grid-cols-3">
              {proofPoints.map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-solar-green text-navy">
                    <Check aria-hidden className="h-3 w-3 stroke-[3]" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-[620px] lg:max-w-none">
            <div className="absolute -left-6 -top-6 z-20 hidden rounded-[20px] border border-white/10 bg-[#001a4d] p-4 shadow-2xl sm:block">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-solar-green text-navy">
                  <SunMedium aria-hidden className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-2xl font-black tracking-[-0.04em] text-white">+500</p>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-gray-dark/55">
                    análises realizadas
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#00346f] p-2 shadow-[0_34px_100px_rgba(0,0,0,0.34)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] sm:aspect-[5/4] lg:aspect-[4/5] xl:aspect-[5/4]">
                <Image
                  src="/images/optimized/usina.webp"
                  alt="Usina solar corporativa instalada pela Solar Energy"
                  fill
                  priority
                  sizes="(min-width: 1024px) 44vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: "center 42%" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/5 to-transparent" />

                <div className="absolute inset-x-5 bottom-5 rounded-[18px] border border-white/15 bg-[#001a4d]/95 p-5 sm:inset-x-6 sm:bottom-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-solar-green">
                        Projeto em destaque
                      </p>
                      <h2 className="mt-2 text-2xl font-black tracking-[-0.035em] text-white">
                        Usina Solar Corporativa
                      </h2>
                      <p className="mt-1 text-sm text-gray-dark/65">
                        Jaboatão dos Guararapes/PE
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-2xl font-black text-white">432 kWp</p>
                        <p className="text-xs font-semibold text-gray-dark/55">Potência</p>
                      </div>
                      <ArrowDownRight aria-hidden className="h-6 w-6 text-solar-green" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <a
              href={createWhatsAppUrl(buildGeneralWhatsAppMessage())}
              target="_blank"
              rel="noreferrer"
              className="absolute -bottom-5 right-4 z-20 hidden items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-black text-navy shadow-2xl transition hover:-translate-y-1 sm:flex"
            >
              <ShieldCheck aria-hidden className="h-5 w-5 text-[#00735c]" />
              Falar com especialista
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
