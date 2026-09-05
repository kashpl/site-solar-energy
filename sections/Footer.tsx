import type { ReactNode } from "react";
import Link from "next/link";
import { AtSign, Mail, MapPin, Phone } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { Container } from "@/components/Container";
import { company } from "@/data/company";
import {
  buildGeneralWhatsAppMessage,
  createWhatsAppUrl
} from "@/lib/whatsappFormatter";

const companyLinks = [
  ["Início", "/#inicio"],
  ["Soluções", "/#solucoes"],
  ["Projetos", "/#projetos"],
  ["Empresa", "/#sobre"],
  ["Dúvidas", "/#duvidas"]
];

const conversionLinks = [
  ["Simular economia", "/#simulador"],
  ["Solicitar análise", "/#contato"],
  ["Como funciona", "/#como-funciona"]
];

const contentLinks = [
  ["Como funciona a energia solar", "/guias/como-funciona-energia-solar"],
  ["Homologação", "/guias/homologacao-energia-solar"],
  ["Manutenção", "/guias/manutencao-energia-solar"],
  ["Retorno do investimento", "/guias/retorno-investimento-energia-solar"]
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#04141b] py-12 text-white">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_0.62fr_0.82fr_0.9fr_1.05fr]">
          <div>
            <BrandLogo variant="footer" />
            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-dark/65">
              Soluções em energia solar com engenharia, qualidade técnica, eficiência e
              relacionamento transparente.
            </p>
            <div className="mt-5 grid gap-2 text-xs leading-5 text-gray-dark/50">
              <span>CNPJ: {company.cnpj}</span>
              <span>{company.address}</span>
            </div>
          </div>

          <FooterColumn title="Navegação">
            {companyLinks.map(([label, href]) => (
              <a key={href} href={href} className="transition hover:text-solar-green">
                {label}
              </a>
            ))}
          </FooterColumn>

          <FooterColumn title="Próximo passo">
            {conversionLinks.map(([label, href]) => (
              <a key={href} href={href} className="transition hover:text-solar-green">
                {label}
              </a>
            ))}
          </FooterColumn>

          <FooterColumn title="Conteúdo">
            {contentLinks.map(([label, href]) => (
              <Link key={href} href={href} className="transition hover:text-solar-green">
                {label}
              </Link>
            ))}
          </FooterColumn>

          <FooterColumn title="Contato">
            <a
              href={createWhatsAppUrl(buildGeneralWhatsAppMessage())}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 transition hover:text-solar-green"
            >
              <Phone aria-hidden className="h-4 w-4 text-solar-green" />
              {company.whatsapp}
            </a>
            <a
              href={`mailto:${company.email}`}
              className="flex items-center gap-2 break-all transition hover:text-solar-green"
            >
              <Mail aria-hidden className="h-4 w-4 text-solar-green" />
              {company.email}
            </a>
            <a
              href={company.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 transition hover:text-solar-green"
            >
              <MapPin aria-hidden className="h-4 w-4 text-solar-green" />
              {company.location}
            </a>
            <a
              href={company.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 transition hover:text-solar-green"
            >
              <AtSign aria-hidden className="h-4 w-4 text-solar-green" />
              {company.instagram}
            </a>
          </FooterColumn>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-gray-dark/50 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} Solar Energy Qualidade e Eficiência. Todos os
            direitos reservados.
          </span>
          <Link href="/politica-de-privacidade" className="transition hover:text-solar-green">
            Política de Privacidade
          </Link>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-black text-white">{title}</h3>
      <div className="grid gap-3 text-sm text-gray-dark/65">{children}</div>
    </div>
  );
}
