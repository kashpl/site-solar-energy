"use client";

import { KeyboardEvent, useId, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { AlertCircle, MapPin } from "lucide-react";
import { getCitySuggestions } from "@/data/cities";
import { cn } from "@/lib/utils";

type CityAutocompleteProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  icon?: LucideIcon;
  className?: string;
};

const fieldClass =
  "w-full rounded-xl border border-white/[0.15] bg-white/[0.08] px-4 py-3 text-white outline-none transition-[border-color,background-color,box-shadow] duration-200 placeholder:text-white/40 focus:border-solar-green focus:bg-white/[0.12] focus:shadow-[0_0_0_4px_rgba(53,185,87,0.13)]";

export function CityAutocomplete({
  label,
  value,
  onChange,
  placeholder = "Fortaleza/CE",
  error,
  required,
  icon: Icon = MapPin,
  className
}: CityAutocompleteProps) {
  const id = useId();
  const listboxId = `${id}-cities`;
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const suggestions = useMemo(() => getCitySuggestions(value), [value]);
  const showSuggestions = isOpen && suggestions.length > 0;

  const selectCity = (city: string) => {
    onChange(city);
    setIsOpen(false);
    setActiveIndex(0);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % suggestions.length);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => (current - 1 + suggestions.length) % suggestions.length);
    }

    if (event.key === "Enter") {
      event.preventDefault();
      selectCity(suggestions[activeIndex]);
    }

    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <label className={cn("relative block", className)}>
      <span className="mb-2 flex items-center gap-2 text-sm font-medium text-silver-white">
        <Icon aria-hidden className="h-4 w-4 text-solar-green" />
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
          setIsOpen(true);
          setActiveIndex(0);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => window.setTimeout(() => setIsOpen(false), 120)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        required={required}
        aria-invalid={!!error}
        aria-autocomplete="list"
        aria-controls={listboxId}
        aria-expanded={showSuggestions}
        aria-label={label}
        role="combobox"
        className={fieldClass}
      />

      {showSuggestions ? (
        <div
          id={listboxId}
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-40 overflow-hidden rounded-xl border border-white/[0.16] bg-[#002c66] p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.38)]"
        >
          {suggestions.map((city, index) => (
            <button
              key={city}
              type="button"
              role="option"
              aria-selected={index === activeIndex}
              onMouseDown={(event) => {
                event.preventDefault();
                selectCity(city);
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-gray-dark transition hover:bg-solar-green/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solar-gold",
                index === activeIndex && "bg-solar-green/10 text-white"
              )}
            >
              <span>{city}</span>
              <span className="text-xs font-bold text-solar-green">
                selecionar
              </span>
            </button>
          ))}
        </div>
      ) : null}

      {error ? (
        <span className="mt-2 flex items-center gap-2 text-sm text-[#ffb4b4]" role="alert">
          <AlertCircle aria-hidden className="h-4 w-4" />
          {error}
        </span>
      ) : null}
    </label>
  );
}
