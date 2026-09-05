"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { company } from "@/data/company";
import { cn, scrollToSection } from "@/lib/utils";

const navItems = [
  { href: "#solucoes", label: "Soluções" },
  { href: "#projetos", label: "Projetos" },
  { href: "#simulador", label: "Simulador" },
  { href: "#como-funciona", label: "Processo" },
  { href: "#sobre", label: "Empresa" }
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
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b bg-navy transition-shadow duration-300",
          isScrolled
            ? "border-white/10 shadow-[0_18px_55px_rgba(0,0,0,0.22)]"
            : "border-transparent"
        )}
      >
        <Container className="flex h-[76px] items-center justify-between gap-5">
          <a
            href={isHomePage ? "#inicio" : "/"}
            aria-label={`${company.name} — início`}
            onClick={(event) => {
              if (isHomePage) {
                event.preventDefault();
                navigate("#inicio");
              }
            }}
            className="relative z-50"
          >
            <BrandLogo priority />
          </a>

          <nav aria-label="Navegação principal" className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
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
                  "relative py-3 text-sm font-semibold text-white/65 transition hover:text-white",
                  activeHref === item.href &&
                    "text-white after:absolute after:inset-x-0 after:bottom-1 after:h-0.5 after:rounded-full after:bg-solar-green"
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button
              href={isHomePage ? "#simulador" : "/#simulador"}
              className="min-h-11 px-5"
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
            className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#06356f] text-white lg:hidden"
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
          "fixed inset-x-0 bottom-0 top-[76px] z-40 h-[calc(100vh-76px)] overflow-y-auto overscroll-contain border-t border-white/10 bg-[#001a4d] px-5 pb-8 pt-3 supports-[height:100dvh]:h-[calc(100dvh-76px)] lg:hidden",
          isOpen ? "block" : "hidden"
        )}
        style={{ backgroundColor: "#001a4d", opacity: 1 }}
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
              className="flex items-center justify-between border-b border-white/10 py-5 text-2xl font-black tracking-[-0.03em] text-white"
            >
              <span>{item.label}</span>
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
