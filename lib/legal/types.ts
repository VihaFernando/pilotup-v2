export type LegalSection = {
  id: string;
  title: string;
  /** Paragraphs; use HTML entities for apostrophes in copy */
  paragraphs: string[];
};

export type LegalDocument = {
  path: string;
  title: string;
  metaDescription: string;
  lastUpdated: string;
  lead?: string;
  sections: LegalSection[];
};
