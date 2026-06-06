import { Header } from "@/components/Header";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { About } from "@/sections/About";
import { AuthorityNumbers } from "@/sections/AuthorityNumbers";
import { Benefits } from "@/sections/Benefits";
import { Contact } from "@/sections/Contact";
import { CTAFinal } from "@/sections/CTAFinal";
import { Footer } from "@/sections/Footer";
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
      <main>
        <Hero />
        <AuthorityNumbers />
        <About />
        <Solutions />
        <Benefits />
        <HowItWorks />
        <Simulator />
        <Projects />
        <Testimonials />
        <Contact />
        <CTAFinal />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
