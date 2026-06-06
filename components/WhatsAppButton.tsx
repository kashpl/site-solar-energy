"use client";

import { company } from "@/data/company";
import {
  buildFloatingWhatsAppMessage,
  createWhatsAppUrl
} from "@/lib/whatsappFormatter";

export function WhatsAppButton() {
  return (
    <a
      href={createWhatsAppUrl(buildFloatingWhatsAppMessage())}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar pelo WhatsApp"
      title={`Falar com a ${company.shortName} pelo WhatsApp`}
      className="group fixed bottom-5 right-5 z-[70] inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-[#25d366] text-white shadow-[0_18px_46px_rgba(37,211,102,0.38)] transition duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_22px_58px_rgba(37,211,102,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-solar-gold sm:bottom-6 sm:right-6 sm:h-[60px] sm:w-[60px]"
    >
      <span className="absolute inset-0 rounded-full bg-[#25d366]/35 animate-ping" />
      <span className="absolute -inset-1 rounded-full bg-[#25d366]/20 blur-md transition group-hover:bg-[#25d366]/30" />
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
