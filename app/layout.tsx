import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Archivo, Manrope } from "next/font/google";
import { AnalyticsConsent } from "@/components/AnalyticsConsent";
import { company } from "@/data/company";
import "./globals.css";

const siteUrl = company.siteUrl;

const displayFont = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Energia Solar em Fortaleza e Ceará | Solar Energy",
    template: "%s | Solar Energy Qualidade e Eficiência"
  },
  description:
    "Energia solar em Fortaleza e no Ceará para residências, empresas e usinas. Simule sua economia e fale com a equipe da Solar Energy.",
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
    title: "Energia Solar em Fortaleza e Ceará | Solar Energy",
    description:
      "Projetos fotovoltaicos com engenharia, homologação, instalação e suporte para residências, empresas e usinas.",
    url: siteUrl,
    siteName: "Solar Energy Qualidade e Eficiência",
    locale: "pt_BR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Energia Solar em Fortaleza e Ceará | Solar Energy",
    description:
      "Projetos fotovoltaicos com engenharia, homologação, instalação e suporte."
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/solar-energy-logo.png"
  }
};

const localBusinessSchema = {
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#empresa`,
  name: company.name,
  alternateName: company.shortName,
  url: siteUrl,
  logo: `${siteUrl}/solar-energy-logo.png`,
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

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Solar Energy",
      alternateName: "Solar Energy Qualidade e Eficiência",
      inLanguage: "pt-BR",
      publisher: { "@id": `${siteUrl}/#empresa` }
    },
    localBusinessSchema
  ]
};

export const viewport: Viewport = {
  themeColor: "#020b16",
  colorScheme: "light"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>
        <a
          href="#conteudo-principal"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-white px-4 py-3 font-bold text-navy shadow-xl transition-transform focus:translate-y-0"
        >
          Pular para o conteúdo
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteSchema).replace(/</g, "\\u003c")
          }}
        />
        {children}
        <AnalyticsConsent />
      </body>
    </html>
  );
}
