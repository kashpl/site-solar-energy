import Image from "next/image";
import { cn } from "@/lib/utils";

export const brandAssets = {
  logo: "/images/optimized/final.webp",
  icon: "/images/optimized/icone.webp"
};

type BrandLogoProps = {
  variant?: "header" | "footer";
  className?: string;
  priority?: boolean;
};

type BrandMarkProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
  priority?: boolean;
};

export function BrandLogo({
  variant = "header",
  className,
  priority = false
}: BrandLogoProps) {
  return (
    <span
      className={cn(
        "brand-lockup",
        variant === "header" ? "brand-lockup-header" : "brand-lockup-footer",
        className
      )}
    >
      <BrandMark size={variant === "header" ? "sm" : "md"} priority={priority} />
      <span className="brand-lockup-copy">
        <span className="brand-lockup-name" aria-label="Solar Energy">
          <span className="brand-word-solar">Solar</span>
          <span className="brand-word-energy">Energy</span>
        </span>
        <span className="brand-lockup-subtitle">Qualidade e Eficiência</span>
      </span>
    </span>
  );
}

export function BrandMark({
  size = "md",
  className,
  priority = false
}: BrandMarkProps) {
  return (
    <span className={cn("brand-mark", `brand-mark-${size}`, className)} aria-hidden="true">
      <span className="brand-mark-halo" />
      <Image
        src={brandAssets.icon}
        alt=""
        fill
        sizes={size === "sm" ? "44px" : size === "md" ? "56px" : "72px"}
        priority={priority}
        className="brand-mark-image"
      />
      <span className="brand-mark-shine" />
    </span>
  );
}

type BrandIconProps = {
  variant?: "watermark" | "accent";
  className?: string;
  priority?: boolean;
};

export function BrandIcon({
  variant = "watermark",
  className,
  priority = false
}: BrandIconProps) {
  return (
    <span
      className={cn("brand-icon-integrated", `brand-icon-integrated-${variant}`, className)}
      aria-hidden="true"
    >
      <Image
        src={brandAssets.icon}
        alt=""
        fill
        sizes={variant === "watermark" ? "360px" : "96px"}
        priority={priority}
        className="brand-icon-integrated-image"
      />
    </span>
  );
}
