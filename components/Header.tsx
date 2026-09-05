"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  Building2,
  Calculator,
  FolderKanban,
  Menu,
  Route,
  SunMedium,
  X
} from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { cn, scrollToSection } from "@/lib/utils";

const navItems = [
  { href: "#solucoes", label: "Soluções", icon: SunMedium },
  { href: "#projetos", label: "Projetos", icon: FolderKanban },
  { href: "#simulador", label: "Simulador", icon: Calculator },
  { href: "#como-funciona", label: "Processo", icon: Route },
  { href: "#sobre", label: "Empresa", icon: Building2 }
];

export function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#inicio");

  useEffect(() => {
    const onScroll = () => setIsScrolled(!isHomePage || window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHomePage]);

  useEffect(() => {
    if (!isHomePage || !("IntersectionObserver" in window)) {
      return;
    }

    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible?.target.id) setActiveHref(`#${visible.target.id}`);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0.1 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHomePage]);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = isOpen ? "hidden" : previousBodyOverflow;
    document.documentElement.style.overflow = isOpen ? "hidden" : previousHtmlOverflow;

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    const closeMenu = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", closeMenu);
    return () => window.removeEventListener("keydown", closeMenu);
  }, []);

  const navigate = (href: string) => {
    setIsOpen(false);
    setActiveHref(href);
    scrollToSection(href);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
        <Container
          className={cn(
            "header-shell relative flex h-[72px] items-center justify-between gap-4 overflow-hidden rounded-[22px] border border-white/12 bg-[#020b16]/95 px-4 shadow-[0_18px_55px_rgba(0,0,0,.24)] backdrop-blur-xl sm:px-5 lg:px-6",
            isScrolled && "border-white/16 shadow-[0_22px_70px_rgba(0,0,0,.34)]"
          )}
        >
          <div aria-hidden className="header-spectrum absolute inset-x-8 top-0 h-px" />
          <div aria-hidden className="absolute -right-12 -top-16 h-32 w-32 rounded-full bg-solar-gold/10 blur-3xl" />
          <a
            href={isHomePage ? "#inicio" : "/"}
            onClick={(event) => {
              if (isHomePage) {
                event.preventDefault();
                navigate("#inicio");
              }
            }}
            className="relative z-50 shrink-0 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-solar-green"
          >
            <BrandLogo priority />
          </a>

          <nav aria-label="Navegação principal" className="top-nav relative z-10 hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.045] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,.04)] lg:flex">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={isHomePage ? item.href : `/${item.href}`}
                onClick={(event) => {
                  if (isHomePage) {
                    event.preventDefault();
                    navigate(item.href);
                  }
                }}
                className={cn(
                  "top-nav-link group relative isolate flex items-center gap-2 overflow-hidden rounded-full px-3 py-2.5 text-[0.78rem] font-bold text-white/70 transition-[background-color,color,box-shadow] duration-200 hover:text-white xl:px-4",
                  activeHref === item.href && "top-nav-link-active bg-white/[0.1] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,.08),0_8px_24px_rgba(0,0,0,.16)]"
                )}
                aria-current={activeHref === item.href ? "location" : undefined}
              >
                <item.icon aria-hidden className="nav-icon relative z-10 h-3.5 w-3.5 text-solar-gold" />
                <span className="relative z-10">{item.label}</span>
                <span aria-hidden className="relative z-10 hidden text-[0.52rem] font-black tracking-wider text-white/30 xl:inline">0{index + 1}</span>
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button
              href={isHomePage ? "#simulador" : "/#simulador"}
              className="min-h-11 px-5 shadow-[0_10px_28px_rgba(230,179,41,.2)]"
              showArrow
            >
              Simular economia
            </Button>
          </div>

          <button
            type="button"
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
            className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/18 bg-white/[0.08] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.08)] transition-[background-color,border-color,transform] hover:border-solar-gold/50 hover:bg-white/[0.12] lg:hidden"
          >
            {isOpen ? (
              <X aria-hidden className="h-5 w-5" />
            ) : (
              <Menu aria-hidden className="h-5 w-5" />
            )}
          </button>
        </Container>
      </header>

      <div
        aria-hidden={!isOpen}
        className={cn(
          "fixed inset-x-3 bottom-3 top-[96px] z-40 h-[calc(100vh-108px)] overflow-y-auto overscroll-contain rounded-[24px] border border-white/12 bg-[#020b16] px-4 pb-6 pt-3 shadow-[0_30px_90px_rgba(0,0,0,.58)] supports-[height:100dvh]:h-[calc(100dvh-108px)] sm:inset-x-4 lg:hidden",
          isOpen ? "block" : "hidden"
        )}
        style={{ backgroundColor: "#020b16", opacity: 1 }}
      >
        <nav aria-label="Menu mobile" className="mx-auto grid max-w-xl">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={isHomePage ? item.href : `/${item.href}`}
              onClick={(event) => {
                if (isHomePage) {
                  event.preventDefault();
                  navigate(item.href);
                } else {
                  setIsOpen(false);
                }
              }}
              className="group mt-2 flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-4 text-xl font-black tracking-[-0.03em] text-white transition-[background-color,border-color] hover:border-solar-gold/35 hover:bg-white/[0.07]"
            >
              <span className="flex items-center gap-3"><item.icon aria-hidden className="h-5 w-5 text-solar-gold" />{item.label}</span>
              <span className="flex items-center gap-3 text-sm font-bold text-solar-green">
                0{index + 1}
                <ArrowUpRight aria-hidden className="h-5 w-5" />
              </span>
            </a>
          ))}
          <Button
            href={isHomePage ? "#simulador" : "/#simulador"}
            onClick={() => setIsOpen(false)}
            className="mt-8 w-full"
          >
            Simular economia
          </Button>
        </nav>
      </div>
    </>
  );
}
