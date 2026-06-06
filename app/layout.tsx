import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://solarenergyqualidade.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Solar Energy Qualidade e Eficiência | Energia solar inteligente",
    template: "%s | Solar Energy Qualidade e Eficiência"
  },
  description:
    "Soluções em energia solar para residências, empresas e grandes projetos, com tecnologia, segurança e alta performance.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Solar Energy Qualidade e Eficiência",
    description:
      "Energia solar inteligente para reduzir custos, aumentar eficiência e gerar oportunidades reais de economia.",
    url: siteUrl,
    siteName: "Solar Energy Qualidade e Eficiência",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/images/optimized/final.webp",
        width: 1448,
        height: 1086,
        alt: "Logo oficial Solar Energy Qualidade e Eficiência"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Solar Energy Qualidade e Eficiência",
    description:
      "Soluções solares de alto padrão para residências, empresas e grandes projetos.",
    images: ["/images/optimized/final.webp"]
  },
  icons: {
    icon: "/images/optimized/icone.webp",
    shortcut: "/images/optimized/icone.webp",
    apple: "/images/optimized/icone.webp"
  }
};

export const viewport: Viewport = {
  themeColor: "#001a4d",
  colorScheme: "dark"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
