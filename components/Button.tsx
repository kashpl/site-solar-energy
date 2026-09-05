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
    "bg-solar-green text-navy shadow-[0_16px_42px_rgba(0,208,132,0.22)] hover:-translate-y-0.5 hover:bg-[#20e09a] hover:shadow-[0_20px_54px_rgba(0,208,132,0.32)] disabled:border disabled:border-white/[0.16] disabled:bg-white/[0.12] disabled:text-gray-dark/[0.7] disabled:shadow-none",
  secondary:
    "border border-white/20 bg-[#06356f] text-white hover:-translate-y-0.5 hover:border-solar-green/60 hover:bg-[#0a4590] disabled:border-white/[0.16] disabled:bg-[#06356f] disabled:text-gray-dark/[0.7] disabled:shadow-none",
  ghost:
    "border border-transparent bg-transparent text-white hover:border-white/20 hover:bg-white/10",
  gold:
    "border border-solar-gold/[0.45] bg-solar-gold/10 text-solar-gold shadow-[0_16px_44px_rgba(255,215,0,0.12)] hover:-translate-y-0.5 hover:bg-solar-gold/[0.16] hover:shadow-[0_20px_54px_rgba(255,215,0,0.2)]"
};

const baseClass =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold tracking-[-0.01em] transition-[transform,background-color,border-color,box-shadow,color] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-solar-green disabled:pointer-events-none disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 sm:px-6";

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
