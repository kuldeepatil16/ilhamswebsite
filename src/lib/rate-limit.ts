type Hit = { count: number; resetAt: number };

const store = new Map<string, Hit>();

export function applyRateLimit(key: string, limit = 30, windowMs = 60_000) {
  const now = Date.now();
  const hit = store.get(key);

  if (!hit || hit.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, limit, remaining: limit - 1, resetAt: now + windowMs };
  }

  if (hit.count >= limit) {
    return { allowed: false, limit, remaining: 0, resetAt: hit.resetAt };
  }

  hit.count += 1;
  store.set(key, hit);
  return { allowed: true, limit, remaining: limit - hit.count, resetAt: hit.resetAt };
}
