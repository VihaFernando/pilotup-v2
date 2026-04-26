import type { LegalDocument } from "@/lib/legal/types";

export const privacyDocument: LegalDocument = {
  path: "/privacy",
  title: "Privacy policy",
  metaDescription: "How PilotUP collects, uses, and protects personal data when you use our services.",
  lastUpdated: "April 26, 2026",
  lead:
    "This Privacy Policy explains how PilotUP Inc. (“PilotUP,” “we,” “us,” or “our”) processes personal information when you visit our website, use our product, or otherwise interact with us. By using the Services, you acknowledge this Policy.",
  sections: [
    {
      id: "scope",
      title: "Scope",
      paragraphs: [
        "This Policy applies to personal data we process in connection with PilotUP’s websites, applications, and related services. It does not cover third-party sites or services that we link to; their policies control how they use data.",
        "If you are in the European Economic Area, United Kingdom, or another region with specific privacy rights, additional disclosures or rights may apply as described below.",
      ],
    },
    {
      id: "data-we-collect",
      title: "Information we collect",
      paragraphs: [
        "Account and contact data: name, work email, company, role, and similar details you or your organization provide when signing up, joining a waitlist, or contacting us.",
        "Usage and technical data: how you use the product (e.g. features, approximate location derived from IP, device and browser type, logs, and diagnostics) to secure and improve the Services.",
        "Content you provide: text, files, and integrations you connect so that our AI and automation features can run on your behalf, as further described in our product terms.",
        "We may receive information from service providers, analytics tools, and public sources in accordance with their policies and applicable law.",
      ],
    },
    {
      id: "how-we-use",
      title: "How we use information",
      paragraphs: [
        "We use personal data to: provide, maintain, and improve the Services; authenticate users and protect against fraud and abuse; communicate with you about the product, security, and legal notices; analyze usage in aggregate to improve our roadmap; and comply with law and enforce our terms.",
        "We do not sell your personal information as that term is commonly understood. We do not use your data to train third-party models for unrelated advertising without appropriate consent where required.",
      ],
    },
    {
      id: "legal-bases",
      title: "Legal bases (where applicable)",
      paragraphs: [
        "Where GDPR or similar laws apply, we process personal data on the basis of: performance of a contract; legitimate interests (such as security and product improvement) that are not overridden by your rights; compliance with legal obligations; and, where required, your consent, which you may withdraw.",
      ],
    },
    {
      id: "sharing",
      title: "Sharing and subprocessors",
      paragraphs: [
        "We may share data with service providers that host infrastructure, process payments, send email, or provide security and analytics, subject to appropriate contracts and safeguards.",
        "We may disclose information if we believe in good faith that disclosure is required by law, to protect the rights, safety, or property of PilotUP, our users, or others, or in connection with a merger, acquisition, or asset sale, with notice to you as required by law.",
      ],
    },
    {
      id: "retention",
      title: "Retention",
      paragraphs: [
        "We keep personal data only as long as needed for the purposes described in this Policy, including legal, accounting, and security needs. When data is no longer required, we delete or anonymize it in line with our retention schedules.",
      ],
    },
    {
      id: "security",
      title: "Security",
      paragraphs: [
        "We use administrative, technical, and organizational measures designed to protect personal data. No system is 100% secure; you should use strong credentials and follow your organization’s security practices.",
      ],
    },
    {
      id: "rights",
      title: "Your rights and choices",
      paragraphs: [
        "Depending on where you live, you may have the right to access, correct, delete, or export your personal data, object to or restrict certain processing, and lodge a complaint with a supervisory authority. You may also opt out of marketing emails via the link in each message.",
        "To exercise your rights, contact us at the email below. We may need to verify your request and may be unable to fulfill certain requests if they conflict with our legal or contractual obligations.",
      ],
    },
    {
      id: "children",
      title: "Children",
      paragraphs: [
        "The Services are not directed to children under 16 (or a higher age where required by law), and we do not knowingly collect their personal information. If you believe we have collected data from a child, contact us and we will take appropriate steps to delete it.",
      ],
    },
    {
      id: "transfers",
      title: "International transfers",
      paragraphs: [
        "We may process data in the United States and other countries. Where we transfer data from the EEA, UK, or Switzerland, we use appropriate safeguards such as standard contractual clauses, as applicable.",
      ],
    },
    {
      id: "california",
      title: "California (CCPA) notice",
      paragraphs: [
        "California residents may have additional rights under the CCPA/CPRA, including the right to know, delete, and opt out of certain sales or sharing. We describe categories of data collected in this Policy. To submit a request, use the contact below. We will not discriminate against you for exercising your rights.",
      ],
    },
    {
      id: "changes-privacy",
      title: "Changes to this policy",
      paragraphs: [
        "We may update this Privacy Policy to reflect changes in our practices or the law. We will post the updated version and revise the “Last updated” date. For material changes, we will take additional steps, such as email notice, where appropriate.",
      ],
    },
    {
      id: "contact-privacy",
      title: "Contact",
      paragraphs: [
        "For privacy questions or requests, contact privacy@pilotup.io, or use hello@pilotup.io. You may also contact us at the business address published on our website.",
      ],
    },
  ],
};
