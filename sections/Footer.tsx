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
    <footer className="relative overflow-hidden border-t border-white/12 bg-[#00091a] text-white">
      <div aria-hidden className="header-spectrum h-px w-full" />
      <div aria-hidden className="absolute -right-28 top-8 h-72 w-72 rounded-full bg-solar-blue/[0.07] blur-[100px]" />
      <div aria-hidden className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-solar-green/[0.06] blur-[100px]" />

      <Container className="relative py-12 sm:py-14 lg:py-16">
        <div data-reveal className="grid gap-11 border-b border-white/12 pb-12 md:grid-cols-2 lg:grid-cols-[1.25fr_.7fr_.9fr_1.15fr] lg:gap-12 lg:pb-14">
          <div>
            <BrandLogo variant="footer" />
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/58">
              Engenharia fotovoltaica com projeto, homologação, instalação e acompanhamento técnico do início à operação.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-[0.65rem] font-bold uppercase tracking-[0.11em] text-white/58">
              <span className="rounded-full border border-white/12 px-3 py-2">Fortaleza · Ceará</span>
              <span className="rounded-full border border-solar-green/25 px-3 py-2 text-solar-green">Atuação no Nordeste</span>
            </div>
          </div>

          <div>
            <p className="text-[0.65rem] font-black uppercase tracking-[0.16em] text-solar-gold">Navegação</p>
            <nav aria-label="Navegação do rodapé" className="mt-5 grid gap-3 text-sm font-semibold text-white/62">
              {navigation.map(([label, href]) => <a key={href} href={href} className="w-fit transition-colors hover:text-white">{label}</a>)}
            </nav>
          </div>

          <div>
            <p className="text-[0.65rem] font-black uppercase tracking-[0.16em] text-solar-green">Conteúdo técnico</p>
            <nav aria-label="Guias técnicos" className="mt-5 grid gap-3 text-sm font-semibold text-white/62">
              {guides.map(([label, href]) => <Link key={href} href={href} className="w-fit transition-colors hover:text-white">{label}</Link>)}
            </nav>
          </div>

          <div>
            <p className="text-[0.65rem] font-black uppercase tracking-[0.16em] text-solar-blue">Contato e operação</p>
            <div className="mt-5 grid gap-4 text-sm">
              <a href={`mailto:${company.email}`} className="group flex items-center gap-3 text-white/68 transition-colors hover:text-white">
                <Mail aria-hidden className="h-4 w-4 shrink-0 text-solar-gold" />
                <span className="min-w-0 truncate font-semibold">{company.email}</span>
              </a>
              <a href={createWhatsAppUrl(buildGeneralWhatsAppMessage())} target="_blank" rel="noreferrer" className="group flex items-center gap-3 text-white/68 transition-colors hover:text-white">
                <Phone aria-hidden className="h-4 w-4 shrink-0 text-solar-green" />
                <span className="font-semibold">{company.whatsapp}</span>
              </a>
              <a href={company.mapsUrl} target="_blank" rel="noreferrer" className="group flex items-start gap-3 text-white/68 transition-colors hover:text-white">
                <MapPin aria-hidden className="mt-1 h-4 w-4 shrink-0 text-solar-blue" />
                <span className="max-w-xs font-semibold leading-6">{company.address}</span>
                <ArrowUpRight aria-hidden className="mt-1 h-4 w-4 shrink-0 text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6 text-xs text-white/42 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {company.name} · CNPJ {company.cnpj}</span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href={company.instagramUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-white"><Camera aria-hidden className="h-4 w-4 text-solar-orange" />Instagram</a>
            <Link href="/politica-de-privacidade" className="transition-colors hover:text-white">Política de Privacidade</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
