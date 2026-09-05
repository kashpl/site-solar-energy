import { projects } from "@/data/projects";

const caseMetadata = [
  {
    slug: "residencial-premium-aquiraz",
    summary:
      "Aplicação residencial dimensionada para combinar economia estimada, acabamento técnico e valorização do imóvel.",
    scope: ["Análise de consumo", "Dimensionamento residencial", "Instalação", "Orientação pós-entrega"]
  },
  {
    slug: "empresa-comercial-fortaleza",
    summary:
      "Projeto comercial estruturado para reduzir custos operacionais e ampliar a previsibilidade energética da empresa.",
    scope: ["Análise da unidade", "Projeto comercial", "Homologação", "Instalação coordenada"]
  },
  {
    slug: "projeto-industrial-sobral",
    summary:
      "Sistema industrial com engenharia aplicada, atenção à segurança operacional e foco em geração consistente.",
    scope: ["Levantamento técnico", "Engenharia industrial", "Execução segura", "Acompanhamento de geração"]
  },
  {
    slug: "usina-solar-corporativa-jaboatao",
    summary:
      "Usina solar corporativa de maior escala, dimensionada para alta geração e expansão de capacidade energética.",
    scope: ["Estudo de capacidade", "Engenharia de grande porte", "Execução por etapas", "Gestão técnica"]
  }
];

export const caseStudies = projects.map((project, index) => ({
  ...project,
  ...caseMetadata[index]
}));

export type CaseStudy = (typeof caseStudies)[number];
