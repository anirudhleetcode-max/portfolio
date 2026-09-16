import { z } from "zod";

/**
 * Zod is the single source of validation truth. The same schema powers the
 * React Hook Form resolver in the browser and the re-parse inside the route
 * handler, so a request that skips the form is held to identical rules.
 */

export const PROJECT_TYPES = [
  "Business website",
  "Web application",
  "E-commerce",
  "Interface & motion",
  "AI/ML feature",
  "Something else",
] as const;

export const BUDGETS = [
  "Under ₹50,000",
  "₹50,000 – ₹1,50,000",
  "₹1,50,000 – ₹4,00,000",
  "Over ₹4,00,000",
  "Not decided yet",
] as const;

export const TIMELINES = [
  "As soon as possible",
  "Within a month",
  "One to three months",
  "Still planning",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please tell me your name.").max(80),
  email: z.string().trim().toLowerCase().email("That email address does not look right."),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  projectType: z.enum(PROJECT_TYPES, { required_error: "Pick the closest match." }),
  budget: z.enum(BUDGETS, { required_error: "Pick a range — it only sets expectations." }),
  timeline: z.enum(TIMELINES, { required_error: "Pick a rough timeline." }),
  message: z
    .string()
    .trim()
    .min(20, "A couple of sentences about the project, please — at least 20 characters.")
    .max(4000, "That is longer than this form accepts. Email me instead."),
});

export type ContactInput = z.infer<typeof contactSchema>;
