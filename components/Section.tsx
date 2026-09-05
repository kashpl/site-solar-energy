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
  tone?: "dark" | "light";
};

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className,
  headingAlign = "center",
  compact = false,
  tone = "dark"
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-[76px] overflow-hidden",
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
              <p className={cn(
                "mb-4 text-xs font-black uppercase tracking-[0.18em]",
                tone === "light" ? "text-[#2d6500]" : "text-solar-green"
              )}>
                {eyebrow}
              </p>
            ) : null}
            <h2 className={cn(
              "text-balance text-3xl font-black leading-[1.05] tracking-[-0.045em] sm:text-4xl lg:text-5xl",
              tone === "light" ? "text-[#071a22]" : "text-white"
            )}>
              {title}
            </h2>
            {subtitle ? (
              <p
                className={cn(
                  "mt-5 max-w-2xl text-pretty text-base leading-8 sm:text-lg",
                  tone === "light" ? "text-[#526168]" : "text-gray-dark/[0.74]",
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
