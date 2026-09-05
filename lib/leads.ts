import type { LeadPayload, LeadSource, LeadValidationResult } from "@/types/lead";

const allowedSources = new Set<LeadSource>([
  "contact_form",
  "simulator",
  "whatsapp_cta",
  "project_cta"
]);

const sourceRequiresContact = new Set<LeadSource>(["contact_form", "simulator"]);

function stripHtml(value: string) {
  return value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]*>/g, " ");
}

function sanitizeString(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return undefined;
  }

  const sanitized = stripHtml(value)
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);

  return sanitized || undefined;
}

function sanitizeNumber(value: unknown) {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : Number.NaN;
}

function sanitizeSimulation(value: unknown): LeadPayload["simulation"] {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  const simulation = value as Record<string, unknown>;

  return {
    estimatedInvestment: sanitizeNumber(simulation.estimatedInvestment),
    estimatedSavingsPercent: sanitizeNumber(simulation.estimatedSavingsPercent),
    monthlySavings: sanitizeNumber(simulation.monthlySavings),
    annualSavings: sanitizeNumber(simulation.annualSavings),
    estimatedROI: sanitizeString(simulation.estimatedROI, 80),
    co2Reduction: sanitizeNumber(simulation.co2Reduction),
    estimatedSystemPowerKwp: sanitizeNumber(simulation.estimatedSystemPowerKwp),
    referenceInvestment: sanitizeNumber(simulation.referenceInvestment),
    referenceConsumptionKwh: sanitizeNumber(simulation.referenceConsumptionKwh),
    referenceSystemPowerKwp: sanitizeNumber(simulation.referenceSystemPowerKwp)
  };
}

function sanitizeProjectInterest(value: unknown): LeadPayload["projectInterest"] {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  const project = value as Record<string, unknown>;

  return {
    projectTitle: sanitizeString(project.projectTitle, 120),
    projectPower: sanitizeString(project.projectPower, 40),
    projectLocation: sanitizeString(project.projectLocation, 120)
  };
}

export function sanitizeLeadPayload(raw: unknown): LeadPayload {
  const input = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const source = sanitizeString(input.source, 40) as LeadSource | undefined;

  return {
    source: source && allowedSources.has(source) ? source : (source as LeadSource),
    name: sanitizeString(input.name, 120),
    whatsapp: sanitizeString(input.whatsapp, 32),
    email: sanitizeString(input.email, 180),
    city: sanitizeString(input.city, 120),
    propertyType: sanitizeString(input.propertyType, 60),
    averageBill: sanitizeNumber(input.averageBill),
    monthlyConsumption: sanitizeNumber(input.monthlyConsumption),
    message: sanitizeString(input.message, 1200),
    simulation: sanitizeSimulation(input.simulation),
    projectInterest: sanitizeProjectInterest(input.projectInterest),
    pageUrl: sanitizeString(input.pageUrl, 500),
    userAgent: sanitizeString(input.userAgent, 500),
    createdAt: sanitizeString(input.createdAt, 40)
  };
}

export function validateLeadPayload(payload: LeadPayload): LeadValidationResult {
  const errors: LeadValidationResult["errors"] = {};

  if (!payload.source || !allowedSources.has(payload.source)) {
    errors.source = "Origem do lead inválida.";
  }

  if (payload.source && sourceRequiresContact.has(payload.source)) {
    if (!payload.name) {
      errors.name = "Nome é obrigatório.";
    }

    const whatsappDigits = payload.whatsapp?.replace(/\D/g, "") ?? "";
    if (whatsappDigits.length < 10 || whatsappDigits.length > 13) {
      errors.whatsapp = "WhatsApp inválido.";
    }
  }

  if (payload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    errors.email = "E-mail inválido.";
  }

  if (
    payload.averageBill !== undefined &&
    (!Number.isFinite(payload.averageBill) || payload.averageBill < 0)
  ) {
    errors.averageBill = "Valor médio da conta inválido.";
  }

  if (
    payload.monthlyConsumption !== undefined &&
    (!Number.isFinite(payload.monthlyConsumption) || payload.monthlyConsumption < 0)
  ) {
    errors.monthlyConsumption = "Consumo mensal inválido.";
  }

  if (payload.city !== undefined && typeof payload.city !== "string") {
    errors.city = "Cidade inválida.";
  }

  if (payload.message && payload.message.length > 1200) {
    errors.message = "Mensagem muito longa.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

export function formatLeadForWebhook(payload: LeadPayload) {
  return {
    ...payload,
    receivedAt: payload.createdAt ?? new Date().toISOString(),
    sourceLabel: {
      contact_form: "Formulário de contato",
      simulator: "Simulador de economia",
      whatsapp_cta: "CTA de WhatsApp",
      project_cta: "Projeto semelhante"
    }[payload.source]
  };
}
