import { Container } from "@/components/Container";

const steps = [
  { title: "Análise de consumo", text: "Leitura da conta, entendimento da rotina e definição do cenário com melhor potencial." },
  { title: "Projeto personalizado", text: "Dimensionamento compatível com imóvel, consumo, estrutura e objetivo financeiro." },
  { title: "Homologação", text: "Documentação técnica e condução da aprovação junto à concessionária." },
  { title: "Instalação", text: "Execução profissional, segurança elétrica e controle de qualidade em campo." },
  { title: "Geração e suporte", text: "Ativação, orientação e acompanhamento para preservar a performance do sistema." }
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="section-transition-light py-20 text-navy sm:py-24 lg:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="border-t border-navy/25 pt-6 text-xs font-black uppercase tracking-[0.18em] text-[#49647c]">04 / Método de entrega</p>
            <h2 className="mt-7 max-w-lg text-4xl font-black leading-[1.02] tracking-[-0.04em] sm:text-5xl">Um processo claro, do consumo à geração.</h2>
            <p className="mt-6 max-w-md text-base leading-8 text-ink-muted">Você acompanha um fluxo único, com responsabilidade clara desde a conta de energia até o sistema em operação.</p>
          </div>
          <ol className="border-t border-navy/25">
            {steps.map((step, index) => (
              <li key={step.title} data-reveal style={{ "--reveal-delay": `${index * 55}ms` } as React.CSSProperties} className="group grid gap-5 border-b border-navy/20 py-7 sm:grid-cols-[68px_0.75fr_1.25fr] sm:items-start sm:gap-7 sm:py-8">
                <span className="tabular-nums text-3xl font-black tracking-[-0.04em] text-[#65788a] transition-colors group-hover:text-[#0863b5]">0{index + 1}</span>
                <h3 className="text-xl font-black leading-tight">{step.title}</h3>
                <p className="text-sm leading-7 text-ink-muted sm:text-base">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
