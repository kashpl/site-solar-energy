"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Section } from "@/components/Section";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % testimonials.length);
    }, 5600);

    return () => window.clearInterval(interval);
  }, []);

  const goTo = (index: number) => setActive(index);
  const previous = () =>
    setActive((current) => (current - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((current) => (current + 1) % testimonials.length);

  return (
    <Section
      eyebrow="Prova social"
      title="Clientes que confiam na Solar Energy"
      subtitle="Experiências que reforçam atendimento, economia e qualidade técnica em diferentes perfis de projeto."
      className="section-proof section-divider-bottom"
      headingAlign="left"
      compact
    >
      <div className="hidden gap-5 lg:grid lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <TestimonialCard testimonial={testimonial} index={index} />
          </motion.div>
        ))}
      </div>

      <div className="lg:hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={testimonials[active].name}
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.32 }}
          >
            <TestimonialCard testimonial={testimonials[active]} index={active} />
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex gap-2">
            {testimonials.map((item, index) => (
              <button
                key={item.name}
                type="button"
                aria-label={`Ver depoimento de ${item.name}`}
                onClick={() => goTo(index)}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-solar-gold",
                  active === index ? "w-9 bg-solar-green" : "w-2.5 bg-white/25"
                )}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={previous}
              aria-label="Depoimento anterior"
              className="flex h-11 w-11 items-center justify-center rounded-md border border-white/[0.14] bg-white/[0.08] text-white transition hover:border-solar-green hover:bg-white/[0.12]"
            >
              <ChevronLeft aria-hidden className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Próximo depoimento"
              className="flex h-11 w-11 items-center justify-center rounded-md border border-white/[0.14] bg-white/[0.08] text-white transition hover:border-solar-green hover:bg-white/[0.12]"
            >
              <ChevronRight aria-hidden className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}

type Testimonial = (typeof testimonials)[number];

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

function TestimonialCard({
  testimonial,
  index
}: {
  testimonial: Testimonial;
  index: number;
}) {
  const avatarClass =
    index % 3 === 1
      ? "from-solar-gold to-solar-green"
      : index % 3 === 2
        ? "from-solar-blue to-solar-green"
        : "from-solar-green to-solar-gold";

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-white/[0.14] bg-white/[0.07] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.26)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-solar-green/[0.45]">
      <Quote
        aria-hidden
        className="absolute right-5 top-5 h-12 w-12 text-white/[0.07] transition group-hover:text-solar-gold/20"
      />
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className={`flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br ${avatarClass} text-lg font-black uppercase text-navy shadow-gold`}>
          {getInitials(testimonial.name)}
        </div>
        <span className="rounded-full border border-solar-green/25 bg-solar-green/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-solar-green">
          {testimonial.projectType}
        </span>
      </div>

      <div className="mb-5 flex gap-1 text-solar-gold" aria-label="Avaliação cinco estrelas">
        {Array.from({ length: 5 }).map((_, starIndex) => (
          <Star key={starIndex} aria-hidden className="h-4 w-4 fill-current drop-shadow-[0_0_8px_rgba(255,215,0,0.28)]" />
        ))}
      </div>

      <p className="flex-1 text-base font-semibold leading-7 text-white">
        “{testimonial.quote}”
      </p>

      <div className="mt-6 border-t border-white/[0.12] pt-5">
        <p className="font-black text-white">{testimonial.name}</p>
        <p className="mt-1 text-sm text-gray-dark/70">{testimonial.role}</p>
        <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-solar-green/80">
          {testimonial.detail}
        </p>
      </div>
    </article>
  );
}
