import { Quote } from "lucide-react";
import { Container } from "@/components/Container";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section aria-label="Depoimentos de clientes" className="bg-[#ece9e1] py-20 text-navy sm:py-24 lg:py-28">
      <Container>
        <div data-reveal className="grid gap-8 border-t border-navy/18 pt-6 lg:grid-cols-[.55fr_1.45fr] lg:gap-16">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#a84100]">06 / Clientes</p>
            <Quote aria-hidden className="mt-8 h-10 w-10 text-solar-gold" strokeWidth={1.6} />
          </div>
          <div>
            <blockquote className="max-w-5xl text-3xl font-black leading-[1.14] tracking-[-0.035em] sm:text-4xl lg:text-[2.9rem]">“{testimonials[0].quote}”</blockquote>
            <div className="mt-7 flex flex-wrap gap-x-4 gap-y-1 text-sm"><strong>{testimonials[0].name}</strong><span className="text-ink-muted">{testimonials[0].detail}</span></div>
          </div>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {testimonials.slice(1).map((testimonial, index) => (
            <figure key={testimonial.name} data-reveal style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties} className="border border-navy/15 bg-paper p-7 sm:p-9">
              <span aria-hidden className="block h-1 w-12" style={{ backgroundColor: index === 0 ? "#1479d8" : "#35b957" }} />
              <blockquote className="mt-7 text-lg font-semibold leading-8">“{testimonial.quote}”</blockquote>
              <figcaption className="mt-7 text-xs font-bold uppercase tracking-[0.1em] text-ink-muted">{testimonial.name} · {testimonial.detail}</figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
