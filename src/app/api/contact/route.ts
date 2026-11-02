import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { deliverEmail } from "@/lib/email";

const attempts = new Map<string, { count: number; resetAt: number }>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const record = attempts.get(key);
  if (!record || now > record.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return false;
  }
  record.count += 1;
  return record.count > 6;
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for") ?? "unknown";
  return createHash("sha256")
    .update(forwarded.split(",")[0].trim())
    .digest("hex");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const data = parsed.data;

  // Honeypot and minimum time on page.
  if (data.website) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (Date.now() - data.startedAt < 1800) {
    return NextResponse.json(
      { error: "Please take a moment and try again." },
      { status: 400 },
    );
  }

  if (rateLimited(clientKey(request))) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  try {
    await deliverEmail({
      replyTo: data.email,
      subject: `Daxtera contact — ${data.name}`,
      text: [
        `Name: ${data.name}`,
        `Work email: ${data.email}`,
        `Company: ${data.company || "—"}`,
        `Role: ${data.role || "—"}`,
        `Interest: ${data.interest}`,
        "",
        "Message:",
        data.message,
      ].join("\n"),
    });
  } catch (error) {
    console.error("[contact] delivery failed", error);
    return NextResponse.json(
      { error: "We could not deliver your message. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
