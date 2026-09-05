import { Header } from "@/components/Header";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SiteMotion } from "@/components/SiteMotion";
import { About } from "@/sections/About";
import { AuthorityNumbers } from "@/sections/AuthorityNumbers";
import { Contact } from "@/sections/Contact";
import { CTAFinal } from "@/sections/CTAFinal";
import { Footer } from "@/sections/Footer";
import { FAQ } from "@/sections/FAQ";
import { Hero } from "@/sections/Hero";
import { HowItWorks } from "@/sections/HowItWorks";
import { Projects } from "@/sections/Projects";
import { Simulator } from "@/sections/Simulator";
import { Solutions } from "@/sections/Solutions";
import { Testimonials } from "@/sections/Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <SiteMotion />
      <main id="conteudo-principal">
        <Hero />
        <AuthorityNumbers />
        <Solutions />
        <Projects />
        <Simulator />
        <HowItWorks />
        <About />
        <Testimonials />
        <FAQ />
        <Contact />
        <CTAFinal />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
