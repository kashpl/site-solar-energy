import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/Container";
import { buildGeneralWhatsAppMessage, createWhatsAppUrl } from "@/lib/whatsappFormatter";

export function CTAFinal() {
  return (
    <section className="brand-aurora relative overflow-hidden text-white">
      <div aria-hidden className="absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full border border-solar-gold/25" />
      <div aria-hidden className="absolute -right-8 top-1/2 h-52 w-52 -translate-y-1/2 rounded-full border border-solar-green/25" />
      <Container className="relative">
        <div data-reveal className="grid min-h-[390px] items-stretch lg:grid-cols-[1fr_270px]">
          <div className="flex flex-col justify-center border-x border-white/14 px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-solar-gold">Próxima decisão</p>
            <h2 className="mt-6 max-w-4xl text-4xl font-black leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-[4.2rem]">Sua energia pode trabalhar a favor do seu futuro.</h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/64">Confirme viabilidade, economia estimada e a solução adequada ao seu imóvel ou operação.</p>
          </div>
          <a href={createWhatsAppUrl(buildGeneralWhatsAppMessage())} target="_blank" rel="noreferrer" className="group flex min-h-40 flex-col justify-between border-x border-t border-white/14 bg-white/[.06] p-7 text-white backdrop-blur-sm lg:border-l-0 lg:border-t-0 lg:p-9">
            <ArrowUpRight aria-hidden className="ml-auto h-8 w-8 text-solar-gold transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
            <span className="max-w-[180px] text-xl font-black leading-tight">Solicitar análise técnica</span>
          </a>
        </div>
      </Container>
    </section>
  );
}
