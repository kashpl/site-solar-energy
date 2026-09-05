"use client";

import { FormEvent, MouseEvent, useState } from "react";
import Link from "next/link";
import {
  Calculator,
  CircleDollarSign,
  Factory,
  Gauge,
  Leaf,
  MapPin,
  Phone,
  Timer,
  User,
  Zap
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/Button";
import { CityAutocomplete } from "@/components/CityAutocomplete";
import { Input, SelectInput } from "@/components/Input";
import { Section } from "@/components/Section";
import {
  calculateSolarSavings,
  type PropertyType,
  type SimulatorResult
} from "@/lib/simulatorCalculations";
import {
  buildSimulatorWhatsAppMessage,
  createWhatsAppUrl
} from "@/lib/whatsappFormatter";
import {
  formatCurrency,
  formatCurrencyFromDigits,
  maskWhatsApp,
  onlyDigits,
  parseCurrency
} from "@/lib/utils";

type EstimateForm = {
  billValue: string;
  propertyType: PropertyType | "";
  city: string;
  monthlyConsumptionKwh: string;
};

type LeadForm = {
  name: string;
  whatsapp: string;
};

const initialEstimate: EstimateForm = {
  billValue: "",
  propertyType: "",
  city: "",
  monthlyConsumptionKwh: ""
};

const propertyOptions = [
  { value: "", label: "Selecione o tipo de imóvel" },
  { value: "Residencial", label: "Residencial" },
  { value: "Comercial", label: "Comercial" },
  { value: "Industrial", label: "Industrial" }
];

function validateEstimate(form: EstimateForm) {
  const errors: Partial<Record<keyof EstimateForm, string>> = {};

  if (parseCurrency(form.billValue) <= 0) {
    errors.billValue = "Informe o valor médio da conta.";
  }
  if (!form.propertyType) errors.propertyType = "Selecione o tipo de imóvel.";
  if (!form.city.trim()) errors.city = "Informe sua cidade e estado.";
  if (Number(form.monthlyConsumptionKwh) <= 0) {
    errors.monthlyConsumptionKwh = "Informe o consumo médio mensal.";
  }

  return errors;
}

function validateLead(form: LeadForm) {
  const errors: Partial<Record<keyof LeadForm, string>> = {};

  if (!form.name.trim()) errors.name = "Informe seu nome.";
  if (onlyDigits(form.whatsapp).length !== 11) {
    errors.whatsapp = "Informe um WhatsApp com 11 dígitos.";
  }

  return errors;
}

export function Simulator() {
  const [estimate, setEstimate] = useState<EstimateForm>(initialEstimate);
  const [lead, setLead] = useState<LeadForm>({ name: "", whatsapp: "" });
  const [estimateAttempted, setEstimateAttempted] = useState(false);
  const [leadAttempted, setLeadAttempted] = useState(false);
  const [result, setResult] = useState<SimulatorResult | null>(null);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [leadError, setLeadError] = useState(false);

  const billValue = parseCurrency(estimate.billValue);
  const monthlyConsumption = Number(estimate.monthlyConsumptionKwh);
  const estimateErrors = estimateAttempted ? validateEstimate(estimate) : {};
  const leadErrors = leadAttempted ? validateLead(lead) : {};

  const updateEstimate = (key: keyof EstimateForm, value: string) => {
    setEstimate((current) => ({ ...current, [key]: value }));
    setResult(null);
    setEstimateAttempted(false);
    setLeadCaptured(false);
    setLeadError(false);
  };

  const updateLead = (key: keyof LeadForm, value: string) => {
    setLead((current) => ({ ...current, [key]: value }));
    setLeadCaptured(false);
    setLeadError(false);
  };

  const handleEstimate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEstimateAttempted(true);

    if (Object.keys(validateEstimate(estimate)).length > 0 || !estimate.propertyType) {
      setResult(null);
      return;
    }

    const nextResult = calculateSolarSavings({
      billValue,
      propertyType: estimate.propertyType,
      monthlyConsumptionKwh: monthlyConsumption
    });

    setResult(nextResult);
    trackEvent("solar_simulation_completed", {
      property_type: estimate.propertyType,
      estimated_savings_percent: Math.round(nextResult.estimatedPercent * 100)
    });
  };

  const submitLead = async () => {
    if (!result || !estimate.propertyType) return;

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "simulator",
        name: lead.name,
        whatsapp: lead.whatsapp,
        city: estimate.city,
        propertyType: estimate.propertyType.toLowerCase(),
        averageBill: billValue,
        monthlyConsumption,
        simulation: {
          estimatedInvestment: result.estimatedInvestment,
          estimatedSavingsPercent: Math.round(result.estimatedPercent * 100),
          monthlySavings: result.monthlySavings,
          annualSavings: result.annualSavings,
          estimatedROI: result.estimatedRoiLabel,
          co2Reduction: result.co2ReductionKg,
          estimatedSystemPowerKwp: result.estimatedSystemPowerKwp,
          referenceInvestment: result.referenceInvestment,
          referenceConsumptionKwh: result.referenceConsumptionKwh,
          referenceSystemPowerKwp: result.referenceSystemPowerKwp
        },
        pageUrl: window.location.href,
        userAgent: navigator.userAgent
      })
    });

    const data = (await response.json().catch(() => null)) as {
      success?: boolean;
      message?: string;
    } | null;

    if (!response.ok || !data?.success) {
      throw new Error(data?.message ?? "Falha ao registrar simulação.");
    }

    setLeadCaptured(true);
    setLeadError(false);
    trackEvent("generate_lead", { source: "simulator" });
  };

  const whatsappUrl =
    result && estimate.propertyType
      ? createWhatsAppUrl(
          buildSimulatorWhatsAppMessage({
            name: lead.name,
            whatsapp: lead.whatsapp,
            city: estimate.city,
            propertyType: estimate.propertyType,
            billValue,
            monthlyConsumptionKwh: monthlyConsumption,
            result
          })
        )
      : "#simulador";

  const handleWhatsAppClick = (event: MouseEvent<HTMLAnchorElement>) => {
    setLeadAttempted(true);

    if (!result || Object.keys(validateLead(lead)).length > 0) {
      event.preventDefault();
      return;
    }

    if (!leadCaptured) {
      void submitLead().catch(() => setLeadError(true));
    }
  };

  return (
    <Section
      id="simulador"
      eyebrow="Simulação aberta"
      title="Descubra o potencial da sua conta de energia."
      subtitle="Preencha quatro informações e veja a estimativa na hora. Nome e WhatsApp só serão pedidos se você quiser avançar para uma análise técnica."
      className="bg-solar-green"
      headingAlign="left"
      tone="light"
    >
      <div className="grid overflow-hidden rounded-[30px] bg-[#00245f] shadow-[0_30px_90px_rgba(0,26,77,0.22)] lg:grid-cols-[0.95fr_1.05fr]">
        <form onSubmit={handleEstimate} className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
          <div className="mb-7 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-solar-green">
                Etapa 1 · Estimativa
              </p>
              <h3 className="mt-2 text-2xl font-black text-white">Seu cenário atual</h3>
            </div>
            <Calculator aria-hidden className="h-7 w-7 text-solar-green" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              label="Valor médio da conta"
              icon={Zap}
              value={estimate.billValue}
              onChange={(event) =>
                updateEstimate("billValue", formatCurrencyFromDigits(event.target.value))
              }
              placeholder="R$ 850,00"
              inputMode="numeric"
              error={estimateErrors.billValue}
              required
            />
            <Input
              label="Consumo médio mensal"
              icon={Gauge}
              value={estimate.monthlyConsumptionKwh}
              onChange={(event) =>
                updateEstimate(
                  "monthlyConsumptionKwh",
                  event.target.value.replace(/\D/g, "").slice(0, 6)
                )
              }
              placeholder="350 kWh"
              inputMode="numeric"
              error={estimateErrors.monthlyConsumptionKwh}
              required
            />
            <SelectInput
              label="Tipo de imóvel"
              icon={Factory}
              value={estimate.propertyType}
              onChange={(event) =>
                updateEstimate("propertyType", event.target.value as PropertyType)
              }
              options={propertyOptions}
              error={estimateErrors.propertyType}
              required
            />
            <CityAutocomplete
              label="Cidade/estado"
              icon={MapPin}
              value={estimate.city}
              onChange={(value) => updateEstimate("city", value)}
              error={estimateErrors.city}
              required
            />
          </div>

          <Button type="submit" className="mt-7 w-full" showArrow>
            Calcular minha economia
          </Button>
          <p className="mt-4 text-xs leading-5 text-gray-dark/55">
            O cálculo usa os parâmetros de referência atualmente adotados pela Solar
            Energy e não substitui a análise técnica do local.
          </p>
        </form>

        <div className="p-6 sm:p-8 lg:p-10" aria-live="polite">
          {result ? (
            <EstimateResult
              result={result}
              lead={lead}
              leadErrors={leadErrors}
              leadCaptured={leadCaptured}
              leadError={leadError}
              whatsappUrl={whatsappUrl}
              onLeadChange={updateLead}
              onWhatsAppClick={handleWhatsAppClick}
            />
          ) : (
            <EstimatePreview />
          )}
        </div>
      </div>
    </Section>
  );
}

function EstimatePreview() {
  const previews = [
    { icon: CircleDollarSign, label: "Economia mensal" },
    { icon: Timer, label: "Retorno estimado" },
    { icon: Gauge, label: "Potência sugerida" },
    { icon: Leaf, label: "Redução de CO₂" }
  ];

  return (
    <div className="flex h-full min-h-[420px] flex-col justify-center">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-solar-green">
        Resultado instantâneo
      </p>
      <h3 className="mt-4 max-w-md text-3xl font-black leading-tight tracking-[-0.04em] text-white">
        Sua estimativa aparecerá aqui, sem cadastro obrigatório.
      </h3>
      <p className="mt-4 max-w-lg text-sm leading-7 text-gray-dark/70">
        Você terá uma visão inicial de investimento, economia, retorno e impacto
        ambiental antes de decidir se quer falar com a equipe.
      </p>
      <div className="mt-9 grid grid-cols-2 gap-3">
        {previews.map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <item.icon aria-hidden className="h-5 w-5 text-solar-green" />
            <p className="mt-4 text-sm font-bold text-gray-dark/75">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function EstimateResult({
  result,
  lead,
  leadErrors,
  leadCaptured,
  leadError,
  whatsappUrl,
  onLeadChange,
  onWhatsAppClick
}: {
  result: SimulatorResult;
  lead: LeadForm;
  leadErrors: Partial<Record<keyof LeadForm, string>>;
  leadCaptured: boolean;
  leadError: boolean;
  whatsappUrl: string;
  onLeadChange: (key: keyof LeadForm, value: string) => void;
  onWhatsAppClick: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  const metrics = [
    {
      icon: CircleDollarSign,
      label: "Economia mensal",
      value: formatCurrency(result.monthlySavings)
    },
    {
      icon: Zap,
      label: "Economia anual",
      value: formatCurrency(result.annualSavings)
    },
    {
      icon: Timer,
      label: "Retorno estimado",
      value: result.estimatedRoiLabel
    },
    {
      icon: Gauge,
      label: "Potência estimada",
      value: `${result.estimatedSystemPowerKwp.toLocaleString("pt-BR", {
        maximumFractionDigits: 2
      })} kWp`
    }
  ];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-solar-green">
            Potencial estimado
          </p>
          <p className="mt-3 text-5xl font-black tracking-[-0.06em] text-white">
            {Math.round(result.estimatedPercent * 100)}%
          </p>
          <p className="mt-1 text-sm font-semibold text-gray-dark/65">de economia</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-dark/50">
            Investimento de referência
          </p>
          <p className="mt-2 text-2xl font-black text-solar-green">
            {formatCurrency(result.estimatedInvestment)}
          </p>
        </div>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-3">
        {metrics.map((metric) => (
          <ResultMetric key={metric.label} {...metric} />
        ))}
      </div>

      <p className="mt-5 flex items-center gap-2 text-xs font-semibold text-gray-dark/55">
        <Leaf aria-hidden className="h-4 w-4 text-solar-green" />
        Redução estimada de {result.co2ReductionKg.toLocaleString("pt-BR")} kg de CO₂ por
        mês.
      </p>

      <div className="mt-8 border-t border-white/10 pt-7">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-solar-green">
          Etapa 2 · Análise técnica
        </p>
        <h4 className="mt-2 text-xl font-black text-white">
          Quer confirmar esta estimativa?
        </h4>
        <p className="mt-2 text-sm leading-6 text-gray-dark/65">
          Identifique-se apenas para enviar o resultado e conversar com um especialista.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Input
            label="Nome"
            icon={User}
            value={lead.name}
            onChange={(event) => onLeadChange("name", event.target.value)}
            placeholder="Seu nome"
            error={leadErrors.name}
          />
          <Input
            label="WhatsApp"
            icon={Phone}
            value={lead.whatsapp}
            onChange={(event) => onLeadChange("whatsapp", maskWhatsApp(event.target.value))}
            placeholder="(85) 99999-9999"
            error={leadErrors.whatsapp}
          />
        </div>
        <Button
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          onClick={onWhatsAppClick}
          className="mt-5 w-full"
          icon={<Phone aria-hidden className="h-4 w-4" />}
        >
          Enviar resultado pelo WhatsApp
        </Button>
        {leadCaptured ? (
          <p className="mt-3 text-sm font-semibold text-solar-green">
            Resultado registrado. Você já pode continuar no WhatsApp.
          </p>
        ) : null}
        {leadError ? (
          <p className="mt-3 text-sm text-[#ffb4b4]">
            O WhatsApp foi aberto, mas não conseguimos registrar o pedido no site.
          </p>
        ) : null}
        <p className="mt-4 text-xs leading-5 text-gray-dark/50">
          Ao avançar, você concorda com o uso dos dados para atendimento. Consulte a{" "}
          <Link href="/politica-de-privacidade" className="font-bold text-solar-green underline">
            Política de Privacidade
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

function ResultMetric({
  icon: Icon,
  label,
  value
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <Icon aria-hidden className="h-5 w-5 text-solar-green" />
      <p className="mt-4 text-xs font-bold uppercase tracking-[0.1em] text-gray-dark/45">
        {label}
      </p>
      <p className="mt-2 text-base font-black leading-6 text-white">{value}</p>
    </div>
  );
}
