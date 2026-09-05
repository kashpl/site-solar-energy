import Image from "next/image";
import { ArrowUpRight, ClipboardCheck, HardHat, Route } from "lucide-react";
import { Section } from "@/components/Section";
import {
  buildGeneralWhatsAppMessage,
  createWhatsAppUrl
} from "@/lib/whatsappFormatter";

const differentials = [
  {
    icon: HardHat,
    title: "Engenharia especializada",
    text: "Critérios técnicos para eficiência, segurança elétrica e vida útil."
  },
  {
    icon: Route,
    title: "Projeto personalizado",
    text: "Consumo, espaço disponível e objetivo real de economia."
  },
  {
    icon: ClipboardCheck,
    title: "Acompanhamento completo",
    text: "Estudo, homologação, instalação e suporte pós-entrega."
  }
];

export function About() {
  return (
    <Section
      id="sobre"
      eyebrow="Quem executa"
      title="Engenharia próxima. Entrega responsável."
      className="bg-[#071e27]"
      headingAlign="left"
    >
      <div className="grid items-stretch gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="relative min-h-[430px] overflow-hidden rounded-[30px] sm:min-h-[560px]">
          <Image
            src="/images/optimized/639311282FIMI0026 (3).webp"
            alt="Equipe técnica da Solar Energy em campo"
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071e27]/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 max-w-md rounded-2xl border border-white/15 bg-[#071e27]/95 p-5 sm:bottom-8 sm:left-8">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-solar-green">
              Equipe técnica em campo
            </p>
            <p className="mt-2 text-sm leading-6 text-gray-dark/75">
              Instalação acompanhada, segurança operacional e atenção ao detalhe em cada
              etapa.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-[30px] bg-[#0c2a35] p-7 sm:p-9 lg:p-10">
          <div>
            <p className="text-lg leading-8 text-gray-dark/90">
              A Solar Energy Qualidade e Eficiência nasceu para transformar a forma como
              pessoas e empresas consomem energia, unindo engenharia, atendimento próximo
              e execução segura em projetos fotovoltaicos.
            </p>
            <p className="mt-5 text-base leading-7 text-gray-dark/65">
              O compromisso é entregar energia limpa com clareza técnica, solução
              personalizada e resultado financeiro compatível com cada realidade.
            </p>
          </div>

          <div className="mt-10">
            <div className="divide-y divide-white/10 border-y border-white/10">
              {differentials.map((item) => (
                <div key={item.title} className="flex gap-4 py-5">
                  <item.icon aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-solar-green" />
                  <div>
                    <h3 className="font-black text-white">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-gray-dark/60">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <a
              href={createWhatsAppUrl(buildGeneralWhatsAppMessage())}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-solar-green transition hover:gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-solar-green"
            >
              Conhecer a solução ideal
              <ArrowUpRight aria-hidden className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
