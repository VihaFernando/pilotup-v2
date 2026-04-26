import { createHash } from "crypto";

function voteSalt(): string {
  return (
    process.env.FEATURE_VOTE_IP_SALT ||
    process.env.STRAPI_API_TOKEN ||
    "pilotup-feature-vote-dev-only"
  );
}

/** HMAC-style SHA-256; IP is not stored, only the hash, salted server-side. */
export function hashIpForFeatureVote(ip: string): string {
  return createHash("sha256").update(`${voteSalt()}:${ip}`, "utf8").digest("hex");
}
