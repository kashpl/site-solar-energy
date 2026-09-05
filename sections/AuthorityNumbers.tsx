import { Container } from "@/components/Container";

const stats = [
  { value: "+500", label: "análises realizadas", note: "Base técnica para decisões de investimento." },
  { value: "até 95%", label: "de economia estimada", note: "Conforme perfil de consumo e viabilidade." },
  { value: "360°", label: "gestão do projeto", note: "Da leitura da conta ao acompanhamento." }
];

export function AuthorityNumbers() {
  return (
    <section aria-label="Indicadores da Solar Energy" className="border-y border-white/12 bg-[#071421] text-white">
      <Container>
        <div data-reveal className="grid lg:grid-cols-[0.72fr_2.28fr]">
          <div className="border-b border-white/12 py-7 lg:border-b-0 lg:border-r lg:py-8 lg:pr-10">
            <p className="text-[0.7rem] font-black uppercase tracking-[0.18em] text-solar-gold">Experiência aplicada</p>
            <p className="mt-3 max-w-xs text-sm font-semibold leading-6 text-white/62">Números que ajudam a dimensionar capacidade, economia e acompanhamento.</p>
          </div>
          <dl className="grid sm:grid-cols-3 sm:divide-x sm:divide-white/12">
            {stats.map((stat, index) => (
              <div key={stat.label} className="border-b border-white/12 py-7 last:border-b-0 sm:border-b-0 sm:px-7 lg:px-9 lg:py-8">
                <dt className="text-sm font-bold text-white/72">{stat.label}</dt>
                <dd className="mt-2">
                  <span className="block tabular-nums text-4xl font-black tracking-[-0.04em]">{stat.value}</span>
                  <span aria-hidden className="mt-4 block h-1 w-10" style={{ backgroundColor: ["#35b957", "#1479d8", "#e6b329"][index] }} />
                  <span className="mt-3 block text-xs leading-5 text-white/58">{stat.note}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
