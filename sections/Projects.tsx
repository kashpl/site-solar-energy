import { Container } from "@/components/Container";
import { ProjectExplorer } from "@/components/ProjectExplorer";

export function Projects() {
  return (
    <section id="projetos" className="bg-[#020812] py-20 text-white sm:py-24 lg:py-28">
      <Container>
        <div className="grid gap-7 border-t border-white/16 pt-6 lg:grid-cols-[0.55fr_1.45fr] lg:gap-16">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-solar-gold">02 / Obras reais</p>
          <div>
            <h2 className="max-w-[850px] text-4xl font-black leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-[3.9rem]">Quatro escalas. A mesma responsabilidade técnica.</h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/62 sm:text-lg">Navegue por instalações residenciais, comerciais, industriais e corporativas executadas pela Solar Energy.</p>
          </div>
        </div>
        <div className="mt-12 lg:mt-14"><ProjectExplorer /></div>
      </Container>
    </section>
  );
}
