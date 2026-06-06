"use client";

import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes
} from "react";
import type { LucideIcon } from "lucide-react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type FieldShellProps = {
  label: string;
  error?: string;
  icon?: LucideIcon;
  children: ReactNode;
};

function FieldShell({ label, error, icon: Icon, children }: FieldShellProps) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-sm font-medium text-silver-white">
        {Icon ? <Icon aria-hidden className="h-4 w-4 text-solar-green" /> : null}
        {label}
      </span>
      {children}
      {error ? (
        <span
          className="mt-2 flex items-center gap-2 text-sm text-[#ffb4b4]"
          role="alert"
        >
          <AlertCircle aria-hidden className="h-4 w-4" />
          {error}
        </span>
      ) : null}
    </label>
  );
}

const fieldClass =
  "w-full rounded-md border border-white/[0.15] bg-white/[0.08] px-4 py-3 text-white outline-none transition duration-300 placeholder:text-white/40 focus:border-solar-green focus:bg-white/[0.12] focus:shadow-[0_0_0_4px_rgba(0,208,132,0.12)]";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  icon?: LucideIcon;
};

export function Input({ label, error, icon, className, ...props }: InputProps) {
  return (
    <FieldShell label={label} error={error} icon={icon}>
      <input className={cn(fieldClass, className)} aria-invalid={!!error} {...props} />
    </FieldShell>
  );
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  icon?: LucideIcon;
};

export function Textarea({
  label,
  error,
  icon,
  className,
  ...props
}: TextareaProps) {
  return (
    <FieldShell label={label} error={error} icon={icon}>
      <textarea
        className={cn(fieldClass, "min-h-32 resize-y", className)}
        aria-invalid={!!error}
        {...props}
      />
    </FieldShell>
  );
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  icon?: LucideIcon;
  options: Array<{ value: string; label: string }>;
};

export function SelectInput({
  label,
  error,
  icon,
  options,
  className,
  ...props
}: SelectProps) {
  return (
    <FieldShell label={label} error={error} icon={icon}>
      <select
        className={cn(fieldClass, "appearance-none text-white", className)}
        aria-invalid={!!error}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-navy">
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}
