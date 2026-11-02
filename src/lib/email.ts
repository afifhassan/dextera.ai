/**
 * Email delivery for the contact and careers forms.
 *
 * RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL are [PLACEHOLDER]
 * deployment values. Until all three exist, submissions are logged server-side
 * and the visitor still sees a successful submission.
 */
export async function deliverEmail({
  subject,
  text,
  replyTo,
}: {
  subject: string;
  text: string;
  replyTo: string;
}): Promise<{ delivered: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.info(`[forms] ${subject} received; email provider not configured.`);
    return { delivered: false };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: replyTo,
      subject,
      text,
    }),
  });

  if (!response.ok) {
    throw new Error(`Email provider responded ${response.status}`);
  }

  return { delivered: true };
}
