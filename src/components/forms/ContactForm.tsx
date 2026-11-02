"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  contactSchema,
  interestOptions,
  type ContactInput,
  type Interest,
} from "@/lib/validation";
import { Button } from "@/components/ui/Button";
import { Field, inputClass, textareaClass } from "@/components/forms/Field";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { site } from "@/lib/data/site";

type Values = {
  name: string;
  email: string;
  company: string;
  role: string;
  interest: Interest;
  message: string;
  website: string;
};

type Errors = Partial<Record<keyof ContactInput, string>>;

const initialValues: Values = {
  name: "",
  email: "",
  company: "",
  role: "",
  interest: "Not sure yet",
  message: "",
  website: "",
};

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});

    const parsed = contactSchema.safeParse({
      ...values,
      startedAt: startedAt.current,
    });

    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      const first = Object.keys(next)[0];
      if (first) {
        requestAnimationFrame(() => {
          document.getElementById(`contact-${first}`)?.focus();
        });
      }
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setValues(initialValues);
    setErrors({});
    setStatus("idle");
    startedAt.current = Date.now();
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: EASE }}
            role="status"
            aria-live="polite"
            className="flex min-h-[420px] flex-col justify-between rounded-[12px] border border-deep/25 bg-deep/[0.04] p-7 sm:p-9"
          >
            <div>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-deep/35">
                <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                  <path
                    d="M4 10.5 8 14.5 16 5.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-deep"
                  />
                </svg>
              </span>
              <h3 className="mt-7 text-2xl font-semibold tracking-[-0.03em] text-ink">
                Thank you. We have your message.
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-[1.7] text-steel">
                We will read it and reply with the best place to start. If you
                would rather write directly, use the contact email in the
                footer.
              </p>
            </div>
            <button
              type="button"
              onClick={reset}
              className="mt-10 self-start text-sm font-medium text-deep underline decoration-deep/35 underline-offset-4 transition-colors hover:text-ink"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onSubmit={onSubmit}
            noValidate
            className={cn(
              "rounded-[12px] border border-steel/18 bg-ink/[0.018]",
              compact ? "p-6 sm:p-7" : "p-6 sm:p-9",
            )}
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field id="contact-name" label="Name" error={errors.name}>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  required
                  value={values.name}
                  onChange={(event) => set("name", event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={
                    errors.name ? "contact-name-error" : undefined
                  }
                  className={cn(inputClass, errors.name && "border-coral")}
                  placeholder="Your name"
                />
              </Field>

              <Field id="contact-email" label="Work email" error={errors.email}>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={values.email}
                  onChange={(event) => set("email", event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email ? "contact-email-error" : undefined
                  }
                  className={cn(inputClass, errors.email && "border-coral")}
                  placeholder="you@company.com"
                />
              </Field>

              <Field id="contact-company" label="Company" optional>
                <input
                  id="contact-company"
                  name="company"
                  autoComplete="organization"
                  value={values.company}
                  onChange={(event) => set("company", event.target.value)}
                  className={inputClass}
                  placeholder="Company"
                />
              </Field>

              <Field id="contact-role" label="Role" optional>
                <input
                  id="contact-role"
                  name="role"
                  autoComplete="organization-title"
                  value={values.role}
                  onChange={(event) => set("role", event.target.value)}
                  className={inputClass}
                  placeholder="e.g. Head of data"
                />
              </Field>

              <fieldset className="sm:col-span-2">
                <legend className="font-mono text-[9px] uppercase tracking-[0.16em] text-steel">
                  Interest
                </legend>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {interestOptions.map((option) => (
                    <label key={option} className="relative cursor-pointer">
                      <input
                        type="radio"
                        name="interest"
                        value={option}
                        checked={values.interest === option}
                        onChange={() => set("interest", option)}
                        className="peer sr-only"
                      />
                      <span className="inline-flex rounded-full border border-steel/20 px-3.5 py-2 text-[12px] text-steel transition-colors duration-300 peer-checked:border-ink peer-checked:bg-ink peer-checked:text-bench peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-deep">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.interest ? (
                  <p role="alert" className="mt-2 text-[11px] text-coral">
                    {errors.interest}
                  </p>
                ) : null}
              </fieldset>

              <Field
                id="contact-message"
                label="What are you building?"
                error={errors.message}
                className="sm:col-span-2"
              >
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  value={values.message}
                  onChange={(event) => set("message", event.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? "contact-message-error" : undefined
                  }
                  className={cn(
                    textareaClass,
                    errors.message && "border-coral",
                  )}
                  placeholder="The robot, the task and what you need to learn."
                />
              </Field>
            </div>

            <div
              className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden"
              aria-hidden="true"
            >
              <label htmlFor="contact-website">Leave this empty</label>
              <input
                id="contact-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={values.website}
                onChange={(event) => set("website", event.target.value)}
              />
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Button
                type="submit"
                size="lg"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Sending…" : "Send message"}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 14 14"
                  className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5"
                >
                  <path
                    d="M2 7h9M7.5 3.5 11 7l-3.5 3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
              <p className="max-w-[18rem] text-[11px] leading-[1.6] text-steel">
                We use your details only to reply.{" "}
                <a
                  href={site.legal.privacy}
                  className="text-deep underline decoration-deep/30 underline-offset-2"
                >
                  Privacy policy
                </a>
                .
              </p>
            </div>

            {status === "error" ? (
              <p role="alert" className="mt-4 text-sm text-coral">
                Something went wrong. Please try again, or use the contact email
                in the footer.
              </p>
            ) : null}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
