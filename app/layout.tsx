import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { AnalyticsConsent } from "@/components/AnalyticsConsent";
import { company } from "@/data/company";
import "./globals.css";

const siteUrl = company.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Energia Solar em Fortaleza e Ceará | Solar Energy",
    template: "%s | Solar Energy Qualidade e Eficiência"
  },
  description:
    "Projetos de energia solar em Fortaleza e no Ceará para residências, empresas e operações de grande porte, com engenharia, homologação e suporte.",
  applicationName: company.name,
  category: "energia solar",
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  openGraph: {
    title: "Solar Energy Qualidade e Eficiência",
    description:
      "Energia solar inteligente para reduzir custos, aumentar eficiência e gerar oportunidades reais de economia.",
    url: siteUrl,
    siteName: "Solar Energy Qualidade e Eficiência",
    locale: "pt_BR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Solar Energy Qualidade e Eficiência",
    description:
      "Soluções solares de alto padrão para residências, empresas e grandes projetos."
  },
  icons: {
    icon: "/brand-mark.svg",
    shortcut: "/brand-mark.svg",
    apple: "/brand-mark.svg"
  }
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#empresa`,
  name: company.name,
  alternateName: company.shortName,
  url: siteUrl,
  logo: `${siteUrl}/brand-mark.svg`,
  image: `${siteUrl}/images/optimized/usina.webp`,
  telephone: company.whatsapp,
  email: company.email,
  taxID: company.cnpj,
  description:
    "Empresa de projetos, instalação, homologação, manutenção e monitoramento de sistemas de energia solar.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Avenida Barão de Studart, 1165, Loja 05",
    addressLocality: "Fortaleza",
    addressRegion: "CE",
    addressCountry: "BR"
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Ceará"
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: company.whatsapp,
    contactType: "sales",
    areaServed: "BR",
    availableLanguage: "Portuguese"
  },
  sameAs: [company.instagramUrl],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Soluções de energia solar",
    itemListElement: [
      "Energia solar residencial",
      "Energia solar empresarial",
      "Usinas solares",
      "Projeto e homologação",
      "Manutenção e monitoramento"
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name }
    }))
  }
};

export const viewport: Viewport = {
  themeColor: "#06171f",
  colorScheme: "dark"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c")
          }}
        />
        {children}
        <AnalyticsConsent />
      </body>
    </html>
  );
}
