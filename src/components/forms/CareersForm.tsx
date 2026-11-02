"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { careersSchema, type CareersInput } from "@/lib/validation";
import { Button } from "@/components/ui/Button";
import { Field, inputClass, textareaClass } from "@/components/forms/Field";
import { roles } from "@/lib/data/careers";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Values = {
  name: string;
  email: string;
  role: string;
  link: string;
  message: string;
  consent: boolean;
  website: string;
};

type Errors = Partial<Record<keyof CareersInput, string>>;

const initialValues: Values = {
  name: "",
  email: "",
  role: "",
  link: "",
  message: "",
  consent: false,
  website: "",
};

export function CareersForm() {
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

    const parsed = careersSchema.safeParse({
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
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/careers", {
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

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          role="status"
          aria-live="polite"
          className="rounded-[12px] border border-deep/25 bg-deep/[0.04] p-7"
        >
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-deep">
            Application received
          </p>
          <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-ink">
            Thank you for writing.
          </h3>
          <p className="mt-3 max-w-md text-sm leading-[1.7] text-steel">
            A person will read your application. If there is a fit, we will
            reply using the email you provided.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={onSubmit}
          noValidate
          className="rounded-[12px] border border-steel/18 bg-ink/[0.018] p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field id="career-name" label="Name" error={errors.name}>
              <input
                id="career-name"
                name="name"
                autoComplete="name"
                required
                value={values.name}
                onChange={(event) => set("name", event.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "career-name-error" : undefined}
                className={cn(inputClass, errors.name && "border-coral")}
                placeholder="Your name"
              />
            </Field>

            <Field id="career-email" label="Email" error={errors.email}>
              <input
                id="career-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={values.email}
                onChange={(event) => set("email", event.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? "career-email-error" : undefined
                }
                className={cn(inputClass, errors.email && "border-coral")}
                placeholder="you@example.com"
              />
            </Field>

            <Field id="career-role" label="Role" error={errors.role}>
              <select
                id="career-role"
                name="role"
                required
                value={values.role}
                onChange={(event) => set("role", event.target.value)}
                aria-invalid={Boolean(errors.role)}
                aria-describedby={errors.role ? "career-role-error" : undefined}
                className={cn(inputClass, errors.role && "border-coral")}
              >
                <option value="">Choose a role</option>
                {roles.map((role) => (
                  <option key={role.slug} value={role.title}>
                    {role.title}
                  </option>
                ))}
                <option value="General application">General application</option>
              </select>
            </Field>

            <Field id="career-link" label="Portfolio or profile" optional>
              <input
                id="career-link"
                name="link"
                type="url"
                value={values.link}
                onChange={(event) => set("link", event.target.value)}
                className={inputClass}
                placeholder="https://"
              />
            </Field>

            <Field
              id="career-message"
              label="What do you do?"
              error={errors.message}
              className="sm:col-span-2"
            >
              <textarea
                id="career-message"
                name="message"
                required
                rows={5}
                value={values.message}
                onChange={(event) => set("message", event.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message ? "career-message-error" : undefined
                }
                className={cn(textareaClass, errors.message && "border-coral")}
                placeholder="Your trade, your experience and the work you are proud of."
              />
            </Field>
          </div>

          <div className="mt-5">
            <label className="flex cursor-pointer items-start gap-3 text-[12px] leading-[1.6] text-steel">
              <input
                type="checkbox"
                name="consent"
                checked={values.consent}
                onChange={(event) => set("consent", event.target.checked)}
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={
                  errors.consent ? "career-consent-error" : undefined
                }
                className="mt-0.5 h-4 w-4 rounded border-steel/40 accent-deep"
              />
              <span>
                I agree that Daxtera may use these details to review this
                application.
              </span>
            </label>
            {errors.consent ? (
              <p
                id="career-consent-error"
                role="alert"
                className="mt-2 text-[11px] text-coral"
              >
                {errors.consent}
              </p>
            ) : null}
          </div>

          <div
            className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden"
            aria-hidden="true"
          >
            <label htmlFor="career-website">Leave this empty</label>
            <input
              id="career-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={values.website}
              onChange={(event) => set("website", event.target.value)}
            />
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button type="submit" size="lg" disabled={status === "submitting"}>
              {status === "submitting" ? "Sending…" : "Send application"}
            </Button>
            {status === "error" ? (
              <p role="alert" className="text-sm text-coral">
                Something went wrong. Please try again.
              </p>
            ) : null}
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
