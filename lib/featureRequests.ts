/** Used by `NewRequestModal` for a future “submit” flow. */
export type RequestPriority = "low" | "medium" | "high";

export type FeatureRequestType = "product" | "api" | "billing" | "other";

export type FeatureReviewStatus =
  | "idea"
  | "backlog"
  | "in-progress"
  | "testing"
  | "ready-for-development"
  | "shipped";

export type FeatureRequestEntry = {
  strapiId: string;
  title: string;
  description: string;
  type: FeatureRequestType;
  upvotes: number;
  reviewStatus: FeatureReviewStatus;
};

export type FeatureRequestView = FeatureRequestEntry & {
  hasUpvoted: boolean;
};
