import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, MapPin } from "lucide-react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

const projectStages = ["Diagnóstico", "Projeto", "Homologação", "Instalação", "Monitoramento"];

function BrandTrails() {
  return (
    <svg aria-hidden className="brand-trails absolute inset-0 h-full w-full" viewBox="0 0 1100 720" fill="none" preserveAspectRatio="xMidYMid slice">
      <path className="brand-trail brand-trail-blue" d="M-70 610C170 390 326 350 522 387c224 42 316-51 462-245 58-77 123-123 211-145" />
      <path className="brand-trail brand-trail-green" d="M-120 676c257-176 422-183 610-93 197 94 370 36 531-160 73-88 132-130 228-156" />
      <path className="brand-trail brand-trail-gold" d="M74 778c112-198 273-290 459-278 237 16 397-87 505-303 42-84 97-145 188-190" />
      <path className="brand-trail brand-trail-orange" d="M640 759c-3-188 82-306 253-395 152-79 244-186 281-325" />
      <path className="brand-trail-pulse brand-trail-blue brand-pulse-1" d="M-70 610C170 390 326 350 522 387c224 42 316-51 462-245 58-77 123-123 211-145" />
      <path className="brand-trail-pulse brand-trail-green brand-pulse-2" d="M-120 676c257-176 422-183 610-93 197 94 370 36 531-160 73-88 132-130 228-156" />
      <path className="brand-trail-pulse brand-trail-gold brand-pulse-3" d="M74 778c112-198 273-290 459-278 237 16 397-87 505-303 42-84 97-145 188-190" />
      <path className="brand-trail-pulse brand-trail-orange brand-pulse-4" d="M640 759c-3-188 82-306 253-395 152-79 244-186 281-325" />
    </svg>
  );
}

export function Hero() {
  return (
    <section id="inicio" className="brand-aurora relative isolate overflow-hidden pt-[96px] text-white">
      <BrandTrails />
      <Container className="relative z-10">
        <div className="grid min-h-[700px] items-center gap-12 py-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16 lg:py-16">
          <div className="hero-sequence max-w-[650px]">
            <div className="hero-sequence-item mb-7 flex items-center gap-3 text-[0.7rem] font-black uppercase tracking-[0.2em] text-white/65">
              <MapPin aria-hidden className="h-4 w-4 text-solar-gold" />
              <span>Fortaleza · Ceará</span>
              <span className="h-px w-8 bg-solar-green" />
              <span>Atuação no Nordeste</span>
            </div>
            <h1 className="hero-sequence-item max-w-[650px] text-[clamp(3.25rem,5.8vw,5rem)] font-black leading-[0.94] tracking-[-0.055em]">
              Energia solar,<br />
              <span className="text-solar-gold">do cálculo</span> à geração.
            </h1>
            <p className="hero-sequence-item mt-7 max-w-[590px] text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
              Engenharia fotovoltaica completa para residências, empresas e usinas — com projeto sob medida, homologação e acompanhamento técnico.
            </p>
            <div className="hero-sequence-item mt-8 flex flex-col gap-3 min-[430px]:flex-row">
              <Button href="#simulador" showArrow className="min-h-14">Simular minha economia</Button>
              <Button href="#projetos" variant="secondary" className="min-h-14">Conhecer projetos</Button>
            </div>
            <ul className="hero-sequence-item mt-9 grid gap-3 border-t border-white/14 pt-6 text-sm text-white/72 sm:grid-cols-2">
              <li className="flex items-center gap-2"><Check aria-hidden className="h-4 w-4 text-solar-green" /> Projeto personalizado</li>
              <li className="flex items-center gap-2"><Check aria-hidden className="h-4 w-4 text-solar-green" /> Homologação incluída</li>
            </ul>
          </div>

          <div className="hero-project-reveal relative mx-auto w-full max-w-[720px] lg:mx-0">
            <div aria-hidden className="absolute -left-3 -top-3 h-24 w-24 rounded-tl-[30px] border-l border-t border-solar-blue/75" />
            <div aria-hidden className="absolute -bottom-3 -right-3 h-28 w-28 rounded-br-[30px] border-b border-r border-solar-gold/75" />
            <div className="interactive-card relative aspect-[0.82] overflow-hidden rounded-[26px] border border-white/18 bg-[#07182b] shadow-[0_30px_80px_rgba(0,0,0,.42)] sm:aspect-[1.22] sm:min-h-[430px]">
              <Image src="/images/optimized/usina.webp" alt="Vista aérea de usina solar corporativa instalada pela Solar Energy" fill priority sizes="(min-width:1024px) 58vw, 100vw" className="object-cover object-[58%_48%]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,8,18,.08),rgba(2,8,18,.18)_48%,rgba(2,8,18,.92))]" />
              <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-[#020812]/80 px-3 py-2 text-[0.65rem] font-black uppercase tracking-[0.16em] backdrop-blur-md">
                <span className="status-pulse h-2 w-2 rounded-full bg-solar-green text-solar-green shadow-[0_0_12px_rgba(53,185,87,.8)]" /> Projeto em destaque
              </div>
              <div className="absolute inset-x-0 bottom-0 grid gap-5 border-t border-white/16 bg-[#020812]/82 p-5 backdrop-blur-md sm:grid-cols-[1fr_auto] sm:p-7">
                <div>
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-solar-green">Usina Solar Corporativa</p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-white/66"><MapPin aria-hidden className="h-4 w-4 text-solar-gold" />Jaboatão dos Guararapes, PE</p>
                </div>
                <div className="flex items-end justify-between gap-8 sm:block sm:text-right">
                  <p className="tabular-nums text-4xl font-black leading-none">432 <span className="text-sm text-solar-gold">kWp</span></p>
                  <Link href="/projetos/usina-solar-corporativa-jaboatao" className="mt-3 inline-flex items-center gap-2 text-xs font-black text-white hover:text-solar-gold">Ver projeto <ArrowUpRight aria-hidden className="h-4 w-4" /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 hidden overflow-hidden rounded-[18px] border border-white/14 bg-[#020812]/62 shadow-[0_18px_48px_rgba(0,0,0,.18)] backdrop-blur-md lg:grid lg:grid-cols-[170px_1fr_52px]">
          <p className="flex items-center border-r border-white/14 px-6 text-[0.66rem] font-black uppercase tracking-[0.16em] text-white/48">Uma entrega. Cinco etapas.</p>
          <ol className="grid grid-cols-5">
            {projectStages.map((stage, index) => (
              <li key={stage} className="border-r border-white/14 px-5 py-4">
                <span className="text-[0.62rem] font-black text-solar-gold">0{index + 1}</span>
                <p className="mt-1 text-xs font-semibold text-white/68">{stage}</p>
              </li>
            ))}
          </ol>
          <a href="#solucoes" aria-label="Ir para as soluções" className="flex items-center justify-center text-white/70 hover:text-solar-gold"><ArrowDown aria-hidden className="h-4 w-4" /></a>
        </div>
      </Container>
    </section>
  );
}
