import Link from "next/link";
import { ArrowUpRight, Camera, Mail, MapPin, Phone } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { Container } from "@/components/Container";
import { company } from "@/data/company";
import { buildGeneralWhatsAppMessage, createWhatsAppUrl } from "@/lib/whatsappFormatter";

const navigation = [
  ["Soluções", "/#solucoes"],
  ["Projetos", "/#projetos"],
  ["Simulador", "/#simulador"],
  ["Processo", "/#como-funciona"],
  ["Empresa", "/#sobre"],
  ["Contato", "/#contato"]
];

const guides = [
  ["Como funciona", "/guias/como-funciona-energia-solar"],
  ["Homologação", "/guias/homologacao-energia-solar"],
  ["Manutenção", "/guias/manutencao-energia-solar"],
  ["Retorno do investimento", "/guias/retorno-investimento-energia-solar"]
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#00091a] pb-6 pt-5 text-white sm:pb-8 sm:pt-8">
      <div aria-hidden className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-solar-blue/10 blur-[90px]" />
      <div aria-hidden className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-solar-green/[0.08] blur-[90px]" />

      <Container className="relative">
        <div data-reveal className="overflow-hidden rounded-[28px] border border-white/12 bg-[#00132f] shadow-[0_28px_90px_rgba(0,0,0,.28)]">
          <div aria-hidden className="header-spectrum h-px w-full" />

          <div className="grid gap-9 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:px-10">
            <div>
              <BrandLogo variant="footer" />
              <p className="mt-6 max-w-md text-sm leading-7 text-white/60">
                Engenharia fotovoltaica com projeto, homologação, instalação e acompanhamento técnico do início à operação.
              </p>
              <div className="mt-7 flex flex-wrap gap-2 text-[0.68rem] font-bold uppercase tracking-[0.11em] text-white/62">
                <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-2">Fortaleza · Ceará</span>
                <span className="rounded-full border border-solar-green/25 bg-solar-green/[0.07] px-3 py-2 text-solar-green">Atuação no Nordeste</span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <a href={`mailto:${company.email}`} className="group flex items-center gap-4 rounded-2xl border border-white/[0.09] bg-white/[0.035] p-4 transition-[background-color,border-color] hover:border-solar-gold/30 hover:bg-white/[0.07]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-solar-gold/12 text-solar-gold"><Mail aria-hidden className="h-4 w-4" /></span>
                <span className="min-w-0"><small className="block text-[0.62rem] font-black uppercase tracking-[0.13em] text-white/42">E-mail</small><strong className="mt-1 block truncate text-sm">{company.email}</strong></span>
                <ArrowUpRight aria-hidden className="ml-auto h-4 w-4 shrink-0 text-white/35 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a href={createWhatsAppUrl(buildGeneralWhatsAppMessage())} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-2xl border border-white/[0.09] bg-white/[0.035] p-4 transition-[background-color,border-color] hover:border-solar-green/35 hover:bg-white/[0.07]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-solar-green/12 text-solar-green"><Phone aria-hidden className="h-4 w-4" /></span>
                <span><small className="block text-[0.62rem] font-black uppercase tracking-[0.13em] text-white/42">WhatsApp</small><strong className="mt-1 block text-sm">{company.whatsapp}</strong></span>
                <ArrowUpRight aria-hidden className="ml-auto h-4 w-4 shrink-0 text-white/35 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a href={company.mapsUrl} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-2xl border border-white/[0.09] bg-white/[0.035] p-4 transition-[background-color,border-color] hover:border-solar-blue/35 hover:bg-white/[0.07] sm:col-span-2">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-solar-blue/12 text-solar-blue"><MapPin aria-hidden className="h-4 w-4" /></span>
                <span className="min-w-0"><small className="block text-[0.62rem] font-black uppercase tracking-[0.13em] text-white/42">Base operacional</small><strong className="mt-1 block text-sm leading-6 text-white/85">{company.address}</strong></span>
                <ArrowUpRight aria-hidden className="ml-auto h-4 w-4 shrink-0 text-white/35 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          <div className="grid gap-10 border-t border-white/10 px-6 py-8 sm:px-8 lg:grid-cols-[1fr_1fr_.7fr] lg:px-10">
            <div>
              <p className="text-[0.65rem] font-black uppercase tracking-[0.16em] text-solar-gold">Navegação</p>
              <nav aria-label="Navegação do rodapé" className="mt-5 grid grid-cols-2 gap-x-7 gap-y-3 text-sm font-semibold text-white/65 sm:grid-cols-3 lg:grid-cols-2">
                {navigation.map(([label, href]) => <a key={href} href={href} className="w-fit transition-colors hover:text-white">{label}</a>)}
              </nav>
            </div>
            <div>
              <p className="text-[0.65rem] font-black uppercase tracking-[0.16em] text-solar-green">Conteúdo técnico</p>
              <nav aria-label="Guias técnicos" className="mt-5 grid gap-3 text-sm font-semibold text-white/65 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {guides.map(([label, href]) => <Link key={href} href={href} className="w-fit transition-colors hover:text-white">{label}</Link>)}
              </nav>
            </div>
            <div>
              <p className="text-[0.65rem] font-black uppercase tracking-[0.16em] text-solar-blue">Empresa</p>
              <dl className="mt-5 text-sm">
                <dt className="text-white/42">CNPJ</dt><dd className="mt-1 font-semibold text-white/80">{company.cnpj}</dd>
              </dl>
              <a href={company.instagramUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/12 px-3 py-2 text-xs font-bold text-white/70 transition-[background-color,color] hover:bg-white/[0.07] hover:text-white"><Camera aria-hidden className="h-4 w-4 text-solar-orange" />{company.instagram}</a>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-white/10 px-6 py-5 text-xs text-white/42 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
            <span>© {new Date().getFullYear()} {company.name}. Todos os direitos reservados.</span>
            <Link href="/politica-de-privacidade" className="w-fit transition-colors hover:text-white">Política de Privacidade</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
