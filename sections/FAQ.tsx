import { ChevronDown } from "lucide-react";
import { Section } from "@/components/Section";
import { faqs } from "@/data/faqs";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer
    }
  }))
};

export function FAQ() {
  return (
    <Section
      id="duvidas"
      eyebrow="Dúvidas frequentes"
      title="Informação clara antes da decisão."
      subtitle="Respostas objetivas sobre economia, dimensionamento, homologação e manutenção de sistemas fotovoltaicos."
      className="bg-[#f4f6f0]"
      headingAlign="left"
      tone="light"
      compact
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c")
        }}
      />
      <div className="divide-y divide-[#d8ded3] border-y border-[#d8ded3]">
        {faqs.map((faq, index) => (
          <details key={faq.question} className="group py-5 sm:py-6">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4d7c0f]">
              <span className="flex gap-4">
                <span className="mt-1 text-xs font-black tracking-[0.12em] text-[#7b8981]">
                  0{index + 1}
                </span>
                <span className="text-lg font-black text-[#071a22] sm:text-xl">
                  {faq.question}
                </span>
              </span>
              <ChevronDown
                aria-hidden
                className="mt-1 h-5 w-5 shrink-0 text-[#4d7c0f] transition group-open:rotate-180"
              />
            </summary>
            <p className="ml-10 mt-4 max-w-3xl text-sm leading-7 text-[#617078] sm:text-base">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
