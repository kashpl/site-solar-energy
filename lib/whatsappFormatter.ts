import { company } from "@/data/company";
import type { PropertyType, SimulatorResult } from "@/lib/simulatorCalculations";
import { formatCurrency } from "@/lib/utils";

export function normalizedWhatsAppNumber(phone = company.whatsapp) {
  return phone.replace(/\D/g, "");
}

export function createWhatsAppUrl(message: string) {
  return `https://wa.me/${normalizedWhatsAppNumber()}?text=${encodeURIComponent(
    message
  )}`;
}

export function buildGeneralWhatsAppMessage() {
  return "Olá! Gostaria de solicitar um orçamento gratuito para energia solar.";
}

export function buildFloatingWhatsAppMessage() {
  return "Olá! Gostaria de solicitar uma análise gratuita para energia solar.";
}

export function buildSolutionWhatsAppMessage() {
  return "Olá! Gostaria de conversar com um especialista sobre energia solar.";
}

export function buildProjectWhatsAppMessage(projectTitle?: string) {
  if (projectTitle) {
    return `Olá! Vi o projeto ${projectTitle} no site da Solar Energy e gostaria de solicitar um projeto semelhante.`;
  }

  return "Olá! Vi um projeto realizado no site da Solar Energy e gostaria de solicitar um projeto semelhante.";
}

export function buildContactWhatsAppMessage(data: {
  name: string;
  city: string;
  propertyType: string;
  billValue: string;
  message: string;
}) {
  const details = [
    data.name.trim() ? `Meu nome é ${data.name.trim()}.` : "",
    data.city.trim() ? `Sou de ${data.city.trim()}.` : "",
    data.propertyType.trim() ? `O imóvel é ${data.propertyType.trim().toLowerCase()}.` : "",
    data.billValue.trim() ? `A conta de energia é aproximadamente ${data.billValue.trim()}.` : "",
    data.message.trim() ? `Mensagem: ${data.message.trim()}.` : ""
  ].filter(Boolean);

  return [
    "Olá! Gostaria de solicitar uma análise para energia solar.",
    ...details
  ].join(" ");
}

export function buildSimulatorWhatsAppMessage(data: {
  name: string;
  whatsapp: string;
  city: string;
  propertyType: PropertyType;
  billValue: number;
  monthlyConsumptionKwh: number;
  result: SimulatorResult;
}) {
  const fallback = "Não informado";
  const economyPercent = Math.round(data.result.estimatedPercent * 100);

  return [
    "Olá! Fiz uma simulação no site da Solar Energy e gostaria de receber uma proposta.",
    "",
    "📌 Dados do cliente:",
    `Nome: ${data.name.trim() || fallback}`,
    `WhatsApp: ${data.whatsapp.trim() || fallback}`,
    `Cidade/Estado: ${data.city.trim() || fallback}`,
    `Tipo de imóvel: ${data.propertyType || fallback}`,
    "",
    "⚡ Dados de consumo:",
    `Valor médio da conta: ${
      data.billValue > 0 ? formatCurrency(data.billValue) : fallback
    }`,
    `Consumo médio mensal: ${
      data.monthlyConsumptionKwh > 0 ? data.monthlyConsumptionKwh : fallback
    } kWh`,
    "",
    "☀️ Resultado estimado:",
    `Investimento estimado: ${formatCurrency(data.result.estimatedInvestment)}`,
    `Economia estimada: ${Number.isFinite(economyPercent) ? economyPercent : fallback}%`,
    `Economia mensal: ${formatCurrency(data.result.monthlySavings)}`,
    `Economia anual: ${formatCurrency(data.result.annualSavings)}`,
    `Retorno estimado: ${data.result.estimatedRoiLabel}`,
    `Potência estimada do sistema: ${data.result.estimatedSystemPowerKwp.toLocaleString("pt-BR", {
      maximumFractionDigits: 2
    })} kWp`,
    `Redução de CO₂: ${data.result.co2ReductionKg.toFixed(1)} kg/mês`,
    "",
    "Gostaria de uma análise gratuita para confirmar a melhor solução para meu caso."
  ].join("\n");
}
