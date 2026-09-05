export type PropertyType = "Residencial" | "Comercial" | "Industrial";

export type SimulatorInput = {
  billValue: number;
  propertyType: PropertyType;
  monthlyConsumptionKwh: number;
};

export type SimulatorResult = {
  estimatedPercent: number;
  monthlySavings: number;
  annualSavings: number;
  estimatedInvestment: number;
  estimatedRoiMonths: number;
  estimatedRoiLabel: string;
  co2ReductionKg: number;
  estimatedSystemPowerKwp: number;
  referenceInvestment: number;
  referenceConsumptionKwh: number;
  referenceSystemPowerKwp: number;
};

export const REFERENCE_MONTHLY_CONSUMPTION_KWH = 350;
export const REFERENCE_SYSTEM_POWER_KWP = 2.84;
export const REFERENCE_INVESTMENT_BRL = 8000;
export const INVESTMENT_PER_MONTHLY_KWH =
  REFERENCE_INVESTMENT_BRL / REFERENCE_MONTHLY_CONSUMPTION_KWH;
export const INVESTMENT_PER_KWP =
  REFERENCE_INVESTMENT_BRL / REFERENCE_SYSTEM_POWER_KWP;

const profiles: Record<PropertyType, { savingsRate: number }> = {
  Residencial: { savingsRate: 0.914 },
  Comercial: { savingsRate: 0.9 },
  Industrial: { savingsRate: 0.88 }
};

function roundCurrency(value: number) {
  return Math.round(value * 100) / 100;
}

export function formatPayback(months: number) {
  if (!Number.isFinite(months) || months <= 0) {
    return "Não informado";
  }

  const roundedMonths = Math.max(1, Math.round(months));

  if (roundedMonths < 12) {
    return `${roundedMonths} meses`;
  }

  const years = roundedMonths / 12;

  return `${roundedMonths} meses (aprox. ${years.toLocaleString("pt-BR", {
    maximumFractionDigits: 1
  })} anos)`;
}

export function calculateSolarSavings(input: SimulatorInput): SimulatorResult {
  const profile = profiles[input.propertyType];
  const estimatedPercent = profile.savingsRate;
  const monthlySavings = roundCurrency(input.billValue * estimatedPercent);
  const annualSavings = roundCurrency(monthlySavings * 12);
  const estimatedInvestment = roundCurrency(
    input.monthlyConsumptionKwh * INVESTMENT_PER_MONTHLY_KWH
  );
  const estimatedRoiMonths =
    monthlySavings > 0 ? estimatedInvestment / monthlySavings : 0;
  const co2ReductionKg = input.monthlyConsumptionKwh * 0.5;
  const estimatedSystemPowerKwp = roundCurrency(
    (input.monthlyConsumptionKwh / REFERENCE_MONTHLY_CONSUMPTION_KWH) *
      REFERENCE_SYSTEM_POWER_KWP
  );

  return {
    estimatedPercent,
    monthlySavings,
    annualSavings,
    estimatedInvestment,
    estimatedRoiMonths,
    estimatedRoiLabel: formatPayback(estimatedRoiMonths),
    co2ReductionKg,
    estimatedSystemPowerKwp,
    referenceInvestment: REFERENCE_INVESTMENT_BRL,
    referenceConsumptionKwh: REFERENCE_MONTHLY_CONSUMPTION_KWH,
    referenceSystemPowerKwp: REFERENCE_SYSTEM_POWER_KWP
  };
}
