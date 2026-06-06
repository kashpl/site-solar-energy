"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { company } from "@/data/company";
import {
  buildGeneralWhatsAppMessage,
  createWhatsAppUrl
} from "@/lib/whatsappFormatter";
import { cn, scrollToSection } from "@/lib/utils";

const navItems = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre" },
  { href: "#solucoes", label: "Soluções" },
  { href: "#beneficios", label: "Benefícios" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#projetos", label: "Projetos" },
  { href: "#simulador", label: "Simulador" },
  { href: "#contato", label: "Contato" }
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#inicio");

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveHref(`#${visible.target.id}`);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.12, 0.28, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    setActiveHref(href);
    scrollToSection(href);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "border-b border-white/[0.12] bg-[#001236]/[0.92] shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-2xl"
          : "bg-gradient-to-b from-navy/[0.5] via-navy/[0.22] to-transparent"
      )}
    >
      <Container className="flex h-[78px] items-center justify-between gap-4 py-3 sm:h-[86px] xl:gap-6">
        <a
          href="#inicio"
          aria-label={`${company.name} - voltar ao início`}
          onClick={(event) => {
            event.preventDefault();
            handleNavClick("#inicio");
          }}
          className="relative z-50 flex min-w-0 items-center"
        >
          <BrandLogo priority />
        </a>

        <nav
          aria-label="Navegação principal"
          className="hidden min-w-0 items-center gap-0.5 rounded-md border border-white/[0.08] bg-white/[0.05] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl xl:flex"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => {
                event.preventDefault();
                handleNavClick(item.href);
              }}
              className={cn(
                "whitespace-nowrap rounded-md px-2.5 py-2 text-[0.82rem] font-semibold text-white/[0.78] transition duration-300 hover:bg-white/[0.08] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-solar-gold 2xl:px-3 2xl:text-sm",
                activeHref === item.href && "bg-solar-green/[0.12] text-solar-green"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <Button
            href={createWhatsAppUrl(buildGeneralWhatsAppMessage())}
            target="_blank"
            rel="noreferrer"
            icon={<Phone aria-hidden className="h-4 w-4" />}
            className="min-w-[126px] whitespace-nowrap px-4 text-[0.82rem] shadow-[0_14px_44px_rgba(0,208,132,0.25)] hover:shadow-[0_18px_54px_rgba(0,208,132,0.4)] xl:min-w-[178px] xl:px-5 xl:text-sm"
          >
            <span className="hidden whitespace-nowrap xl:inline">Solicitar orçamento</span>
            <span className="whitespace-nowrap xl:hidden">Orçamento</span>
          </Button>
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
          className="relative z-50 inline-flex h-12 w-12 items-center justify-center rounded-md border border-white/[0.16] bg-white/[0.09] text-white shadow-[0_12px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl transition hover:border-solar-green lg:hidden"
        >
          {isOpen ? <X aria-hidden className="h-6 w-6" /> : <Menu aria-hidden className="h-6 w-6" />}
        </button>
      </Container>

      <div
        className={cn(
          "fixed inset-y-0 right-0 z-40 w-full max-w-[440px] bg-navy/[0.96] backdrop-blur-2xl transition duration-300 lg:hidden",
          isOpen
            ? "visible translate-x-0 opacity-100"
            : "invisible translate-x-[110%] opacity-0 pointer-events-none"
        )}
      >
        <div className="flex min-h-svh flex-col justify-center px-6 pt-28">
          <nav aria-label="Menu mobile" className="grid gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => {
                  event.preventDefault();
                  handleNavClick(item.href);
                }}
                className={cn(
                  "rounded-md border border-white/[0.12] bg-white/[0.055] px-5 py-4 text-lg font-semibold text-white transition hover:border-solar-green hover:text-solar-green",
                  activeHref === item.href && "border-solar-green/50 bg-solar-green/10 text-solar-green"
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <Button
            href={createWhatsAppUrl(buildGeneralWhatsAppMessage())}
            target="_blank"
            rel="noreferrer"
            className="mt-6 w-full whitespace-nowrap"
            icon={<Phone aria-hidden className="h-4 w-4" />}
          >
            Solicitar orçamento
          </Button>
        </div>
      </div>
    </header>
  );
}
