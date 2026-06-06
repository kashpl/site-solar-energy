import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-white/[0.14] bg-white/[0.075] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,0.14),transparent_32%,rgba(0,208,132,0.08))] before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
