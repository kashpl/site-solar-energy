import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  variant?: "header" | "footer";
  className?: string;
  priority?: boolean;
};

export function BrandLogo({
  variant = "header",
  className,
  priority = false
}: BrandLogoProps) {
  const isFooter = variant === "footer";

  return (
    <span className={cn("inline-flex min-w-0 items-center gap-3", className)}>
      <span
        className={cn(
          "relative shrink-0 overflow-hidden rounded-[14px] border border-white/15 bg-black shadow-[0_12px_34px_rgba(0,82,204,0.3)]",
          isFooter ? "h-16 w-16" : "h-12 w-12"
        )}
      >
        <Image
          src="/solar-energy-logo.png"
          alt=""
          fill
          priority={priority}
          sizes={isFooter ? "64px" : "48px"}
          className="object-cover"
        />
      </span>

      <span className="grid min-w-0 leading-none">
        <span
          className={cn(
            "whitespace-nowrap font-black uppercase tracking-[-0.03em] text-white",
            isFooter ? "text-[1.7rem]" : "text-[1.15rem] sm:text-[1.28rem]"
          )}
        >
          Solar <span className="text-solar-gold">Energy</span>
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
