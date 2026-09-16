"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowUpRight, Check, Loader2, Mail } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Magnetic } from "@/components/motion/reveal";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { Section } from "@/components/ui/primitives";
import { BUDGETS, PROJECT_TYPES, TIMELINES, contactSchema, type ContactInput } from "@/lib/schemas";

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
    defaultValues: {
      projectType: "Business website",
      budget: "Not decided yet",
      timeline: "Still planning",
    },
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
    <Section id="contact" eyebrow="Contact">
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div>
          <h2 className="display-xl max-w-[14ch] text-balance">
            Tell me what you are trying to build
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-fog">
            A few sentences is plenty to start. I will reply with what I think it needs, a rough
            shape and a flat quote — or an honest note that it is not a good fit for me.
          </p>

          <a
            href="mailto:anirudhleetcode@gmail.com"
            className="mt-8 inline-flex items-center gap-2 text-sm text-white-warm underline decoration-white-warm/30 underline-offset-4 transition-colors hover:decoration-white-warm"
          >
            <Mail size={15} />
            anirudhleetcode@gmail.com
            <ArrowUpRight size={14} />
          </a>

          <div className="panel mt-10 rounded-xl p-6">
            <p className="eyebrow text-fog">About this form</p>
            <p className="mt-3 text-sm leading-relaxed text-fog">
              It is a working form, not a decoration: submissions are validated with the same Zod
              schema on both sides of the request and stored in this site&rsquo;s own database. No
              email service is connected yet, so a message is recorded rather than delivered to an
              inbox.
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {reference ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="panel rounded-xl p-8 sm:p-10"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full border border-cyan/60 text-cyan">
                <Check size={20} aria-hidden="true" />
              </span>
              <h3 className="display-md mt-6">Message recorded</h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-fog">
                Your message was validated and saved with the reference below. Keep it if you want to
                refer back to this submission.
              </p>
              <p className="mono mt-6 inline-block rounded-md border border-white-warm/15 px-4 py-2 text-sm">
                {reference}
              </p>
              <button
                type="button"
                onClick={() => setReference(null)}
                className="mt-8 block text-sm text-fog underline decoration-white-warm/25 underline-offset-4 transition-colors hover:text-white-warm"
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
              className="panel rounded-xl p-6 sm:p-8"
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
                  label="Company"
                  htmlFor="company"
                  hint="Optional"
                  error={errors.company?.message}
                  className="sm:col-span-2"
                >
                  <Input id="company" autoComplete="organization" placeholder="Company or organisation" {...register("company")} />
                </Field>
                <Field label="Project type" htmlFor="projectType" error={errors.projectType?.message}>
                  <Select id="projectType" {...register("projectType")}>
                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Budget" htmlFor="budget" error={errors.budget?.message}>
                  <Select id="budget" {...register("budget")}>
                    {BUDGETS.map((budget) => (
                      <option key={budget} value={budget}>
                        {budget}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field
                  label="Timeline"
                  htmlFor="timeline"
                  error={errors.timeline?.message}
                  className="sm:col-span-2"
                >
                  <Select id="timeline" {...register("timeline")}>
                    {TIMELINES.map((timeline) => (
                      <option key={timeline} value={timeline}>
                        {timeline}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field
                  label="Project"
                  htmlFor="message"
                  error={errors.message?.message}
                  className="sm:col-span-2"
                >
                  <Textarea
                    id="message"
                    placeholder="What are you building, who is it for, and what is currently in the way?"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    {...register("message")}
                  />
                </Field>
              </div>

              {serverError && (
                <p role="alert" className="mt-5 flex items-center gap-2 text-sm text-amber">
                  <AlertCircle size={15} />
                  {serverError}
                </p>
              )}

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Magnetic strength={0.2}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 rounded-full bg-white-warm px-6 py-3.5 text-sm font-medium text-void transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting && <Loader2 size={15} className="animate-spin" />}
                    {isSubmitting ? "Sending" : "Send message"}
                  </button>
                </Magnetic>
                <p className="text-xs text-fog">Validated in the browser and again on the server.</p>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}
