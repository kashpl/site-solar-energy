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
import { Container } from "@/components/Container";
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
    <section id="simulador" className="brand-aurora py-20 text-white sm:py-24 lg:py-28">
      <Container>
        <div data-reveal className="grid gap-8 border-t border-white/16 pt-6 lg:grid-cols-[0.55fr_1.45fr] lg:gap-16">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-solar-gold">03 / Simulador</p>
          <div>
            <h2 className="max-w-4xl text-4xl font-black leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-[3.9rem]">Descubra o potencial da sua conta de energia.</h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/64 sm:text-lg">Informe quatro dados e veja uma estimativa inicial. Seus dados de contato só são pedidos se você decidir avançar.</p>
          </div>
        </div>

        <div data-reveal className="mt-12 border border-white/16 bg-[#07182b] shadow-[0_28px_80px_rgba(0,0,0,.34)] lg:mt-14">
          <div className="grid border-b border-white/16 px-5 py-4 text-[0.68rem] font-bold uppercase tracking-[0.15em] text-white/55 sm:grid-cols-2 sm:px-7">
            <span>Calculadora Solar Energy</span><span className="mt-2 text-solar-gold sm:mt-0 sm:text-right">Resultado imediato · sem cadastro</span>
          </div>
          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
        <form onSubmit={handleEstimate} className="border-b border-white/16 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
          <div className="mb-7 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-solar-green">Entrada de dados</p>
              <h3 className="mt-2 text-2xl font-black text-white">Cenário atual</h3>
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

        <div className="technical-grid-dark p-6 sm:p-8 lg:p-10" aria-live="polite">
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
        </div>
      </Container>
    </section>
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
      <p className="text-xs font-black uppercase tracking-[0.18em] text-solar-green">Saída calculada</p>
      <h3 className="mt-4 max-w-lg text-3xl font-black leading-tight tracking-[-0.035em] text-white">Transformamos consumo em uma leitura financeira inicial.</h3>
      <p className="mt-4 max-w-lg text-sm leading-7 text-white/62">O cálculo organiza os principais indicadores antes da conversa comercial.</p>
      <div className="mt-9 border-t border-white/20">
        {previews.map((item, index) => (
          <div key={item.label} className="grid grid-cols-[42px_1fr_auto] items-center gap-4 border-b border-white/16 py-4">
            <item.icon aria-hidden className="h-5 w-5 text-solar-green" />
            <p className="text-sm font-bold text-white/75">{item.label}</p>
            <span className="text-[0.65rem] font-black tracking-[0.12em] text-white/58">R–0{index + 1}</span>
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

      <div className="mt-7 grid grid-cols-2 border-l border-t border-white/16">
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
    <div className="border-b border-r border-white/16 p-4">
      <Icon aria-hidden className="h-5 w-5 text-solar-green" />
      <p className="mt-4 text-xs font-bold uppercase tracking-[0.1em] text-gray-dark/45">
        {label}
      </p>
      <p className="mt-2 text-base font-black leading-6 text-white">{value}</p>
    </div>
  );
}
