"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Building2, Mail, MapPin, MessageSquare, Phone, Send, User, Zap } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/Button";
import { CityAutocomplete } from "@/components/CityAutocomplete";
import { Container } from "@/components/Container";
import { Input, SelectInput, Textarea } from "@/components/Input";
import { company } from "@/data/company";
import { buildContactWhatsAppMessage, createWhatsAppUrl } from "@/lib/whatsappFormatter";
import { formatCurrencyFromDigits, maskWhatsApp, onlyDigits, parseCurrency } from "@/lib/utils";

type ContactForm = { name: string; whatsapp: string; email: string; city: string; billValue: string; propertyType: string; message: string };
const initialForm: ContactForm = { name: "", whatsapp: "", email: "", city: "", billValue: "", propertyType: "", message: "" };
const propertyOptions = [
  { value: "", label: "Selecione o tipo de imóvel" },
  { value: "Residencial", label: "Residencial" },
  { value: "Comercial", label: "Comercial" },
  { value: "Industrial", label: "Industrial" }
];

function validate(form: ContactForm) {
  const errors: Partial<Record<keyof ContactForm, string>> = {};
  if (!form.name.trim()) errors.name = "Informe seu nome.";
  if (onlyDigits(form.whatsapp).length !== 11) errors.whatsapp = "Informe um WhatsApp com 11 dígitos.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Informe um e-mail válido.";
  if (!form.city.trim()) errors.city = "Informe sua cidade e estado.";
  if (parseCurrency(form.billValue) <= 0) errors.billValue = "Informe o valor médio da conta.";
  if (!form.propertyType) errors.propertyType = "Selecione o tipo de imóvel.";
  if (!form.message.trim()) errors.message = "Escreva uma mensagem breve.";
  return errors;
}

export function Contact() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const updateForm = (key: keyof ContactForm, value: string) => { setForm((current) => ({ ...current, [key]: value })); if (status !== "idle") setStatus("idle"); };
  const errors = attempted ? validate(form) : {};
  const canSubmit = Object.keys(validate(form)).length === 0 && status !== "loading";
  const whatsappUrl = createWhatsAppUrl(buildContactWhatsAppMessage({ name: form.name || "Cliente", city: form.city || "minha cidade", propertyType: form.propertyType || "não informado", billValue: form.billValue || "não informado", message: form.message || "Quero receber uma análise gratuita." }));

  const submitLead = async () => {
    const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ source: "contact_form", name: form.name, email: form.email, whatsapp: form.whatsapp, city: form.city, propertyType: form.propertyType.toLowerCase(), averageBill: parseCurrency(form.billValue), message: form.message, pageUrl: window.location.href, userAgent: navigator.userAgent }) });
    const data = (await response.json().catch(() => null)) as { success?: boolean; message?: string } | null;
    if (!response.ok || !data?.success) throw new Error(data?.message ?? "Falha ao enviar lead.");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setAttempted(true);
    if (Object.keys(validate(form)).length > 0) return;
    try { setStatus("loading"); await submitLead(); setStatus("success"); trackEvent("generate_lead", { source: "contact_form" }); }
    catch { setStatus("error"); }
  };

  return (
    <section id="contato" className="bg-[#020812] py-20 text-white sm:py-24 lg:py-28">
      <Container>
        <div data-reveal className="grid gap-8 border-t border-white/16 pt-6 lg:grid-cols-[0.55fr_1.45fr] lg:gap-16">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-solar-orange">08 / Fale com a equipe</p>
          <div><h2 className="max-w-4xl text-4xl font-black leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-[3.9rem]">Leve sua conta. Nós cuidamos do próximo passo.</h2><p className="mt-6 max-w-2xl text-base leading-7 text-white/64 sm:text-lg">A equipe avalia consumo, imóvel e viabilidade para indicar uma solução coerente com o seu cenário.</p></div>
        </div>

        <div data-reveal className="mt-14 grid border border-white/18 bg-[#001a4d] lg:grid-cols-[0.68fr_1.32fr] lg:mt-16">
          <aside className="flex flex-col border-b border-white/16 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-solar-green">Canal direto</p>
            <h3 className="mt-5 text-3xl font-black leading-tight tracking-[-0.03em]">Atendimento técnico-comercial em Fortaleza.</h3>
            <div className="mt-10 divide-y divide-white/16 border-y border-white/16">
              <a href={createWhatsAppUrl(buildContactWhatsAppMessage({ name: "Cliente", city: "minha cidade", propertyType: "não informado", billValue: "não informado", message: "Quero receber uma análise gratuita." }))} target="_blank" rel="noreferrer" className="grid grid-cols-[34px_1fr] gap-4 py-5 hover:text-solar-green"><Phone aria-hidden className="h-5 w-5 text-solar-green" /><span><small className="block text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white/58">WhatsApp</small><strong className="mt-1 block text-sm">{company.whatsapp}</strong></span></a>
              <a href={`mailto:${company.email}`} className="grid grid-cols-[34px_1fr] gap-4 py-5 hover:text-solar-green"><Mail aria-hidden className="h-5 w-5 text-solar-green" /><span><small className="block text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white/58">E-mail</small><strong className="mt-1 block break-all text-sm">{company.email}</strong></span></a>
              <a href={company.mapsUrl} target="_blank" rel="noreferrer" className="grid grid-cols-[34px_1fr] gap-4 py-5 hover:text-solar-green"><MapPin aria-hidden className="h-5 w-5 text-solar-green" /><span><small className="block text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white/58">Endereço</small><strong className="mt-1 block text-sm leading-6">{company.address}</strong></span></a>
            </div>
            <dl className="mt-auto grid grid-cols-2 gap-6 pt-10 text-xs"><div><dt className="font-bold uppercase tracking-[0.12em] text-white/42">Registro</dt><dd className="mt-2 font-bold">{company.cnpj}</dd></div><div><dt className="font-bold uppercase tracking-[0.12em] text-white/42">Análise inicial</dt><dd className="mt-2 font-bold text-solar-green">Sem custo</dd></div></dl>
          </aside>

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="mb-8 flex items-end justify-between gap-5 border-b border-white/16 pb-6"><div><p className="text-xs font-black uppercase tracking-[0.18em] text-solar-green">Ficha de solicitação</p><h3 className="mt-3 text-2xl font-black">Dados para análise</h3></div><span className="hidden text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white/40 sm:block">Campos obrigatórios *</span></div>
            <form onSubmit={handleSubmit} className="grid gap-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <Input name="name" autoComplete="name" label="Nome" icon={User} value={form.name} onChange={(e) => updateForm("name", e.target.value)} placeholder="Seu nome completo" error={errors.name} required />
                <Input name="tel" autoComplete="tel" label="WhatsApp" icon={Phone} value={form.whatsapp} onChange={(e) => updateForm("whatsapp", maskWhatsApp(e.target.value))} placeholder="(85) 99999-9999" inputMode="tel" error={errors.whatsapp} required />
                <Input name="email" autoComplete="email" spellCheck={false} label="E-mail" icon={Mail} type="email" value={form.email} onChange={(e) => updateForm("email", e.target.value)} placeholder="seuemail@exemplo.com" error={errors.email} required />
                <CityAutocomplete label="Cidade/estado" icon={MapPin} value={form.city} onChange={(value) => updateForm("city", value)} placeholder="Fortaleza/CE" error={errors.city} required />
                <Input name="average-bill" label="Valor médio da conta" icon={Zap} value={form.billValue} onChange={(e) => updateForm("billValue", formatCurrencyFromDigits(e.target.value))} placeholder="R$ 850,00" inputMode="numeric" error={errors.billValue} required />
                <SelectInput name="property-type" label="Tipo de imóvel" icon={Building2} value={form.propertyType} onChange={(e) => updateForm("propertyType", e.target.value)} options={propertyOptions} error={errors.propertyType} required />
              </div>
              <Textarea name="message" label="Contexto do projeto" icon={MessageSquare} value={form.message} onChange={(e) => updateForm("message", e.target.value)} error={errors.message} placeholder="Conte sobre seu imóvel, empresa ou objetivo de economia…" required />
              <p className="text-xs leading-5 text-white/52">Ao enviar, você concorda com o uso dos dados para atendimento, conforme a <Link href="/politica-de-privacidade" className="font-bold text-solar-green underline underline-offset-4">Política de Privacidade</Link>.</p>
              <div className="flex flex-col gap-3 sm:flex-row"><Button href={whatsappUrl} target="_blank" rel="noreferrer" className="sm:flex-1">Falar pelo WhatsApp</Button><Button type="submit" disabled={!canSubmit} variant="secondary" icon={<Send aria-hidden className="h-4 w-4" />} className="sm:flex-1">{status === "loading" ? "Enviando…" : "Enviar para análise"}</Button></div>
              <div aria-live="polite">{status === "success" ? <p className="border border-solar-green/35 bg-solar-green/10 p-4 text-sm text-solar-green">Solicitação enviada. Nossa equipe entrará em contato em breve.</p> : null}{status === "error" ? <p className="border border-[#ffb4b4]/40 bg-[#ffb4b4]/10 p-4 text-sm text-[#ffb4b4]">Não foi possível enviar. Tente novamente ou fale pelo WhatsApp.</p> : null}</div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
