"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  Building2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  User,
  Zap
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { CityAutocomplete } from "@/components/CityAutocomplete";
import { Input, SelectInput, Textarea } from "@/components/Input";
import { Section } from "@/components/Section";
import { company } from "@/data/company";
import {
  buildContactWhatsAppMessage,
  createWhatsAppUrl
} from "@/lib/whatsappFormatter";
import {
  formatCurrencyFromDigits,
  maskWhatsApp,
  onlyDigits,
  parseCurrency
} from "@/lib/utils";

type ContactForm = {
  name: string;
  whatsapp: string;
  email: string;
  city: string;
  billValue: string;
  propertyType: string;
  message: string;
};

const initialForm: ContactForm = {
  name: "",
  whatsapp: "",
  email: "",
  city: "",
  billValue: "",
  propertyType: "",
  message: ""
};

const propertyOptions = [
  { value: "", label: "Selecione o tipo de imóvel" },
  { value: "Residencial", label: "Residencial" },
  { value: "Comercial", label: "Comercial" },
  { value: "Industrial", label: "Industrial" }
];

const trustItems = ["Resposta rápida", "Análise gratuita", "Sem compromisso"];

function validate(form: ContactForm) {
  const errors: Partial<Record<keyof ContactForm, string>> = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!form.name.trim()) errors.name = "Informe seu nome.";
  if (onlyDigits(form.whatsapp).length !== 11) {
    errors.whatsapp = "Informe um WhatsApp com 11 dígitos.";
  }
  if (!emailRegex.test(form.email)) errors.email = "Informe um e-mail válido.";
  if (!form.city.trim()) errors.city = "Informe sua cidade e estado.";
  if (parseCurrency(form.billValue) <= 0) {
    errors.billValue = "Informe o valor médio da conta.";
  }
  if (!form.propertyType) errors.propertyType = "Selecione o tipo de imóvel.";
  if (!form.message.trim()) errors.message = "Escreva uma mensagem breve.";

  return errors;
}

export function Contact() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const updateForm = (key: keyof ContactForm, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    if (status !== "idle") {
      setStatus("idle");
    }
  };

  const errors = attempted ? validate(form) : {};
  const canSubmit = Object.keys(validate(form)).length === 0 && status !== "loading";

  const whatsappUrl = createWhatsAppUrl(
    buildContactWhatsAppMessage({
      name: form.name || "Cliente",
      city: form.city || "minha cidade",
      propertyType: form.propertyType || "não informado",
      billValue: form.billValue || "não informado",
      message: form.message || "Quero receber uma análise gratuita."
    })
  );

  const submitLead = async () => {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "contact_form",
        name: form.name,
        email: form.email,
        whatsapp: form.whatsapp,
        city: form.city,
        propertyType: form.propertyType.toLowerCase(),
        averageBill: parseCurrency(form.billValue),
        message: form.message,
        pageUrl: window.location.href,
        userAgent: navigator.userAgent
      })
    });

    const data = (await response.json().catch(() => null)) as {
      success?: boolean;
      message?: string;
    } | null;

    if (!response.ok || !data?.success) {
      throw new Error(data?.message ?? "Falha ao enviar lead.");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempted(true);

    if (Object.keys(validate(form)).length > 0) {
      return;
    }

    try {
      setStatus("loading");
      await submitLead();
      setStatus("success");
      trackEvent("generate_lead", { source: "contact_form" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section
      id="contato"
      eyebrow="Contato comercial"
      title="Solicite uma análise gratuita"
      subtitle="Receba uma avaliação inicial para entender economia, viabilidade e melhor solução solar para seu cenário."
      className="bg-[#00245f]"
      headingAlign="left"
    >
      <div className="grid gap-7 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <Card className="h-full p-6 sm:p-8">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-solar-green">
              Atendimento especializado
            </p>
            <h3 className="mt-3 text-3xl font-black leading-tight text-white">
              Descubra quanto sua conta pode virar economia solar.
            </h3>
            <p className="mt-4 text-base leading-7 text-gray-dark/80">
              Envie seus dados e nossa equipe avalia consumo, tipo de imóvel e melhor
              caminho para um projeto seguro e financeiramente inteligente.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {trustItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-lg border border-solar-green/20 bg-solar-green/10 px-3 py-3 text-sm font-bold text-solar-green"
                >
                  <BadgeCheck aria-hidden className="h-4 w-4" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 text-gray-dark/80">
              <ContactItem icon={Phone} label="WhatsApp" value={company.whatsapp} />
              <ContactItem icon={Mail} label="E-mail" value={company.email} />
              <ContactItem icon={MapPin} label="Localização" value={company.location} />
            </div>

            <div className="mt-8 border-t border-white/10 pt-6 text-sm leading-6 text-gray-dark/65">
              <p className="font-black text-white">Empresa identificada</p>
              <p className="mt-2">CNPJ {company.cnpj}</p>
              <a
                href={company.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex text-solar-green transition hover:text-white"
              >
                {company.address}
              </a>
            </div>

            <div className="mt-8 rounded-lg border border-solar-gold/25 bg-solar-gold/10 p-5 text-sm leading-7 text-gray-dark">
              Conta média, cidade e tipo de imóvel já permitem uma conversa muito mais
              objetiva sobre economia, retorno e viabilidade.
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-5 sm:p-7">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-solar-green">
                  Solicitação qualificada
                </p>
                <h3 className="mt-2 text-2xl font-black text-white">
                  Dados para proposta
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-6 text-gray-dark/68">
                  Ao enviar, sua solicitação será encaminhada para análise da equipe comercial.
                </p>
              </div>
              <div className="hidden h-12 w-12 items-center justify-center rounded-lg border border-solar-green/25 bg-solar-green/10 text-solar-green sm:flex">
                <Send aria-hidden className="h-6 w-6" />
              </div>
            </div>
            <form onSubmit={handleSubmit} className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                  label="Nome"
                  icon={User}
                  value={form.name}
                  onChange={(event) => updateForm("name", event.target.value)}
                  placeholder="Seu nome completo"
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
                  label="E-mail"
                  icon={Mail}
                  type="email"
                  value={form.email}
                  onChange={(event) => updateForm("email", event.target.value)}
                  placeholder="seuemail@exemplo.com"
                  error={errors.email}
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
                  icon={Building2}
                  value={form.propertyType}
                  onChange={(event) => updateForm("propertyType", event.target.value)}
                  options={propertyOptions}
                  error={errors.propertyType}
                  required
                />
              </div>

              <Textarea
                label="Mensagem"
                icon={MessageSquare}
                value={form.message}
                onChange={(event) => updateForm("message", event.target.value)}
                error={errors.message}
                placeholder="Conte rapidamente sobre seu imóvel, empresa ou objetivo de economia."
                required
              />

              <p className="text-xs leading-5 text-gray-dark/60">
                Ao enviar, você declara estar ciente de como tratamos seus dados para
                responder à solicitação, conforme nossa{" "}
                <Link
                  href="/politica-de-privacidade"
                  className="font-semibold text-solar-green underline decoration-solar-green/40 underline-offset-4 transition hover:text-white"
                >
                  Política de Privacidade
                </Link>
                .
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href={whatsappUrl} target="_blank" rel="noreferrer" className="sm:flex-1">
                  Falar pelo WhatsApp
                </Button>
                <Button
                  type="submit"
                  disabled={!canSubmit}
                  variant="secondary"
                  icon={<Send aria-hidden className="h-4 w-4" />}
                  className="sm:flex-1"
                >
                  {status === "loading" ? "Enviando..." : "Enviar solicitação"}
                </Button>
              </div>

              {status === "success" ? (
                <div className="rounded-md border border-solar-green/[0.35] bg-solar-green/10 p-4 text-sm text-solar-green">
                  Solicitação enviada com sucesso. Nossa equipe entrará em contato em
                  breve. Você também pode continuar pelo WhatsApp para acelerar o
                  atendimento.
                </div>
              ) : null}

              {status === "error" ? (
                <div className="rounded-md border border-[#ffb4b4]/40 bg-[#ffb4b4]/10 p-4 text-sm text-[#ffb4b4]">
                  Não foi possível enviar sua solicitação. Tente novamente ou fale pelo
                  WhatsApp.
                </div>
              ) : null}
            </form>
          </Card>
        </div>
      </div>
    </Section>
  );
}

function ContactItem({
  icon: Icon,
  label,
  value
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-solar-green/10 text-solar-green">
        <Icon aria-hidden className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase text-gray-dark/60">{label}</p>
        <p className="mt-1 break-words font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}
