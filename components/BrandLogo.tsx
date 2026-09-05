import { cn } from "@/lib/utils";

type BrandLogoProps = {
  variant?: "header" | "footer";
  className?: string;
  priority?: boolean;
};

export function BrandLogo({
  variant = "header",
  className
}: BrandLogoProps) {
  const isFooter = variant === "footer";

  return (
    <span className={cn("inline-flex min-w-0 items-center gap-3", className)}>
      <span
        className={cn(
          "flex shrink-0 items-center justify-center rounded-[14px] bg-solar-green text-navy shadow-[0_12px_34px_rgba(184,240,74,0.18)]",
          isFooter ? "h-14 w-14" : "h-11 w-11"
        )}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 48 48"
          className={isFooter ? "h-9 w-9" : "h-7 w-7"}
          fill="none"
        >
          <circle cx="32.5" cy="12.5" r="5.5" fill="currentColor" />
          <path
            d="M9 29.5 16.5 17h21L30 29.5H9Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          <path d="m16 20 14 7.5M24 17l-7.5 12.5" stroke="currentColor" strokeWidth="2.2" />
          <path
            d="M8 36h19.5"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        </svg>
      </span>

      <span className="grid min-w-0 leading-none">
        <span
          className={cn(
            "whitespace-nowrap font-black uppercase tracking-[-0.03em] text-white",
            isFooter ? "text-[1.7rem]" : "text-[1.15rem] sm:text-[1.28rem]"
          )}
        >
          Solar <span className="text-solar-green">Energy</span>
        </span>
        <span
          className={cn(
            "mt-1 whitespace-nowrap font-bold uppercase text-gray-dark/60",
            isFooter
              ? "text-[0.65rem] tracking-[0.2em]"
              : "text-[0.52rem] tracking-[0.18em] sm:text-[0.57rem]"
          )}
        >
          Qualidade e eficiência
        </span>
      </span>
    </span>
  );
}
