import type { NextApiRequest, NextApiResponse } from "next";
import { getAutomationApiBaseUrl } from "@/lib/automationFeatureRequests";

type OkBody = {
  ok: true;
  notionPageId: string;
  notionUrl: string;
  message?: string;
};

type ErrBody = { ok: false; error: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<OkBody | ErrBody>) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const body = req.body as { summary?: unknown; text?: unknown } | undefined;
  let summary = "";
  if (typeof body?.summary === "string") {
    summary = body.summary.trim();
  } else if (typeof body?.text === "string") {
    summary = body.text.trim();
  }

  if (!summary) {
    return res.status(400).json({ ok: false, error: "Please describe your request." });
  }

  const base = getAutomationApiBaseUrl();

  try {
    const r = await fetch(`${base}/api/requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ summary }),
    });

    const json = (await r.json()) as {
      success?: boolean;
      error?: string;
      message?: string;
      data?: { notionPageId?: string; notionUrl?: string };
    };

    if (!r.ok || json.success === false) {
      const errMsg = typeof json.error === "string" && json.error.trim() ? json.error.trim() : `Request failed (${r.status})`;
      return res.status(r.status >= 400 && r.status < 600 ? r.status : 502).json({ ok: false, error: errMsg });
    }

    const notionPageId = json.data?.notionPageId?.trim();
    const notionUrl = json.data?.notionUrl?.trim();
    if (!notionPageId || !notionUrl) {
      return res.status(502).json({ ok: false, error: "Unexpected response from automation server" });
    }

    return res.status(201).json({
      ok: true,
      notionPageId,
      notionUrl,
      message: typeof json.message === "string" ? json.message : undefined,
    });
  } catch (e) {
    console.error("[feature-requests submit]", e);
    return res.status(502).json({ ok: false, error: "Could not reach automation server" });
  }
}
