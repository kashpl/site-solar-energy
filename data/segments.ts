export const segmentThemes = {
  Residencial: { code: "RES", label: "Residencial", color: "#35b957" },
  Comercial: { code: "COM", label: "Comercial", color: "#1479d8" },
  Industrial: { code: "IND", label: "Industrial", color: "#f06a18" },
  Usina: { code: "USI", label: "Usinas e grandes projetos", color: "#e6b329" }
} as const;

export type SegmentName = keyof typeof segmentThemes;

