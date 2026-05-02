import type { NextApiRequest, NextApiResponse } from "next";
import { getAutomationApiBaseUrl } from "@/lib/automationFeatureRequests";

type OkBody = {
  ok: true;
  upvotes: number;
  pageId: string;
};

type ErrBody = { ok: false; error: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<OkBody | ErrBody>) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const rawId = req.query.id;
  const itemId = Array.isArray(rawId) ? rawId[0] : rawId;
  if (!itemId || typeof itemId !== "string" || !itemId.trim()) {
    return res.status(400).json({ ok: false, error: "Missing id" });
  }

  const body = req.body as { priority?: unknown } | undefined;
  let priority: number | undefined;
  if (body && typeof body.priority === "number" && Number.isFinite(body.priority)) {
    priority = Math.floor(body.priority);
  }

  const base = getAutomationApiBaseUrl();

  try {
    const payload: { itemId: string; priority?: number } = { itemId: itemId.trim() };
    if (priority !== undefined) {
      payload.priority = priority;
    }

    const r = await fetch(`${base}/api/requests/upvote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = (await r.json()) as {
      success?: boolean;
      error?: string;
      data?: { pageId?: string; priority?: number };
    };

    if (!r.ok || json.success === false) {
      const errMsg =
        typeof json.error === "string" && json.error.trim() ? json.error.trim() : `Upvote failed (${r.status})`;
      return res.status(r.status >= 400 && r.status < 600 ? r.status : 502).json({ ok: false, error: errMsg });
    }

    const pageId = json.data?.pageId?.trim() ?? itemId.trim();
    const nextPriority = json.data?.priority;
    if (typeof nextPriority !== "number" || !Number.isFinite(nextPriority)) {
      return res.status(502).json({ ok: false, error: "Unexpected response from automation server" });
    }

    return res.status(200).json({
      ok: true,
      upvotes: Math.floor(nextPriority),
      pageId,
    });
  } catch (e) {
    console.error("[feature-requests upvote]", e);
    return res.status(502).json({ ok: false, error: "Could not reach automation server" });
  }
}
