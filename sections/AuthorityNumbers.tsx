import { Container } from "@/components/Container";

const stats = [
  { value: "+500", label: "análises de projeto" },
  { value: "Até 95%", label: "de economia estimada" },
  { value: "3", label: "perfis de operação" },
  { value: "360°", label: "de gestão técnica" }
];

export function AuthorityNumbers() {
  return (
    <section
      aria-label="Indicadores da Solar Energy"
      className="border-b border-[#dce2d8] bg-[#f4f6f0] py-8 text-[#071a22] sm:py-10"
    >
      <Container>
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4 lg:divide-x lg:divide-[#d8ded3]">
          {stats.map((stat) => (
            <div key={stat.label} className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
              <p className="text-3xl font-black tracking-[-0.05em] sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-semibold leading-5 text-[#617078]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
