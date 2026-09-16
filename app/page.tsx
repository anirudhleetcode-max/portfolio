import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Featured } from "@/components/sections/featured";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { Showcase } from "@/components/sections/showcase";
import { Skills } from "@/components/sections/skills";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Featured />
      <Showcase />
      <Services />
      <Process />
      <Contact />
    </>
  );
}
