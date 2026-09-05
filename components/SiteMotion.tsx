"use client";

import { useEffect } from "react";

export function SiteMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    root.dataset.motionReady = "true";

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.setAttribute("data-visible", "true"));
      return () => { delete root.dataset.motionReady; };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-visible", "true");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -9% 0px", threshold: 0.1 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      delete root.dataset.motionReady;
    };
  }, []);

  return null;
}
