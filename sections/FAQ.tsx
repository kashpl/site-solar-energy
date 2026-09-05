import { ChevronDown } from "lucide-react";
import { Container } from "@/components/Container";
import { faqs } from "@/data/faqs";

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };

export function FAQ() {
  return (
    <section id="duvidas" className="bg-paper py-20 text-navy sm:py-24 lg:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="border-t border-navy/25 pt-6 text-xs font-black uppercase tracking-[0.18em] text-[#49647c]">07 / Critérios de decisão</p>
            <h2 className="mt-8 text-4xl font-black leading-[1.02] tracking-[-0.04em] sm:text-5xl">Perguntas que precisam de respostas objetivas.</h2>
            <p className="mt-6 max-w-md text-base leading-8 text-ink-muted">Economia, potência, homologação e manutenção explicadas sem atalhos comerciais.</p>
          </div>
          <div data-reveal className="overflow-hidden rounded-[22px] border border-navy/20 bg-white/30 shadow-[0_16px_50px_rgba(0,20,42,.06)]">
            {faqs.map((faq, index) => (
              <details key={faq.question} className="group border-b border-navy/20">
                <summary className="flex cursor-pointer list-none items-start gap-5 px-5 py-7 transition-[background-color] hover:bg-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#00815f] sm:gap-8 sm:px-7 sm:py-8">
                  <span className="mt-1 text-xs font-black tracking-[0.12em] text-[#596f82]">0{index + 1}</span>
                  <span className="flex-1 text-lg font-black leading-7 sm:text-xl">{faq.question}</span>
                  <ChevronDown aria-hidden className="mt-1 h-5 w-5 shrink-0 text-[#00815f] transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <p className="mx-5 max-w-3xl pb-8 pl-10 text-sm leading-7 text-ink-muted sm:mx-7 sm:pl-[68px] sm:text-base">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
