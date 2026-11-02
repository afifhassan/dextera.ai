import { z } from "zod";

export const interestOptions = [
  "Real-world data",
  "Simulator",
  "Testing",
  "Not sure yet",
] as const;

export type Interest = (typeof interestOptions)[number];

/** Shared client/server contact validation. Honeypot fields never render visibly. */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Please keep your name under 80 characters."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid work email.")
    .max(160, "Please keep your email under 160 characters."),
  company: z
    .string()
    .trim()
    .max(120, "Please keep your company under 120 characters.")
    .optional()
    .default(""),
  role: z
    .string()
    .trim()
    .max(120, "Please keep your role under 120 characters.")
    .optional()
    .default(""),
  interest: z.enum(interestOptions, {
    error: "Please choose an interest.",
  }),
  message: z
    .string()
    .trim()
    .min(12, "Please tell us a little more (at least 12 characters).")
    .max(4000, "Please keep your message under 4,000 characters."),
  website: z.string().max(200).optional().default(""),
  startedAt: z.number().int().positive(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const careersSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Please keep your name under 80 characters."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email.")
    .max(160, "Please keep your email under 160 characters."),
  role: z
    .string()
    .trim()
    .min(1, "Please choose the role you are applying for.")
    .max(120),
  link: z
    .string()
    .trim()
    .max(300, "Please keep the link under 300 characters.")
    .optional()
    .default(""),
  message: z
    .string()
    .trim()
    .min(20, "Please tell us a little more (at least 20 characters).")
    .max(4000, "Please keep your note under 4,000 characters."),
  consent: z.literal(true, {
    error:
      "Please confirm that we may use your details to review your application.",
  }),
  website: z.string().max(200).optional().default(""),
  startedAt: z.number().int().positive(),
});

export type CareersInput = z.infer<typeof careersSchema>;
