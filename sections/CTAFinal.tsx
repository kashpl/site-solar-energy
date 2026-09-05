import { ArrowUpRight, BadgeCheck, Phone } from "lucide-react";
import { Container } from "@/components/Container";
import {
  buildGeneralWhatsAppMessage,
  createWhatsAppUrl
} from "@/lib/whatsappFormatter";

export function CTAFinal() {
  return (
    <section className="bg-[#f4f6f0] pb-16 sm:pb-20 lg:pb-24">
      <Container>
        <div className="relative overflow-hidden rounded-[30px] bg-solar-green p-7 text-navy sm:p-10 lg:p-14">
          <div
            aria-hidden
            className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[48px] border-[#071e27]/[0.06]"
          />
          <div className="relative grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em]">
                <BadgeCheck aria-hidden className="h-4 w-4" />
                Análise inicial gratuita
              </p>
              <h2 className="mt-5 max-w-4xl text-3xl font-black leading-[1.04] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                Transforme sua conta de energia em uma decisão de investimento.
              </h2>
              <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-[#25402f] sm:text-lg">
                Fale com a equipe e confirme viabilidade, economia estimada e a solução
                mais adequada ao seu imóvel ou operação.
              </p>
            </div>
            <a
              href={createWhatsAppUrl(buildGeneralWhatsAppMessage())}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-navy px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#0d303d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy"
            >
              <Phone aria-hidden className="h-4 w-4" />
              Solicitar orçamento
              <ArrowUpRight aria-hidden className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
