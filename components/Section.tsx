import type { ReactNode } from "react";
import { Container } from "@/components/Container";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  headingAlign?: "center" | "left";
  compact?: boolean;
};

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className,
  headingAlign = "center",
  compact = false
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden",
        compact ? "py-14 sm:py-16 lg:py-20" : "py-16 sm:py-20 lg:py-24",
        className
      )}
    >
      <Container>
        {title ? (
          <div
            className={cn(
              "relative mb-12 max-w-3xl sm:mb-14",
              headingAlign === "center" ? "mx-auto text-center" : "mr-auto text-left"
            )}
          >
            {eyebrow ? (
              <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.16em] text-solar-green">
                {eyebrow}
              </p>
            ) : null}
            <div
              className={cn(
                "mb-5 h-px w-24 bg-gradient-to-r from-solar-green via-solar-gold to-transparent",
                headingAlign === "center" && "mx-auto from-transparent"
              )}
            />
            <h2 className="text-balance text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            {subtitle ? (
              <p
                className={cn(
                  "mt-5 max-w-2xl text-pretty text-base leading-8 text-gray-dark/[0.78] sm:text-lg",
                  headingAlign === "center" && "mx-auto"
                )}
              >
                {subtitle}
              </p>
            ) : null}
          </div>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
