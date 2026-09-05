import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/Container";
import { company } from "@/data/company";
import { buildGeneralWhatsAppMessage, createWhatsAppUrl } from "@/lib/whatsappFormatter";

const principles = [
  ["01", "Critério técnico", "Eficiência, segurança elétrica e vida útil orientam cada decisão."],
  ["02", "Projeto sob medida", "Consumo, espaço disponível e objetivo real de economia."],
  ["03", "Responsabilidade ponta a ponta", "Estudo, homologação, instalação e suporte pós-entrega."]
];

export function About() {
  return (
    <section id="sobre" className="bg-canvas py-20 text-navy sm:py-24 lg:py-28">
      <Container>
        <div data-reveal className="interactive-card grid gap-0 overflow-hidden rounded-[26px] border border-navy/20 bg-paper shadow-[0_22px_70px_rgba(0,20,42,.1)] lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative min-h-[360px] overflow-hidden sm:min-h-[420px] lg:m-8 lg:h-[470px] lg:min-h-0 lg:self-center lg:rounded-[18px] xl:m-10">
            <Image src="/images/optimized/639311282FIMI0026 (3).webp" alt="Equipe técnica da Solar Energy em campo" fill sizes="(min-width: 1280px) 31vw, (min-width: 1024px) 36vw, 100vw" className="object-cover object-[52%_50%]" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/95 to-transparent px-6 pb-7 pt-28 text-white sm:px-9">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-solar-green">Registro de campo</p>
              <p className="mt-3 max-w-lg text-lg font-semibold leading-7">Instalação acompanhada, segurança operacional e atenção ao detalhe em cada etapa.</p>
            </div>
          </div>
          <div className="flex flex-col p-6 sm:p-9 lg:p-10 xl:p-12">
            <p className="border-t border-navy/25 pt-6 text-xs font-black uppercase tracking-[0.18em] text-[#49647c]">05 / Quem executa</p>
            <h2 className="mt-7 text-4xl font-black leading-[1.02] tracking-[-0.04em] sm:text-[2.8rem]">Engenharia próxima. Entrega responsável.</h2>
            <p className="mt-6 text-base leading-7 text-ink-muted">A Solar Energy Qualidade e Eficiência une engenharia, atendimento próximo e execução segura para transformar consumo em estratégia energética.</p>
            <div className="mt-8 border-t border-navy/20">
              {principles.map(([number, title, text]) => (
                <div key={number} className="grid grid-cols-[42px_1fr] gap-4 border-b border-navy/20 py-4">
                  <span className="text-xs font-black text-[#00815f]">{number}</span>
                  <div><h3 className="font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-ink-muted">{text}</p></div>
                </div>
              ))}
            </div>
            <a href={createWhatsAppUrl(buildGeneralWhatsAppMessage())} target="_blank" rel="noreferrer" className="mt-6 inline-flex w-fit items-center gap-2 border-b border-navy pb-1 text-sm font-black hover:border-solar-green hover:text-solar-green">Conversar com a equipe <ArrowUpRight aria-hidden className="h-4 w-4" /></a>
            <dl className="mt-7 grid gap-4 border-t border-navy/20 pt-5 text-xs sm:grid-cols-2">
              <div><dt className="font-bold uppercase tracking-[0.12em] text-[#52697c]">Sede</dt><dd className="mt-2 font-bold">{company.location}</dd></div>
              <div><dt className="font-bold uppercase tracking-[0.12em] text-[#52697c]">Registro</dt><dd className="mt-2 font-bold">CNPJ {company.cnpj}</dd></div>
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
