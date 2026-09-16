import { Check } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Section } from "@/components/ui/primitives";
import { SERVICES } from "@/lib/projects";

export function Services() {
  return (
    <Section id="services" eyebrow="What I can build for you">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="display-xl max-w-[16ch] text-balance">Four kinds of work</h2>
        <p className="max-w-sm text-sm leading-relaxed text-fog">
          Scoped and quoted before anything is designed. If a request will not pay for itself, I say
          so at that stage rather than after the invoice.
        </p>
      </div>

      <Stagger className="mt-14 grid gap-6 md:grid-cols-2">
        {SERVICES.map((service, index) => (
          <StaggerItem key={service.title}>
            <div className="panel group h-full rounded-xl p-7 transition-colors duration-300 hover:border-white-warm/20 sm:p-9">
              <span className="mono text-xs text-fog">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="display-md mt-4">{service.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-fog">{service.body}</p>
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {service.points.map((point) => (
                  <li key={point} className="flex items-center gap-2 text-sm text-white-warm/85">
                    <Check size={14} className="shrink-0 text-cyan" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
