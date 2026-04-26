import type { NextApiRequest, NextApiResponse } from "next";
import { getClientIpFromRequest } from "@/lib/clientIp";
import { registerUpvoteInStrapi } from "@/lib/featureRequestsStrapi";
import { hashIpForFeatureVote } from "@/lib/voteIpHash";

type OkBody = {
  ok: true;
  upvotes: number;
  hasUpvoted: true;
  alreadyVoted: boolean;
};

type ErrBody = { ok: false; error: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<OkBody | ErrBody>) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const rawId = req.query.id;
  const strapiId = Array.isArray(rawId) ? rawId[0] : rawId;
  if (!strapiId || typeof strapiId !== "string") {
    return res.status(400).json({ ok: false, error: "Missing id" });
  }

  try {
    const ip = getClientIpFromRequest(req);
    const hash = hashIpForFeatureVote(ip);
    const result = await registerUpvoteInStrapi(strapiId, hash);
    return res.status(200).json({
      ok: true,
      upvotes: result.upvotes,
      hasUpvoted: true,
      alreadyVoted: !result.wasNew,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Upvote failed";
    if (message.includes("not found")) {
      return res.status(404).json({ ok: false, error: message });
    }
    console.error("[feature-requests upvote]", message);
    return res.status(500).json({ ok: false, error: "Could not record upvote" });
  }
}
