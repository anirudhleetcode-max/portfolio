import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Featured } from "@/components/sections/featured";
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";

/**
 * Four sections and nothing else. The freelance "Services" and "Process"
 * sections were removed: they advertised business websites and quoting, which
 * no work on this page supports, and they sat between the projects and the
 * contact details an interviewer is actually looking for.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Featured />
      <Skills />
      <Contact />
    </>
  );
}
