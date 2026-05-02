import type { LegalDocument } from "@/lib/legal/types";

export const termsDocument: LegalDocument = {
  path: "/terms",
  title: "Terms & conditions",
  metaDescription: "Terms and conditions for using PilotUP products and services.",
  lastUpdated: "April 26, 2026",
  lead:
    "By accessing or using PilotUP’s services, you agree to these Terms. If you do not agree, do not use the services. We may update these Terms from time to time; the date at the top reflects the latest version.",
  sections: [
    {
      id: "agreement",
      title: "Agreement to these terms",
      paragraphs: [
        "These Terms of Service (“Terms”) form a legal agreement between you and PilotUP Inc. (“PilotUP,” “we,” “us,” or “our”) governing your use of our websites, applications, and related services (the “Services”).",
        "If you use the Services on behalf of an organization, you represent that you have authority to bind that organization, and “you” includes both you and the organization.",
      ],
    },
    {
      id: "services",
      title: "The services",
      paragraphs: [
        "PilotUP provides software that helps teams build and run AI employees, workflows, and automations. Features may change as we improve the product. We do not guarantee uninterrupted or error-free operation.",
        "We may suspend or limit access for maintenance, security, or legal reasons, or if you breach these Terms.",
      ],
    },
    {
      id: "accounts",
      title: "Accounts and access",
      paragraphs: [
        "You must provide accurate information when you create an account and keep it up to date. You are responsible for safeguarding your credentials and for activity under your account.",
        "You must be at least the age of majority in your jurisdiction to use the Services, or you must have verifiable parent or guardian consent where required by law.",
      ],
    },
    {
      id: "acceptable-use",
      title: "Acceptable use",
      paragraphs: [
        "You agree not to misuse the Services. Without limitation, you must not: violate applicable law; attempt to gain unauthorized access to our systems or other users’ data; interfere with the integrity of the Services; use the Services to build harmful, deceptive, or illegal outputs at scale; or reverse engineer or scrape the Services except as permitted by law.",
        "We may investigate and take action, including suspending or terminating accounts, if we believe you have violated these rules.",
      ],
    },
    {
      id: "content-ip",
      title: "Your content and our IP",
      paragraphs: [
        "You retain rights to the inputs, prompts, and materials you provide (“Your Content”). You grant PilotUP a non-exclusive license to use, process, and display Your Content as needed to provide and improve the Services, consistent with our Privacy Policy.",
        "The Services, including software, designs, and branding, are owned by PilotUP or our licensors. Except for the limited right to use the Services under these Terms, we grant you no other rights.",
      ],
    },
    {
      id: "third-party",
      title: "Third-party services",
      paragraphs: [
        "The Services may integrate with or link to third-party products. Your use of those services is subject to the third party’s terms and privacy policy. We are not responsible for third-party services.",
      ],
    },
    {
      id: "fees",
      title: "Fees and trials",
      paragraphs: [
        "If you purchase a paid plan, you agree to the fees and billing cycle shown at purchase. Unless stated otherwise, fees are non-refundable except where required by law. We may change prices with reasonable notice to you.",
      ],
    },
    {
      id: "disclaimers",
      title: "Disclaimers",
      paragraphs: [
        "THE SERVICES ARE PROVIDED “AS IS” AND “AS AVAILABLE.” TO THE MAXIMUM EXTENT PERMITTED BY LAW, PILOTUP DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. AI-GENERATED OUTPUTS MAY BE INACCURATE OR INCOMPLETE; YOU ARE RESPONSIBLE FOR HOW YOU USE THEM.",
      ],
    },
    {
      id: "liability",
      title: "Limitation of liability",
      paragraphs: [
        "TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEITHER PILOTUP NOR ITS SUPPLIERS WILL BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR GOODWILL, ARISING FROM YOUR USE OF THE SERVICES. OUR AGGREGATE LIABILITY FOR ANY CLAIM ARISING OUT OF THESE TERMS OR THE SERVICES IS LIMITED TO THE GREATER OF THE AMOUNT YOU PAID US IN THE TWELVE MONTHS BEFORE THE EVENT GIVING RISE TO THE CLAIM OR ONE HUNDRED DOLLARS (US $100), EXCEPT WHERE PROHIBITED BY LAW.",
      ],
    },
    {
      id: "indemnity",
      title: "Indemnity",
      paragraphs: [
        "You will defend and indemnify PilotUP and its officers, directors, and employees from any claims, damages, and expenses (including reasonable attorneys’ fees) arising from Your Content, your use of the Services, or your breach of these Terms.",
      ],
    },
    {
      id: "governing-law",
      title: "Governing law and disputes",
      paragraphs: [
        "These Terms are governed by the laws of the State of Delaware, United States, excluding conflict-of-law rules, unless a different body of law is required by the jurisdiction in which you reside. Subject to applicable law, the courts in Delaware (or a federal court located there) will have exclusive jurisdiction over disputes, unless you and PilotUP agree otherwise in writing.",
      ],
    },
    {
      id: "changes",
      title: "Changes to the terms",
      paragraphs: [
        "We may modify these Terms by posting an updated version and updating the “Last updated” date. If changes are material, we will make reasonable efforts to notify you. Continued use after the effective date constitutes acceptance. If you do not agree, you must stop using the Services.",
      ],
    },
    {
      id: "contact-terms",
      title: "Contact",
      paragraphs: [
        "For questions about these Terms, contact us at hello@pilotup.io. You may also use the address published on our website for legal notices where applicable.",
      ],
    },
  ],
};
