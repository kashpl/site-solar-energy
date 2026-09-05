import { Quote } from "lucide-react";
import { Section } from "@/components/Section";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <Section
      eyebrow="Experiência do cliente"
      title="Confiança construída em cada etapa."
      subtitle="Relatos de clientes residenciais, empresariais e corporativos atendidos pela Solar Energy."
      className="bg-[#f5f7fa]"
      headingAlign="left"
      tone="light"
      compact
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <article
            key={testimonial.name}
            className="flex h-full flex-col rounded-[26px] border border-[#d8e1ec] bg-white p-6 sm:p-7"
          >
            <div className="flex items-center justify-between gap-4">
              <Quote aria-hidden className="h-7 w-7 text-[#00735c]" />
              <span className="text-xs font-black tracking-[0.14em] text-[#8795a8]">
                0{index + 1}
              </span>
            </div>
            <blockquote className="mt-8 flex-1 text-base font-semibold leading-7 text-[#203b59]">
              “{testimonial.quote}”
            </blockquote>
            <div className="mt-8 border-t border-[#e0e7f0] pt-5">
              <p className="font-black text-[#001a4d]">{testimonial.name}</p>
              <p className="mt-1 text-sm text-[#61728a]">{testimonial.role}</p>
              <p className="mt-3 text-xs font-black uppercase tracking-[0.12em] text-[#00735c]">
                {testimonial.detail}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
