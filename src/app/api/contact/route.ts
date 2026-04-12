import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { sendContactNotification } from "@/lib/email";
import { applyRateLimit } from "@/lib/rate-limit";
import { sanitizeOptionalText, sanitizeText } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email().optional().or(z.literal("")),
  service_type: z.string().optional(),
  message: z.string().optional(),
  source_page: z.string().optional(),
  locale: z.enum(["fr", "ar", "en"]).optional(),
});

export async function POST(request: NextRequest) {
  const limit = applyRateLimit(`contact:${request.headers.get("x-forwarded-for") || "local"}`, 10, 60_000);

  const headers = {
    "X-RateLimit-Limit": String(limit.limit),
    "X-RateLimit-Remaining": String(limit.remaining),
    "X-RateLimit-Reset": String(Math.floor(limit.resetAt / 1000)),
  };

  if (!limit.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429, headers });
  }

  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400, headers });
  }

  const payload = {
    name: sanitizeText(parsed.data.name),
    phone: sanitizeText(parsed.data.phone),
    email: sanitizeOptionalText(parsed.data.email),
    service_type: sanitizeOptionalText(parsed.data.service_type),
    message: sanitizeOptionalText(parsed.data.message),
    source_page: sanitizeOptionalText(parsed.data.source_page),
    locale: parsed.data.locale || "fr",
  };

  const supabase = await createClient();
  const { error } = await supabase.from("contact_leads").insert(payload);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500, headers });
  }

  await sendContactNotification({
    ...payload,
    email: payload.email || undefined,
    service_type: (payload.service_type as string | undefined) || undefined,
    message: payload.message || undefined,
  });

  return NextResponse.json({ ok: true }, { headers });
}
