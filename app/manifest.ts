import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Solar Energy Qualidade e Eficiência",
    short_name: "Solar Energy",
    description:
      "Projetos de energia solar para residências, empresas e operações de grande porte.",
    start_url: "/",
    display: "standalone",
    background_color: "#020812",
    theme_color: "#020b16",
    lang: "pt-BR",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any"
      }
    ]
  };
}
