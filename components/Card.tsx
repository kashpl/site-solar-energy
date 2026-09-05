import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[24px] border border-white/[0.12] bg-[#102b35] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.2)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
