export type AnalyticsEventParams = Record<
  string,
  string | number | boolean | undefined
>;

declare global {
  interface Window {
    __solarAnalyticsConsent?: "accepted" | "rejected";
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params: AnalyticsEventParams = {}) {
  if (typeof window === "undefined" || window.__solarAnalyticsConsent !== "accepted") {
    return;
  }

  window.gtag?.("event", name, params);

  if (name === "generate_lead") {
    window.fbq?.("track", "Lead", params);
    return;
  }

  window.fbq?.("trackCustom", name, params);
}
