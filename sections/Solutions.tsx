import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Container } from "@/components/Container";
import { solutions } from "@/data/solutions";

const primary = [
  { ...solutions[0], href: "/solucoes/energia-solar-residencial-fortaleza", image: "/images/optimized/residencial.webp", code: "RES–01", detail: "Casas e condomínios", accent: "#35b957" },
  { ...solutions[1], href: "/solucoes/energia-solar-empresarial-ceara", image: "/images/optimized/comercial.webp", code: "COM–02", detail: "Comércio e serviços", accent: "#1479d8" },
  { ...solutions[2], href: "/solucoes/usinas-solares-nordeste", image: "/images/optimized/industrial-novo.webp", code: "IND–03", detail: "Indústria e geração", accent: "#f06a18" }
];

const technical = [
  { ...solutions[3], href: "/solucoes/manutencao-sistema-fotovoltaico" },
  { ...solutions[4], href: "/guias/homologacao-energia-solar" },
  { ...solutions[5], href: "/#contato" }
];

function SolutionCard({ solution, index, large = false }: { solution: (typeof primary)[number]; index: number; large?: boolean }) {
  return (
    <article data-reveal className={`group relative isolate overflow-hidden border border-navy/16 bg-navy ${large ? "min-h-[590px]" : "min-h-[286px]"}`}>
      <Image src={solution.image} alt={solution.title} fill sizes={large ? "(min-width:1024px) 46vw, 100vw" : "(min-width:1024px) 40vw, 100vw"} className="object-cover transition-transform duration-300 [transition-timing-function:var(--ease-out)] group-hover:scale-[1.018]" />
      <div className={`absolute inset-0 ${large ? "bg-[linear-gradient(180deg,rgba(2,8,18,.04),rgba(2,8,18,.12)_42%,rgba(2,8,18,.96))]" : "bg-[linear-gradient(90deg,rgba(2,8,18,.96),rgba(2,8,18,.68)_60%,rgba(2,8,18,.16))]"}`} />
      <div className={`absolute inset-0 flex flex-col justify-between ${large ? "p-6 sm:p-8" : "p-6 sm:p-7"}`}>
        <div className="flex items-center justify-between text-[0.65rem] font-black uppercase tracking-[0.16em] text-[#d7dde4]">
          <span>0{index + 1} · {solution.detail}</span><span style={{ color: solution.accent }}>{solution.code}</span>
        </div>
        <div className={large ? "max-w-xl" : "max-w-[430px]"}>
          <h3 className={`${large ? "text-4xl sm:text-5xl" : "text-3xl"} font-black leading-[1.02] tracking-[-0.04em] text-white`}>{solution.title}</h3>
          <p className={`mt-4 ${large ? "max-w-lg" : "max-w-sm"} text-sm leading-6 text-[#d7dde4]`}>{solution.description}</p>
          <Link href={solution.href} className="mt-6 inline-flex items-center gap-2 border-b border-white/35 pb-1 text-sm font-black text-white hover:border-solar-gold hover:text-solar-gold">Conhecer solução <ArrowUpRight aria-hidden className="h-4 w-4" /></Link>
        </div>
      </div>
    </article>
  );
}

export function Solutions() {
  return (
    <section id="solucoes" className="bg-paper py-20 text-navy sm:py-24 lg:py-28">
      <Container>
        <div data-reveal className="grid gap-8 border-t border-navy/18 pt-6 lg:grid-cols-[0.55fr_1.45fr] lg:gap-16">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0863b5]">01 / Soluções</p>
            <p className="mt-5 max-w-xs text-sm leading-6 text-ink-muted">A tecnologia muda de escala. O método e o padrão de entrega permanecem.</p>
          </div>
          <div>
            <h2 className="max-w-4xl text-4xl font-black leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-[3.9rem]">Um projeto para cada realidade de consumo.</h2>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-ink-muted">
              {["Dimensionamento próprio", "Homologação", "Pós-entrega"].map((item) => <span key={item} className="flex items-center gap-2"><Check aria-hidden className="h-4 w-4 text-solar-green" />{item}</span>)}
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.04fr_.96fr]">
          <SolutionCard solution={primary[0]} index={0} large />
          <div className="grid gap-4"><SolutionCard solution={primary[1]} index={1} /><SolutionCard solution={primary[2]} index={2} /></div>
        </div>

        <div data-reveal className="mt-8 grid border-y border-navy/16 lg:grid-cols-[.55fr_1.45fr]">
          <div className="py-6 lg:border-r lg:border-navy/16 lg:pr-8">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#a84100]">Camada técnica</p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-ink-muted">Serviços para manter o sistema regularizado, seguro e produtivo.</p>
          </div>
          <div className="grid sm:grid-cols-3">
            {technical.map((service, index) => (
              <Link key={service.title} href={service.href} className="group border-t border-navy/16 p-5 sm:border-l sm:border-t-0 sm:p-6">
                <span className="text-[0.65rem] font-black tracking-[0.14em] text-[#0863b5]">T–0{index + 1}</span>
                <h3 className="mt-5 text-lg font-black leading-tight">{service.title}</h3>
                <ArrowUpRight aria-hidden className="mt-7 h-5 w-5 text-solar-gold transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
