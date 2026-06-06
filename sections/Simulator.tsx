"use client";

import { FormEvent, MouseEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
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
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
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

type SimulatorForm = {
  name: string;
  whatsapp: string;
  billValue: string;
  propertyType: PropertyType | "";
  city: string;
  monthlyConsumptionKwh: string;
};

const initialForm: SimulatorForm = {
  name: "",
  whatsapp: "",
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

function validate(form: SimulatorForm) {
  const errors: Partial<Record<keyof SimulatorForm, string>> = {};

  if (!form.name.trim()) errors.name = "Informe seu nome.";
  if (onlyDigits(form.whatsapp).length !== 11) {
    errors.whatsapp = "Informe um WhatsApp com 11 dígitos.";
  }
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

export function Simulator() {
  const [form, setForm] = useState<SimulatorForm>(initialForm);
  const [attempted, setAttempted] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [leadError, setLeadError] = useState(false);
  const [whatsAppError, setWhatsAppError] = useState(false);

  const billValue = parseCurrency(form.billValue);
  const monthlyConsumption = Number(form.monthlyConsumptionKwh);
  const canCalculate =
    !!form.name.trim() &&
    onlyDigits(form.whatsapp).length === 11 &&
    billValue > 0 &&
    !!form.propertyType &&
    !!form.city.trim() &&
    monthlyConsumption > 0;

  const result: SimulatorResult | null = useMemo(() => {
    if (!form.propertyType || billValue <= 0 || monthlyConsumption <= 0) {
      return null;
    }

    return calculateSolarSavings({
      billValue,
      propertyType: form.propertyType,
      monthlyConsumptionKwh: monthlyConsumption
    });
  }, [billValue, form.propertyType, monthlyConsumption]);

  const errors = attempted ? validate(form) : {};
  const simulatorWhatsAppUrl =
    result && form.propertyType
      ? createWhatsAppUrl(
          buildSimulatorWhatsAppMessage({
            name: form.name,
            whatsapp: form.whatsapp,
            city: form.city,
            propertyType: form.propertyType,
            billValue,
            monthlyConsumptionKwh: monthlyConsumption,
            result
          })
        )
      : "#simulador";

  const updateForm = (key: keyof SimulatorForm, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setLeadCaptured(false);
    setLeadError(false);
    setWhatsAppError(false);
  };

  const submitLead = async () => {
    if (!result || !form.propertyType) {
      return;
    }

    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "simulator",
        name: form.name,
        whatsapp: form.whatsapp,
        city: form.city,
        propertyType: form.propertyType.toLowerCase(),
        averageBill: billValue,
        monthlyConsumption,
        simulation: {
          estimatedInvestment: result.estimatedInvestment,
          estimatedSavingsPercent: Math.round(result.estimatedPercent * 100),
          monthlySavings: result.monthlySavings,
          annualSavings: result.annualSavings,
          estimatedROI: result.estimatedRoiLabel,
          co2Reduction: result.co2ReductionKg,
          referenceInvestment: result.referenceInvestment,
          referenceConsumptionKwh: result.referenceConsumptionKwh,
          referenceSystemPowerKwp: result.referenceSystemPowerKwp
        },
        pageUrl: window.location.href,
        userAgent: navigator.userAgent
      })
    }).then(async (response) => {
      const data = (await response.json().catch(() => null)) as {
        success?: boolean;
        message?: string;
      } | null;

      if (!response.ok || !data?.success) {
        throw new Error(data?.message ?? "Falha ao registrar simulação.");
      }
    });

    setLeadCaptured(true);
    setLeadError(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempted(true);

    if (Object.keys(validate(form)).length > 0) {
      return;
    }

    try {
      await submitLead();
    } catch {
      setLeadError(true);
    }
  };

  const handleWhatsAppClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (Object.keys(validate(form)).length > 0 || !result || !form.propertyType) {
      event.preventDefault();
      setAttempted(true);
      setWhatsAppError(true);
      return;
    }

    setAttempted(true);
    setWhatsAppError(false);

    if (!leadCaptured) {
      void submitLead().catch((error) => {
        if (process.env.NODE_ENV !== "production") {
          console.warn(
            "[simulador] Não foi possível registrar lead antes do WhatsApp.",
            error instanceof Error ? error.message : "erro desconhecido"
          );
        }

        setLeadError(true);
      });
    }
  };

  const economyPercent = result ? Math.round(result.estimatedPercent * 100) : 0;
  const hasEstimate = Boolean(result);

  return (
    <Section
      id="simulador"
      eyebrow="Calculadora solar"
      title="Simule sua economia"
      subtitle="Uma estimativa rápida para entender economia mensal, retorno, investimento de referência e redução de CO₂."
      className="section-trust section-divider-bottom"
      headingAlign="left"
    >
      <div aria-hidden className="premium-grid absolute inset-0 opacity-25" />

      <Card className="relative grid gap-6 p-4 sm:p-6 lg:grid-cols-[1.02fr_0.98fr] lg:p-7">
        <div className="rounded-lg border border-white/[0.12] bg-navy/[0.42] p-5 sm:p-6">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-solar-green">
                Dados para análise
              </p>
              <h3 className="mt-2 text-2xl font-black text-white">
                Informe seu cenário atual
              </h3>
            </div>
            <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-solar-gold/25 bg-solar-gold/10 text-solar-gold sm:flex">
              <Calculator aria-hidden className="h-6 w-6" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                label="Nome"
                icon={User}
                value={form.name}
                onChange={(event) => updateForm("name", event.target.value)}
                placeholder="Seu nome"
                error={errors.name}
                required
              />
              <Input
                label="WhatsApp"
                icon={Phone}
                value={form.whatsapp}
                onChange={(event) =>
                  updateForm("whatsapp", maskWhatsApp(event.target.value))
                }
                placeholder="(85) 99999-9999"
                error={errors.whatsapp}
                required
              />
              <Input
                label="Valor médio da conta de luz"
                icon={Zap}
                value={form.billValue}
                onChange={(event) =>
                  updateForm("billValue", formatCurrencyFromDigits(event.target.value))
                }
                placeholder="R$ 850,00"
                inputMode="numeric"
                error={errors.billValue}
                required
              />
              <SelectInput
                label="Tipo de imóvel"
                icon={Factory}
                value={form.propertyType}
                onChange={(event) =>
                  updateForm("propertyType", event.target.value as PropertyType)
                }
                options={propertyOptions}
                error={errors.propertyType}
                required
              />
              <CityAutocomplete
                label="Cidade/estado"
                icon={MapPin}
                value={form.city}
                onChange={(value) => updateForm("city", value)}
                placeholder="Fortaleza/CE"
                error={errors.city}
                required
              />
              <Input
                label="Consumo médio mensal em kWh"
                icon={Gauge}
                value={form.monthlyConsumptionKwh}
                onChange={(event) =>
                  updateForm(
                    "monthlyConsumptionKwh",
                    event.target.value.replace(/[^\d.]/g, "")
                  )
                }
                placeholder="650"
                inputMode="decimal"
                error={errors.monthlyConsumptionKwh}
                required
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="submit"
                variant={canCalculate ? "primary" : "secondary"}
                disabled={!canCalculate}
                icon={<Calculator className="h-4 w-4" />}
                className="sm:flex-1"
              >
                Calcular economia
              </Button>
              <Button
                href={simulatorWhatsAppUrl}
                target="_blank"
                rel="noreferrer"
                onClick={handleWhatsAppClick}
                variant={canCalculate ? "primary" : "secondary"}
                className="px-3 text-[0.82rem] sm:flex-1 sm:text-sm"
              >
                Solicitar orçamento via WhatsApp
              </Button>
            </div>

            {leadCaptured ? (
              <p className="rounded-md border border-solar-green/[0.35] bg-solar-green/10 px-4 py-3 text-sm font-semibold text-solar-green">
                Solicitação registrada com sucesso. Nossa equipe entrará em contato em breve.
              </p>
            ) : null}

            {leadError ? (
              <p className="rounded-md border border-[#ffb4b4]/40 bg-[#ffb4b4]/10 px-4 py-3 text-sm font-semibold text-[#ffb4b4]">
                Não foi possível registrar sua simulação agora. Você ainda pode falar pelo WhatsApp.
              </p>
            ) : null}

            {whatsAppError ? (
              <p className="rounded-md border border-solar-gold/35 bg-solar-gold/10 px-4 py-3 text-sm font-semibold text-solar-gold">
                Preencha os dados obrigatórios antes de solicitar o orçamento pelo WhatsApp.
              </p>
            ) : null}
          </form>
        </div>

        <motion.div
          initial={{ opacity: 1, x: 0 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-lg border border-white/[0.14] bg-[linear-gradient(160deg,rgba(0,82,204,0.34),rgba(0,26,77,0.72))] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.24)] sm:p-6"
        >
          <div className="absolute right-0 top-0 h-40 w-40 bg-[radial-gradient(circle,rgba(255,215,0,0.22),transparent_64%)]" />
          <div className="relative">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-solar-green">
              Resultado estimado
            </p>
            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              {hasEstimate ? (
                <div>
                  <p className="text-6xl font-black leading-none text-white">
                    {economyPercent}
                    <span className="text-3xl text-solar-green">%</span>
                  </p>
                  <p className="mt-2 text-sm font-semibold text-gray-dark/70">
                    de economia projetada
                  </p>
                </div>
              ) : (
                <div className="max-w-sm">
                  <p className="text-2xl font-black leading-tight text-white">
                    Preencha os dados para visualizar sua economia estimada
                  </p>
                  <p className="mt-3 text-sm leading-6 text-gray-dark/70">
                    Informe conta, consumo e tipo de imóvel para liberar a projeção.
                  </p>
                </div>
              )}
              <div className="rounded-lg border border-solar-gold/25 bg-solar-gold/10 px-4 py-3 text-sm font-bold text-solar-gold">
                {result
                  ? `Investimento: ${formatCurrency(result.estimatedInvestment)}`
                  : "Selecione o tipo de imóvel"}
              </div>
            </div>

            <div className="mt-7">
              <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-[0.14em] text-gray-dark/[0.65]">
                <span>Economia</span>
                <span>{result ? "Alto potencial" : "Aguardando dados"}</span>
              </div>
              <div className="h-4 overflow-hidden rounded-md bg-white/10 shadow-[inset_0_1px_8px_rgba(0,0,0,0.22)]">
                <motion.div
                  className="h-full rounded-md bg-gold-green shadow-[0_0_30px_rgba(0,208,132,0.38)]"
                  initial={false}
                  animate={{ width: `${result ? economyPercent : 14}%` }}
                  transition={{ duration: 0.65, ease: "easeOut" }}
                />
              </div>
            </div>

            {hasEstimate && result ? (
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <ResultMetric
                  icon={Calculator}
                  label="Investimento estimado"
                  value={formatCurrency(result.estimatedInvestment)}
                />
                <ResultMetric
                  icon={CircleDollarSign}
                  label="Economia mensal"
                  value={formatCurrency(result.monthlySavings)}
                />
                <ResultMetric
                  icon={Zap}
                  label="Economia anual"
                  value={formatCurrency(result.annualSavings)}
                />
                <ResultMetric
                  icon={Timer}
                  label="ROI estimado"
                  value={result.estimatedRoiLabel}
                />
                <ResultMetric
                  icon={Leaf}
                  label="Redução de CO₂"
                  value={`${result.co2ReductionKg.toFixed(1)} kg/mês`}
                />
              </div>
            ) : (
              <div className="mt-7 rounded-lg border border-white/[0.12] bg-white/[0.07] p-5">
                <p className="text-sm font-bold uppercase tracking-[0.12em] text-gray-dark/60">
                  O resultado vai mostrar
                </p>
                <div className="mt-4 grid gap-3 text-sm text-gray-dark/80 sm:grid-cols-2">
                  <span>Investimento estimado</span>
                  <span>Economia mensal estimada</span>
                  <span>Economia anual projetada</span>
                  <span>ROI estimado</span>
                  <span>Redução de CO₂ mensal</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </Card>
    </Section>
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
    <div className="rounded-lg border border-white/[0.12] bg-white/[0.07] p-4">
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-gray-dark/60">
        <Icon aria-hidden className="h-4 w-4 text-solar-green" />
        {label}
      </p>
      <p className="mt-2 text-lg font-black text-white sm:text-xl">{value}</p>
    </div>
  );
}
