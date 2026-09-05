"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import { Cookie, Settings2, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

type ConsentPreference = "unknown" | "accepted" | "rejected";

const storageKey = "solar-energy-cookie-consent";
const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim();
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();

export function AnalyticsConsent() {
  const [preference, setPreference] = useState<ConsentPreference>("unknown");
  const [showPanel, setShowPanel] = useState(false);
  const analyticsConfigured = Boolean(gaId || metaPixelId);

  useEffect(() => {
    if (!analyticsConfigured) return;

    let nextPreference: ConsentPreference = "rejected";

    try {
      const stored = window.localStorage.getItem(storageKey);
      nextPreference =
        stored === "accepted" || stored === "rejected" ? stored : "unknown";

      window.__solarAnalyticsConsent =
        nextPreference === "accepted" ? "accepted" : "rejected";
    } catch {
      window.__solarAnalyticsConsent = "rejected";
    }

    const updateState = window.setTimeout(() => {
      setPreference(nextPreference);
      setShowPanel(nextPreference === "unknown");
    }, 0);

    return () => window.clearTimeout(updateState);
  }, [analyticsConfigured]);

  useEffect(() => {
    if (preference !== "accepted") return;

    const handleTrackedClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      const linkText = anchor.textContent?.trim().slice(0, 80) || "link";

      if (href.includes("wa.me") || href.includes("api.whatsapp.com")) {
        trackEvent("whatsapp_click", { link_text: linkText });
      } else if (href === "#simulador") {
        trackEvent("simulator_cta_click", { link_text: linkText });
      } else if (href === "#contato") {
        trackEvent("contact_cta_click", { link_text: linkText });
      }
    };

    document.addEventListener("click", handleTrackedClick);
    return () => document.removeEventListener("click", handleTrackedClick);
  }, [preference]);

  if (!analyticsConfigured) return null;

  const savePreference = (value: Exclude<ConsentPreference, "unknown">) => {
    try {
      window.localStorage.setItem(storageKey, value);
    } catch {
      // The choice still applies to the current session when storage is unavailable.
    }

    window.__solarAnalyticsConsent = value;
    setPreference(value);
    setShowPanel(false);
  };

  return (
    <>
      {preference === "accepted" && gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="solar-ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}

      {preference === "accepted" && metaPixelId ? (
        <Script id="solar-meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
        </Script>
      ) : null}

      {showPanel ? (
        <aside
          aria-label="Preferências de cookies"
          className="fixed inset-x-4 bottom-4 z-[90] mx-auto max-w-4xl rounded-[24px] border border-white/15 bg-[#001a4d] p-5 text-white shadow-[0_24px_90px_rgba(0,0,0,0.45)] sm:p-6"
        >
          <div className="flex items-start gap-4">
            <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-solar-green text-navy sm:flex">
              <Cookie aria-hidden className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-black">Sua privacidade importa</h2>
              <p className="mt-2 text-sm leading-6 text-gray-dark/70">
                Cookies opcionais ajudam a medir visitas e conversões. Você pode aceitar
                ou recusar sem afetar o funcionamento do site. Leia a{" "}
                <Link
                  href="/politica-de-privacidade#cookies"
                  className="font-bold text-solar-green underline underline-offset-4"
                >
                  Política de Privacidade
                </Link>
                .
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => savePreference("rejected")}
                  className="min-h-11 rounded-full border border-white/20 px-5 text-sm font-black text-white transition hover:border-white/40"
                >
                  Recusar opcionais
                </button>
                <button
                  type="button"
                  onClick={() => savePreference("accepted")}
                  className="min-h-11 rounded-full bg-solar-green px-5 text-sm font-black text-navy transition hover:bg-[#20e09a]"
                >
                  Aceitar medição
                </button>
              </div>
            </div>
            <button
              type="button"
              aria-label="Fechar preferências sem aceitar"
              onClick={() => savePreference("rejected")}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-gray-dark"
            >
              <X aria-hidden className="h-4 w-4" />
            </button>
          </div>
        </aside>
      ) : (
        <button
          type="button"
          onClick={() => setShowPanel(true)}
          className="fixed bottom-4 left-4 z-[80] flex h-10 items-center gap-2 rounded-full border border-white/15 bg-[#001a4d] px-3 text-xs font-bold text-white shadow-lg sm:bottom-5"
          aria-label="Reabrir preferências de cookies"
        >
          <Settings2 aria-hidden className="h-4 w-4 text-solar-green" />
          Cookies
        </button>
      )}
    </>
  );
}
