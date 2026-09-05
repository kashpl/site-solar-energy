"use client";

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "gold";

type BaseProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  icon?: ReactNode;
  showArrow?: boolean;
};

type LinkButtonProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type NativeButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

const variants: Record<ButtonVariant, string> = {
  primary:
    "border border-solar-gold bg-solar-gold text-[#07131e] hover:border-[#f1c84f] hover:bg-[#f1c84f] disabled:border-white/[0.16] disabled:bg-white/[0.12] disabled:text-gray-dark/[0.7]",
  secondary:
    "border border-white/28 bg-transparent text-white hover:border-white hover:bg-white/[0.07] disabled:border-white/[0.16] disabled:text-gray-dark/[0.7]",
  ghost:
    "border border-transparent bg-transparent text-white hover:border-white/20 hover:bg-white/10",
  gold:
    "border border-solar-gold/[0.45] bg-solar-gold/10 text-solar-gold shadow-[0_16px_44px_rgba(255,215,0,0.12)] hover:-translate-y-0.5 hover:bg-solar-gold/[0.16] hover:shadow-[0_20px_54px_rgba(255,215,0,0.2)]"
};

const baseClass =
  "pressable inline-flex min-h-12 items-center justify-center gap-2 rounded-[4px] px-5 py-3 text-sm font-extrabold tracking-[0.01em] transition-[transform,background-color,border-color,color] duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-solar-green disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-70 sm:px-6";

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const {
    children,
    className,
    variant = "primary",
    icon,
    showArrow = false,
    ...rest
  } = props;

  const content = (
    <>
      {icon}
      <span className="whitespace-nowrap">{children}</span>
      {showArrow ? <ArrowRight aria-hidden className="h-4 w-4" /> : null}
    </>
  );

  if ("href" in rest && rest.href) {
    return (
      <a
        className={cn(baseClass, variants[variant], className)}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={cn(baseClass, variants[variant], className)}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
