import type { IncomingMessage } from "http";

type ReqWithSocket = IncomingMessage & { socket?: { remoteAddress?: string } };

/**
 * Best-effort client IP for rate limiting / upvote idempotency (behind proxies, use forwarded headers first).
 */
export function getClientIpFromRequest(req: ReqWithSocket): string {
  const xff = req.headers["x-forwarded-for"];
  if (typeof xff === "string" && xff.length > 0) {
    return xff.split(",")[0].trim();
  }
  if (Array.isArray(xff) && xff[0]) {
    return String(xff[0]).split(",")[0].trim();
  }
  const real = req.headers["x-real-ip"];
  if (typeof real === "string" && real.length > 0) {
    return real.trim();
  }
  if (Array.isArray(real) && real[0]) {
    return String(real[0]).trim();
  }
  const remote = req.socket?.remoteAddress;
  if (remote && remote.length > 0) {
    return remote.replace(/^::ffff:/, "");
  }
  return "0.0.0.0";
}
