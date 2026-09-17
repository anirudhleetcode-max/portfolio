"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Field, Input, Textarea } from "@/components/ui/field";
import { Section } from "@/components/ui/primitives";
import { contactSchema, type ContactInput } from "@/lib/schemas";

/**
 * Three fields. The project-type, budget and timeline selects were removed from
 * the form: this portfolio is aimed at internships, and asking someone to pick a
 * budget range before they can say hello is a barrier on the one control that
 * matters. The schema still accepts those fields, so older submissions and any
 * future enquiry form keep working.
 */
export function Contact() {
  const [reference, setReference] = React.useState<string | null>(null);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data: { reference?: string; error?: string } = await response.json().catch(() => ({}));
      if (!response.ok) {
        setServerError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      reset();
      setReference(data.reference ?? null);
    } catch {
      setServerError("Could not reach the server. Check your connection and try again.");
    }
  });

  return (
    <Section id="contact" eyebrow="Contact" index="04">
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div>
          <h2 className="display-xl max-w-[16ch] text-balance text-ink">
            Open to AI/ML internships.
          </h2>
          <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-muted">
            Happy to walk through any of the four systems &mdash; the architecture, the evaluation,
            or the production bugs and how I found them.
          </p>

          <dl className="mt-10 border-t border-rule">
            <div className="flex flex-col gap-1 border-b border-rule py-4 sm:flex-row sm:items-baseline sm:gap-6">
              <dt className="mono w-20 shrink-0 text-[0.75rem] text-muted">Email</dt>
              <dd>
                <a className="prose-link text-[0.9375rem]" href="mailto:anirudhmalladi2007@gmail.com">
                  anirudhmalladi2007@gmail.com
                </a>
              </dd>
            </div>
            <div className="flex flex-col gap-1 border-b border-rule py-4 sm:flex-row sm:items-baseline sm:gap-6">
              <dt className="mono w-20 shrink-0 text-[0.75rem] text-muted">Phone</dt>
              <dd>
                <a className="prose-link text-[0.9375rem]" href="tel:+919963511576">
                  +91 99635 11576
                </a>
              </dd>
            </div>
            <div className="flex flex-col gap-1 border-b border-rule py-4 sm:flex-row sm:items-baseline sm:gap-6">
              <dt className="mono w-20 shrink-0 text-[0.75rem] text-muted">Elsewhere</dt>
              <dd className="flex flex-wrap gap-x-5 gap-y-1">
                <a
                  className="prose-link text-[0.9375rem]"
                  href="https://github.com/anirudhleetcode-max"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
                <a
                  className="prose-link text-[0.9375rem]"
                  href="https://www.linkedin.com/in/anirudh-malladi-928651319"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {reference ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="border border-rule bg-surface p-8 sm:p-10"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full border border-rule text-accent">
                <Check size={20} aria-hidden="true" />
              </span>
              <h3 className="display-md mt-6 text-ink">Message recorded</h3>
              <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-muted">
                Your message was validated and saved with the reference below.
              </p>
              <p className="mono mt-6 inline-block border border-rule px-4 py-2 text-sm">
                {reference}
              </p>
              <button
                type="button"
                onClick={() => setReference(null)}
                className="link-underline mt-8 block text-[0.9375rem] text-muted transition-colors hover:text-ink"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              onSubmit={onSubmit}
              noValidate
              className="border border-rule bg-surface p-6 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" htmlFor="name" error={errors.name?.message}>
                  <Input
                    id="name"
                    autoComplete="name"
                    placeholder="Your name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    {...register("name")}
                  />
                </Field>
                <Field label="Email" htmlFor="email" error={errors.email?.message}>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    {...register("email")}
                  />
                </Field>
                <Field
                  label="Message"
                  htmlFor="message"
                  error={errors.message?.message}
                  className="sm:col-span-2"
                >
                  <Textarea
                    id="message"
                    placeholder="A few sentences about the role or what you would like to talk through."
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    {...register("message")}
                  />
                </Field>
              </div>

              {serverError && (
                <p role="alert" className="mt-5 flex items-center gap-2 text-sm text-accent">
                  <AlertCircle size={15} />
                  {serverError}
                </p>
              )}

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 bg-ink px-6 py-3 text-[0.9375rem] font-medium text-paper transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting && <Loader2 size={15} className="animate-spin" />}
                  {isSubmitting ? "Sending" : "Send message"}
                </button>
                <p className="text-[0.8125rem] text-muted">
                  Validated in the browser and again on the server.
                </p>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}
