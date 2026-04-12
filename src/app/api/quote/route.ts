import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { sendQuoteNotification } from "@/lib/email";
import { applyRateLimit } from "@/lib/rate-limit";
import { sanitizeOptionalText, sanitizeText } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email().optional().or(z.literal("")),
  company_name: z.string().optional(),
  message: z.string().optional(),
  items: z.array(
    z.object({
      product_id: z.string().optional(),
      part_id: z.string().optional(),
      name: z.string(),
      quantity: z.number().int().positive(),
      notes: z.string().optional(),
    })
  ).min(1),
});

export async function POST(request: NextRequest) {
  const limit = applyRateLimit(`quote:${request.headers.get("x-forwarded-for") || "local"}`, 10, 60_000);

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
    company_name: sanitizeOptionalText(parsed.data.company_name),
    message: sanitizeOptionalText(parsed.data.message),
    items: parsed.data.items,
  };

  const supabase = await createClient();
  const { error } = await supabase.from("quote_requests").insert(payload);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500, headers });
  }

  await sendQuoteNotification({
    ...payload,
    email: payload.email || undefined,
    company_name: payload.company_name || undefined,
    message: payload.message || undefined,
  });
  return NextResponse.json({ ok: true }, { headers });
}
