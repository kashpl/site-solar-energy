import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { Container } from "@/components/Container";
import { company } from "@/data/company";

const links = [
  ["Soluções", "/#solucoes"], ["Projetos", "/#projetos"], ["Simulador", "/#simulador"], ["Processo", "/#como-funciona"], ["Empresa", "/#sobre"], ["Contato", "/#contato"]
];

export function Footer() {
  return (
    <footer className="border-t border-white/12 bg-[#000d2e] py-12 text-white sm:py-16">
      <Container>
        <div className="grid gap-12 border-b border-white/15 pb-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div><BrandLogo variant="footer" /><p className="mt-6 max-w-md text-sm leading-7 text-white/58">Soluções fotovoltaicas com engenharia, rastreabilidade e acompanhamento do início à operação.</p></div>
          <nav aria-label="Navegação do rodapé" className="grid grid-cols-2 border-t border-white/15 sm:grid-cols-3 lg:border-t-0">
            {links.map(([label, href], index) => <a key={href} href={href} className="flex items-center justify-between border-b border-white/15 py-4 text-sm font-bold hover:text-solar-green sm:px-5"><span>0{index + 1} · {label}</span><ArrowUpRight aria-hidden className="h-4 w-4" /></a>)}
          </nav>
        </div>

        <div className="grid gap-8 py-9 text-sm lg:grid-cols-[1fr_1fr_1.2fr]">
          <div><p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white/38">Contato</p><a href={`mailto:${company.email}`} className="mt-3 block break-all font-semibold hover:text-solar-green">{company.email}</a><p className="mt-2 font-semibold">{company.whatsapp}</p></div>
          <div><p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white/38">Base operacional</p><a href={company.mapsUrl} target="_blank" rel="noreferrer" className="mt-3 block max-w-sm font-semibold leading-6 hover:text-solar-green">{company.address}</a></div>
          <div><p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white/38">Conteúdo técnico</p><div className="mt-3 grid gap-2 sm:grid-cols-2"><Link href="/guias/como-funciona-energia-solar" className="hover:text-solar-green">Como funciona</Link><Link href="/guias/homologacao-energia-solar" className="hover:text-solar-green">Homologação</Link><Link href="/guias/manutencao-energia-solar" className="hover:text-solar-green">Manutenção</Link><Link href="/guias/retorno-investimento-energia-solar" className="hover:text-solar-green">Retorno do investimento</Link></div></div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-white/42 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} {company.name} · CNPJ {company.cnpj}</span><div className="flex gap-5"><a href={company.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-solar-green">Instagram</a><Link href="/politica-de-privacidade" className="hover:text-solar-green">Privacidade</Link></div></div>
      </Container>
    </footer>
  );
}
