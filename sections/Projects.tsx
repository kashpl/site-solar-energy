import { Container } from "@/components/Container";
import { ProjectExplorer } from "@/components/ProjectExplorer";
import { SegmentLegend } from "@/components/SegmentLegend";

export function Projects() {
  return (
    <section id="projetos" className="section-transition-dark py-16 text-white sm:py-20 lg:py-24">
      <Container>
        <div data-reveal className="grid gap-7 border-t border-white/16 pt-6 lg:grid-cols-[0.55fr_1.45fr] lg:gap-16">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-solar-gold">02 / Obras reais</p>
          <div>
            <h2 className="section-heading max-w-[820px] font-black">Quatro escalas. A mesma responsabilidade técnica.</h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/62 sm:text-lg">Navegue por instalações residenciais, comerciais, industriais e corporativas executadas pela Solar Energy.</p>
            <SegmentLegend segments={["Residencial", "Comercial", "Industrial", "Usina"]} tone="dark" className="mt-5" />
          </div>
        </div>
        <div data-reveal className="mt-12 lg:mt-14"><ProjectExplorer /></div>
      </Container>
    </section>
  );
}
