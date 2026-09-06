import { ArrowUpRight, Calculator, Check, Mail, MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { company } from "@/data/company";
import { buildGeneralWhatsAppMessage, createWhatsAppUrl } from "@/lib/whatsappFormatter";

const flow = [
  ["01", "Simule sem cadastro", "Informe consumo, conta média, imóvel e cidade para gerar uma estimativa inicial."],
  ["02", "Veja o potencial", "O resultado organiza economia, potência sugerida, investimento e retorno estimado."],
  ["03", "Solicite a análise", "Nome e WhatsApp são solicitados somente quando você decide enviar o resultado à equipe."]
];

export function Contact() {
  return (
    <section id="contato" className="section-transition-dark pb-16 pt-16 text-white sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
      <Container>
        <div data-reveal className="grid gap-8 border-t border-white/16 pt-6 lg:grid-cols-[0.55fr_1.45fr] lg:gap-16">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-solar-orange">08 / Próximo passo</p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-solar-green/25 bg-solar-green/[0.07] px-3 py-2 text-[0.66rem] font-black uppercase tracking-[0.12em] text-solar-green">
              <ShieldCheck aria-hidden className="h-4 w-4" /> Fluxo único e transparente
            </div>
          </div>
          <div>
            <h2 className="section-heading max-w-[820px] font-black">Simule primeiro. Avance quando o resultado fizer sentido.</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/65">Sua estimativa nasce no simulador e segue com todos os dados para uma única conversa no WhatsApp.</p>
          </div>
        </div>

        <div data-reveal className="mt-10 grid overflow-hidden rounded-[20px] border border-white/14 bg-[#001a4d] shadow-[0_20px_64px_rgba(0,0,0,.24)] lg:grid-cols-[1.25fr_.75fr] lg:mt-12">
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="flex items-center justify-between gap-5 border-b border-white/14 pb-6">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-solar-green">Da conta ao atendimento</p>
                <h3 className="mt-3 text-2xl font-black">Um caminho. Três etapas.</h3>
              </div>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] text-solar-gold"><Calculator aria-hidden className="h-5 w-5" /></span>
            </div>

            <ol className="mt-2">
              {flow.map(([number, title, description]) => (
                <li key={number} className="grid gap-3 border-b border-white/12 py-6 sm:grid-cols-[48px_.7fr_1.3fr] sm:gap-6">
                  <span className="text-xs font-black tracking-[0.12em] text-solar-gold">{number}</span>
                  <strong className="text-base font-black">{title}</strong>
                  <p className="text-sm leading-6 text-white/58">{description}</p>
                </li>
              ))}
            </ol>

            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button href="#simulador" showArrow className="sm:min-w-[230px]">Começar pelo simulador</Button>
              <p className="flex items-start gap-2 text-xs leading-5 text-white/50"><Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-solar-green" /> Resultado imediato. Contato solicitado apenas ao avançar.</p>
            </div>
          </div>

          <aside className="border-t border-white/14 bg-[#07182b] p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-solar-blue">Canais diretos</p>
            <h3 className="mt-4 max-w-sm text-2xl font-black leading-tight tracking-[-0.03em]">Precisa falar com a equipe antes?</h3>
            <p className="mt-4 text-sm leading-7 text-white/55">Use os canais abaixo para dúvidas técnicas ou comerciais. Para orçamento, o simulador organiza melhor o primeiro atendimento.</p>

            <div className="mt-8 border-t border-white/14">
              <a href={createWhatsAppUrl(buildGeneralWhatsAppMessage())} target="_blank" rel="noreferrer" className="group flex items-center gap-4 border-b border-white/14 py-5 transition-colors hover:text-solar-green">
                <MessageCircle aria-hidden className="h-5 w-5 shrink-0 text-solar-green" />
                <span><small className="block text-[0.62rem] font-black uppercase tracking-[0.13em] text-white/42">WhatsApp</small><strong className="mt-1 block text-sm">{company.whatsapp}</strong></span>
                <ArrowUpRight aria-hidden className="ml-auto h-4 w-4 text-white/35 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a href={`mailto:${company.email}`} className="group flex items-center gap-4 border-b border-white/14 py-5 transition-colors hover:text-solar-gold">
                <Mail aria-hidden className="h-5 w-5 shrink-0 text-solar-gold" />
                <span className="min-w-0"><small className="block text-[0.62rem] font-black uppercase tracking-[0.13em] text-white/42">E-mail</small><strong className="mt-1 block truncate text-sm">{company.email}</strong></span>
                <ArrowUpRight aria-hidden className="ml-auto h-4 w-4 text-white/35 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a href={company.mapsUrl} target="_blank" rel="noreferrer" className="group flex items-start gap-4 border-b border-white/14 py-5 transition-colors hover:text-solar-blue">
                <MapPin aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-solar-blue" />
                <span><small className="block text-[0.62rem] font-black uppercase tracking-[0.13em] text-white/42">Endereço</small><strong className="mt-1 block text-sm leading-6">{company.address}</strong></span>
                <ArrowUpRight aria-hidden className="ml-auto mt-0.5 h-4 w-4 shrink-0 text-white/35 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
