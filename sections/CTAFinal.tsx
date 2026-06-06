import { BadgeCheck, Phone, ShieldCheck, SunMedium, TrendingDown } from "lucide-react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import {
  buildGeneralWhatsAppMessage,
  createWhatsAppUrl
} from "@/lib/whatsappFormatter";

export function CTAFinal() {
  return (
    <section className="relative overflow-hidden bg-navy py-16 sm:py-20">
      <div className="absolute inset-0 solar-cell-texture opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(255,215,0,0.28),transparent_34%),radial-gradient(circle_at_20%_82%,rgba(0,208,132,0.22),transparent_32%)]" />
      <div
        aria-hidden
        className="animate-pulse-slow absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(255,215,0,0.16),transparent_34%)]"
      />

      <Container className="relative">
        <div className="relative overflow-hidden rounded-lg border border-white/[0.16] bg-white/[0.075] p-6 shadow-[0_26px_90px_rgba(0,0,0,0.3)] backdrop-blur-2xl sm:p-8 lg:p-10">
          <div aria-hidden className="cta-solar-emblem hidden lg:block" />
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_260px]">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-solar-green/25 bg-solar-green/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-solar-green">
                <BadgeCheck aria-hidden className="h-4 w-4" />
                Análise gratuita
              </div>
              <h2 className="max-w-3xl text-3xl font-black leading-tight text-white sm:text-5xl">
                Pronto para transformar luz solar em economia previsível?
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-dark/80">
                Fale com a equipe da Solar Energy e receba uma primeira avaliação para
                entender viabilidade, economia estimada e melhor solução para seu imóvel.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  { icon: BadgeCheck, label: "Sem compromisso" },
                  { icon: ShieldCheck, label: "Atendimento especializado" },
                  { icon: TrendingDown, label: "Economia estimada" }
                ].map((item) => (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.07] px-4 py-2 text-sm font-bold text-gray-dark/85"
                  >
                    <item.icon aria-hidden className="h-4 w-4 text-solar-green" />
                    {item.label}
                  </span>
                ))}
              </div>
              <Button
                href={createWhatsAppUrl(buildGeneralWhatsAppMessage())}
                target="_blank"
                rel="noreferrer"
                className="mt-8"
                icon={<Phone aria-hidden className="h-4 w-4" />}
                showArrow
              >
                Quero meu orçamento gratuito
              </Button>
            </div>
            <div className="hidden lg:flex justify-end">
              <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-solar-gold/25 bg-solar-gold/10 text-solar-gold shadow-gold">
                <SunMedium aria-hidden className="h-14 w-14" />
                <div className="absolute inset-4 rounded-full border border-white/[0.12]" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
