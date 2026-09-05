import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Solar Energy Qualidade e Eficiência",
    short_name: "Solar Energy",
    description:
      "Projetos de energia solar para residências, empresas e operações de grande porte.",
    start_url: "/",
    display: "standalone",
    background_color: "#06171f",
    theme_color: "#06171f",
    lang: "pt-BR",
    icons: [
      {
        src: "/brand-mark.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any"
      }
    ]
  };
}
