import { ArrowUpRight, Check, MessageCircle } from "lucide-react";
import { Container } from "@/components/Container";
import { buildGeneralWhatsAppMessage, createWhatsAppUrl } from "@/lib/whatsappFormatter";

export function CTAFinal() {
  return (
    <section className="brand-aurora relative overflow-hidden py-5 text-white sm:py-8">
      <div aria-hidden className="absolute -right-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full border border-solar-gold/20" />
      <div aria-hidden className="absolute right-4 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full border border-solar-green/20" />
      <Container className="relative">
        <div data-reveal className="grid overflow-hidden rounded-[28px] border border-white/14 bg-[#020b16]/72 shadow-[0_28px_90px_rgba(0,0,0,.28)] backdrop-blur-sm lg:grid-cols-[1fr_340px]">
          <div className="flex min-h-[320px] flex-col justify-center px-6 py-12 sm:px-10 lg:px-14">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-solar-gold">Próxima decisão</p>
            <h2 className="mt-5 max-w-4xl text-4xl font-black leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-[3.7rem]">Sua energia pode trabalhar a favor do seu futuro.</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/65">Confirme viabilidade, economia estimada e a solução adequada ao seu imóvel ou operação.</p>
          </div>
          <a href={createWhatsAppUrl(buildGeneralWhatsAppMessage())} target="_blank" rel="noreferrer" className="group relative flex min-h-64 flex-col justify-between overflow-hidden border-t border-white/14 bg-[linear-gradient(145deg,rgba(230,179,41,.16),rgba(53,185,87,.07))] p-7 text-white transition-[background-color] hover:bg-white/[.1] lg:min-h-0 lg:border-l lg:border-t-0 lg:p-9">
            <div aria-hidden className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-solar-gold/12 blur-3xl" />
            <div className="relative flex items-start justify-between gap-5">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/14 bg-white/[0.07] text-solar-green"><MessageCircle aria-hidden className="h-5 w-5" /></span>
              <ArrowUpRight aria-hidden className="h-7 w-7 text-solar-gold transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
            <span className="relative mt-10">
              <small className="flex items-center gap-2 text-[0.65rem] font-black uppercase tracking-[0.14em] text-solar-green"><Check aria-hidden className="h-4 w-4" /> Análise inicial sem custo</small>
              <strong className="mt-3 block max-w-[230px] text-2xl font-black leading-tight">Solicitar análise técnica</strong>
              <span className="mt-3 block text-sm text-white/55">Atendimento direto pelo WhatsApp</span>
            </span>
          </a>
        </div>
      </Container>
    </section>
  );
}
