export const ARTICLE_BODY_STYLES = `
.article-body {
  font-family: 'Merriweather', 'Georgia', serif;
  color: #242424;
  line-height: 2;
  font-size: 1.125rem;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

.article-body,
.article-body * {
  font-family: 'Merriweather', 'Georgia', serif;
}

.article-body p {
  margin-bottom: 2rem;
  font-weight: 400;
  color: #292929;
}

.article-body strong {
  font-weight: 700;
  color: #111;
}

.article-body h2 {
  font-family: 'Merriweather', serif;
  font-size: 2rem;
  font-weight: 900;
  margin: 2em 0 0.8em;
  color: #1a1a1a;
  letter-spacing: -0.02em;
  line-height: 1.25;
}

.article-body h3 {
  font-family: 'Merriweather', serif;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 1.8em 0 0.8em;
  color: #1a1a1a;
  line-height: 1.35;
}

.article-body ul,
.article-body ol {
  margin: 0 0 2.25rem 0;
  padding-left: 1.9rem;
  color: #292929;
  font-weight: 400;
}

.article-body ul {
  list-style-type: disc;
}

.article-body ol {
  list-style-type: decimal;
}

.article-body li {
  margin-bottom: 0.8rem;
  padding-left: 0.3rem;
  line-height: 1.9;
}

.article-body li > ul,
.article-body li > ol {
  margin-top: 0.8rem;
  margin-bottom: 0.6rem;
}

.article-body ul li::marker {
  color: #E21339;
  font-size: 1.05em;
}

.article-body ol li::marker {
  color: #111827;
  font-weight: 700;
}

.article-body blockquote {
  position: relative;
  padding: 1.25rem 1.5rem;
  margin: 2rem 0;
  font-style: italic;
  color: #111;
  font-size: 1.1rem;
  line-height: 1.6;
  border-left: 3px solid #E21339;
  background: rgba(226, 19, 57, 0.03);
  border-radius: 0 0.5rem 0.5rem 0;
  font-weight: 400;
  display: flex;
  align-items: center;
}

.article-body a {
  color: #111;
  text-decoration: underline;
  text-decoration-color: rgba(226, 19, 57, 0.4);
  text-decoration-thickness: 1px;
  text-underline-offset: 4px;
  font-weight: 700;
  transition: all 0.2s ease;
}

.article-body a:hover {
  color: #E21339;
  text-decoration-color: #E21339;
  background: rgba(226, 19, 57, 0.05);
}

.article-body img {
  width: 100%;
  height: auto;
  border-radius: 0.75rem;
  margin: 3.5rem 0;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
}

.article-body table {
  width: 100%;
  margin: 2.5rem 0;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 0.98rem;
  line-height: 1.7;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.08);
}

.article-body thead {
  background: #f8fafc;
}

.article-body th,
.article-body td {
  padding: 1rem 1.1rem;
  text-align: left;
  vertical-align: top;
  border-bottom: 1px solid #e5e7eb;
  color: #292929;
}

.article-body th {
  font-weight: 700;
  color: #111;
  font-size: 0.92rem;
  letter-spacing: 0.01em;
}

.article-body tbody tr:last-child td {
  border-bottom: none;
}

.article-body tbody tr:nth-child(even) {
  background: rgba(17, 17, 17, 0.02);
}

.article-body td strong,
.article-body th strong {
  font-weight: 700;
  color: #111;
}

.article-body td p,
.article-body th p {
  margin: 0;
}

.article-body :not(pre) > code {
  background: #f3f4f6;
  color: #E21339;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'SF Mono', 'Menlo', monospace;
  font-size: 0.85em;
  font-weight: 500;
  border: 1px solid #e5e7eb;
}
`;

export const MERRIWEATHER_FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400&display=swap');`;