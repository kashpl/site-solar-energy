"use client";

import { useEffect, useState } from "react";
import { company } from "@/data/company";
import {
  buildFloatingWhatsAppMessage,
  createWhatsAppUrl
} from "@/lib/whatsappFormatter";

export function WhatsAppButton() {
  const [suppressedOnMobile, setSuppressedOnMobile] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 639px)");
    const legacyMediaQuery = mobileQuery as MediaQueryList & {
      addListener: (listener: () => void) => void;
      removeListener: (listener: () => void) => void;
    };
    const guardedSections = Array.from(
      document.querySelectorAll<HTMLElement>("#simulador, #contato")
    );
    const visibleSections = new Set<Element>();
    const addMediaListener = () => {
      if ("addEventListener" in mobileQuery) mobileQuery.addEventListener("change", updateVisibility);
      else legacyMediaQuery.addListener(updateVisibility);
    };
    const removeMediaListener = () => {
      if ("removeEventListener" in mobileQuery) mobileQuery.removeEventListener("change", updateVisibility);
      else legacyMediaQuery.removeListener(updateVisibility);
    };

    const updateVisibility = () => {
      const focusInsideGuardedSection = Boolean(
        document.activeElement?.closest("#simulador, #contato")
      );
      setSuppressedOnMobile(
        mobileQuery.matches && (visibleSections.size > 0 || focusInsideGuardedSection)
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleSections.add(entry.target);
          else visibleSections.delete(entry.target);
        });
        updateVisibility();
      },
      { threshold: 0.12 }
    );

    guardedSections.forEach((section) => observer.observe(section));
    document.addEventListener("focusin", updateVisibility);
    document.addEventListener("focusout", updateVisibility);
    addMediaListener();
    updateVisibility();

    return () => {
      observer.disconnect();
      document.removeEventListener("focusin", updateVisibility);
      document.removeEventListener("focusout", updateVisibility);
      removeMediaListener();
    };
  }, []);

  return (
    <a
      href={createWhatsAppUrl(buildFloatingWhatsAppMessage())}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar pelo WhatsApp"
      aria-hidden={suppressedOnMobile || undefined}
      tabIndex={suppressedOnMobile ? -1 : undefined}
      title={`Falar com a ${company.shortName} pelo WhatsApp`}
      className={`group fixed bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] right-3 z-[70] inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-[#25d366] text-white shadow-[0_12px_28px_rgba(0,0,0,.24)] transition-[transform,box-shadow,opacity] duration-200 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(0,0,0,.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-solar-gold sm:bottom-6 sm:right-6 sm:h-[60px] sm:w-[60px] ${suppressedOnMobile ? "pointer-events-none translate-x-[calc(100%+1rem)] opacity-0 sm:pointer-events-auto sm:translate-x-0 sm:opacity-100" : "opacity-90 sm:opacity-100"}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="relative h-7 w-7 fill-current sm:h-8 sm:w-8"
      >
        <path d="M16.03 3.2A12.73 12.73 0 0 0 5.06 22.4L3.2 29l6.78-1.78A12.72 12.72 0 1 0 16.03 3.2Zm0 23.13a10.57 10.57 0 0 1-5.39-1.48l-.39-.23-4.02 1.05 1.08-3.91-.25-.4a10.59 10.59 0 1 1 8.97 4.97Zm5.8-7.92c-.32-.16-1.87-.92-2.16-1.03-.29-.11-.5-.16-.71.16-.21.32-.82 1.03-1.01 1.24-.18.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.56-.94-.84-1.58-1.88-1.76-2.19-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.71-.98-2.35-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.08-1.11 2.64s1.14 3.07 1.29 3.28c.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.46.21 2.01.13.61-.09 1.87-.76 2.13-1.5.26-.74.26-1.37.18-1.5-.08-.13-.29-.21-.61-.37Z" />
      </svg>
      <span className="pointer-events-none absolute bottom-full right-0 mb-3 hidden w-max rounded-md border border-white/[0.15] bg-navy px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-glow transition duration-300 group-hover:opacity-100 sm:block">
        Falar pelo WhatsApp
      </span>
    </a>
  );
}
