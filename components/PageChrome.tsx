import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Footer } from "@/sections/Footer";

export function PageChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="conteudo-principal">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
