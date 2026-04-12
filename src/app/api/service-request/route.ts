import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { sendServiceRequestNotification } from "@/lib/email";
import { applyRateLimit } from "@/lib/rate-limit";
import { sanitizeOptionalText, sanitizeText } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email().optional().or(z.literal("")),
  address: z.string().optional(),
  city: z.string().optional(),
  service_type: z.string().min(2),
  appliance_brand: z.string().optional(),
  appliance_model: z.string().optional(),
  problem_description: z.string().optional(),
  preferred_date: z.string().optional(),
  preferred_time: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const limit = applyRateLimit(`service:${request.headers.get("x-forwarded-for") || "local"}`, 10, 60_000);

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
    address: sanitizeOptionalText(parsed.data.address),
    city: sanitizeOptionalText(parsed.data.city),
    service_type: sanitizeText(parsed.data.service_type),
    appliance_brand: sanitizeOptionalText(parsed.data.appliance_brand),
    appliance_model: sanitizeOptionalText(parsed.data.appliance_model),
    problem_description: sanitizeOptionalText(parsed.data.problem_description),
    preferred_date: sanitizeOptionalText(parsed.data.preferred_date),
    preferred_time: sanitizeOptionalText(parsed.data.preferred_time),
  };

  const supabase = await createClient();
  const { error } = await supabase.from("service_requests").insert(payload);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500, headers });
  }

  await sendServiceRequestNotification({
    ...payload,
    email: payload.email || undefined,
    address: payload.address || undefined,
    city: payload.city || undefined,
    appliance_brand: payload.appliance_brand || undefined,
    appliance_model: payload.appliance_model || undefined,
    problem_description: payload.problem_description || undefined,
    preferred_date: payload.preferred_date || undefined,
    preferred_time: payload.preferred_time || undefined,
  });
  return NextResponse.json({ ok: true }, { headers });
}
