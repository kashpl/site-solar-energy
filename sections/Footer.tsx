import type { ReactNode } from "react";
import { AtSign, Mail, MapPin, Phone } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { Container } from "@/components/Container";
import { company } from "@/data/company";
import {
  buildGeneralWhatsAppMessage,
  createWhatsAppUrl
} from "@/lib/whatsappFormatter";

const companyLinks = [
  ["Início", "#inicio"],
  ["Sobre", "#sobre"],
  ["Benefícios", "#beneficios"],
  ["Projetos", "#projetos"]
];

const services = [
  "Energia solar residencial",
  "Energia solar empresarial",
  "Usinas solares",
  "Manutenção e monitoramento",
  "Projeto e homologação"
];

const conversionLinks = [
  ["Simulador de economia", "#simulador"],
  ["Solicitar análise", "#contato"],
  ["Como funciona", "#como-funciona"]
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#001236] py-12 text-white">
      <div aria-hidden className="solar-cell-texture absolute inset-0 opacity-20" />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_86%_18%,rgba(255,215,0,0.10),transparent_28%),radial-gradient(circle_at_10%_86%,rgba(0,208,132,0.10),transparent_30%)]" />
      <Container className="relative">
        <div className="rounded-lg border border-white/[0.1] bg-white/[0.045] p-6 shadow-[0_22px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-8">
          <div className="grid gap-10 lg:grid-cols-[1.35fr_0.75fr_0.9fr_0.85fr_1.1fr]">
            <div>
              <BrandLogo variant="footer" />
              <p className="mt-4 text-lg font-bold text-solar-green">{company.slogan}</p>
              <p className="mt-3 max-w-sm text-sm leading-7 text-gray-dark/75">
                Soluções em energia solar com foco em engenharia, qualidade técnica,
                eficiência e relacionamento transparente.
              </p>
              <div className="mt-5 grid gap-2 text-sm text-gray-dark/70">
                <span>CNPJ: {company.cnpj}</span>
                <span>{company.address}</span>
              </div>
            </div>

            <FooterColumn title="Empresa">
              {companyLinks.map(([label, href]) => (
                <a key={href} href={href} className="transition hover:text-solar-green">
                  {label}
                </a>
              ))}
            </FooterColumn>

            <FooterColumn title="Soluções">
              {services.map((service) => (
                <span key={service}>{service}</span>
              ))}
            </FooterColumn>

            <FooterColumn title="Conversão">
              {conversionLinks.map(([label, href]) => (
                <a key={href} href={href} className="transition hover:text-solar-green">
                  {label}
                </a>
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
                <Mail aria-hidden className="h-4 w-4 text-solar-gold" />
                {company.email}
              </a>
              <span className="flex items-center gap-2">
                <MapPin aria-hidden className="h-4 w-4 text-solar-green" />
                {company.location}
              </span>
              <a
                href="https://www.instagram.com/solar_energyqe"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 transition hover:text-solar-green"
              >
                <AtSign aria-hidden className="h-4 w-4 text-solar-gold" />
                {company.instagram}
              </a>
            </FooterColumn>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.12] pt-6 text-sm text-gray-dark/70 sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 Solar Energy Qualidade e Eficiência. Todos os direitos reservados.</span>
            <span className="text-gray-dark/[0.55]">Energia limpa, engenharia e economia real.</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  children
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-4 text-base font-bold text-white">{title}</h3>
      <div className="grid gap-3 text-sm text-gray-dark/75">{children}</div>
    </div>
  );
}
