export type LeadSource = "contact_form" | "simulator" | "whatsapp_cta" | "project_cta";

export type LeadPayload = {
  source: LeadSource;
  name?: string;
  whatsapp?: string;
  email?: string;
  city?: string;
  propertyType?: "residencial" | "comercial" | "industrial" | string;
  averageBill?: number;
  monthlyConsumption?: number;
  message?: string;
  simulation?: {
    estimatedInvestment?: number;
    estimatedSavingsPercent?: number;
    monthlySavings?: number;
    annualSavings?: number;
    estimatedROI?: string;
    co2Reduction?: number;
    referenceInvestment?: number;
    referenceConsumptionKwh?: number;
    referenceSystemPowerKwp?: number;
  };
  projectInterest?: {
    projectTitle?: string;
    projectPower?: string;
    projectLocation?: string;
  };
  pageUrl?: string;
  userAgent?: string;
  createdAt?: string;
};

export type LeadValidationResult = {
  valid: boolean;
  errors: Partial<Record<keyof LeadPayload | "simulation" | "projectInterest", string>>;
};
