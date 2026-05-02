/**
 * PilotUP automation server (Notion-backed feature requests).
 * Browser calls should go through Next.js API routes so dev origins work without CORS issues.
 */

export function getAutomationApiBaseUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_AUTOMATION_API_URL ||
    process.env.NEXT_PUBLIC_AUTOMATION_API ||
    "http://localhost:8080";
  return url.replace(/\/$/, "");
}

export type AutomationCreateSuccess = {
  success: true;
  message?: string;
  data: { notionPageId: string; notionUrl: string };
};

export type AutomationErr = { success: false; error: string };

export type AutomationUpvoteSuccess = {
  success: true;
  message?: string;
  data: { pageId: string; priority: number };
};
