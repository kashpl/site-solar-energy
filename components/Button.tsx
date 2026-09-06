"use client";

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "gold" | "action";

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
    "border border-solar-gold bg-solar-gold text-[#07131e] shadow-[0_12px_30px_rgba(230,179,41,.18)] hover:border-[#f1c84f] hover:bg-[#f1c84f] disabled:border-white/[0.16] disabled:bg-white/[0.12] disabled:text-gray-dark/[0.7]",
  secondary:
    "border border-white/28 bg-transparent text-white hover:border-white hover:bg-white/[0.07] disabled:border-white/[0.16] disabled:text-gray-dark/[0.7]",
  ghost:
    "border border-transparent bg-transparent text-white hover:border-white/20 hover:bg-white/10",
  gold:
    "border border-solar-gold/[0.45] bg-solar-gold/10 text-solar-gold shadow-[0_16px_44px_rgba(255,215,0,0.12)] hover:bg-solar-gold/[0.16] hover:shadow-[0_20px_54px_rgba(255,215,0,0.2)]",
  action:
    "border border-solar-green bg-solar-green text-[#06131e] shadow-[0_12px_30px_rgba(53,185,87,.2)] hover:border-[#50ca6d] hover:bg-[#50ca6d] disabled:border-white/[0.16] disabled:bg-white/[0.12] disabled:text-gray-dark/[0.7]"
};

const baseClass =
  "button-premium pressable group relative isolate inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-3 text-sm font-extrabold tracking-[0.01em] transition-[transform,background-color,border-color,color,box-shadow] duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-solar-green disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-70 sm:px-6";

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
      <span aria-hidden className="button-sheen absolute inset-y-0 -left-1/3 -z-0 w-1/3 bg-white/25 blur-md" />
      {icon ? <span className="relative z-10">{icon}</span> : null}
      <span className="relative z-10 whitespace-nowrap">{children}</span>
      {showArrow ? <ArrowRight aria-hidden className="button-arrow relative z-10 h-4 w-4" /> : null}
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
