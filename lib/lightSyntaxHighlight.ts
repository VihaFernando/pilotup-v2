/**
 * Tiny syntax highlighter: single-pass scanners only, no Prism/highlight.js.
 * Best-effort for blog snippets; odd edge cases fall back to plain text.
 */

export type TokenKind = "keyword" | "string" | "comment" | "number" | "tag" | "punctuation" | "callable" | "plain";

export type Token = { kind: TokenKind; text: string };

const JS_KEYWORDS = new Set([
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "enum",
  "export",
  "extends",
  "finally",
  "for",
  "function",
  "if",
  "import",
  "in",
  "instanceof",
  "let",
  "new",
  "return",
  "super",
  "switch",
  "this",
  "throw",
  "try",
  "typeof",
  "var",
  "void",
  "while",
  "with",
  "yield",
  "async",
  "await",
  "of",
  "static",
  "get",
  "set",
  "from",
  "as",
  "declare",
  "namespace",
  "interface",
  "type",
  "implements",
  "private",
  "protected",
  "public",
  "readonly",
  "abstract",
  "is",
  "keyof",
  "infer",
  "satisfies",
  "using",
  "true",
  "false",
  "null",
  "undefined",
  "Infinity",
  "NaN",
]);

const SQL_KEYWORDS = new Set(
  [
    "ADD",
    "ALL",
    "ALTER",
    "AND",
    "ANY",
    "AS",
    "ASC",
    "BACKUP",
    "BETWEEN",
    "BY",
    "CASE",
    "CHECK",
    "COLUMN",
    "CONSTRAINT",
    "CREATE",
    "DATABASE",
    "DEFAULT",
    "DELETE",
    "DESC",
    "DISTINCT",
    "DROP",
    "ELSE",
    "END",
    "EXCEPT",
    "EXISTS",
    "FALSE",
    "FETCH",
    "FOREIGN",
    "FROM",
    "FULL",
    "GROUP",
    "HAVING",
    "IN",
    "INDEX",
    "INNER",
    "INSERT",
    "INTERSECT",
    "INTO",
    "IS",
    "JOIN",
    "KEY",
    "LEFT",
    "LIKE",
    "LIMIT",
    "NOT",
    "NULL",
    "OF",
    "OFFSET",
    "ON",
    "OR",
    "ORDER",
    "OUTER",
    "PRIMARY",
    "PROCEDURE",
    "REFERENCES",
    "RETURNING",
    "RIGHT",
    "ROWNUM",
    "SELECT",
    "SET",
    "SOME",
    "TABLE",
    "THEN",
    "TOP",
    "TRUE",
    "TRUNCATE",
    "UNION",
    "UNIQUE",
    "UPDATE",
    "USE",
    "VALUES",
    "VIEW",
    "WHEN",
    "WHERE",
    "WITH",
  ].map((s) => s.toLowerCase())
);

function readStringDouble(s: string, start: number): { end: number; text: string } {
  let i = start + 1;
  while (i < s.length) {
    if (s[i] === "\\" && i + 1 < s.length) {
      i += 2;
      continue;
    }
    if (s[i] === '"') {
      i++;
      return { end: i, text: s.slice(start, i) };
    }
    i++;
  }
  return { end: s.length, text: s.slice(start) };
}

function readStringSingle(s: string, start: number): { end: number; text: string } {
  let i = start + 1;
  while (i < s.length) {
    if (s[i] === "\\" && i + 1 < s.length) {
      i += 2;
      continue;
    }
    if (s[i] === "'") {
      i++;
      return { end: i, text: s.slice(start, i) };
    }
    i++;
  }
  return { end: s.length, text: s.slice(start) };
}

/** Reads template literal from opening ` until closing ` (no nested ${ highlighting). */
function readTemplate(s: string, start: number): { end: number; text: string } {
  let i = start + 1;
  while (i < s.length) {
    if (s[i] === "\\" && i + 1 < s.length) {
      i += 2;
      continue;
    }
    if (s[i] === "`") {
      i++;
      return { end: i, text: s.slice(start, i) };
    }
    i++;
  }
  return { end: s.length, text: s.slice(start) };
}

function readNumber(s: string, start: number): { end: number; text: string } {
  let i = start;
  if (s[i] === "-") i++;
  if (s[i] === "0" && i + 1 < s.length && /[bxo]/i.test(s[i + 1])) {
    const prefix = s.slice(i, i + 2).toLowerCase();
    if (prefix === "0x") {
      i += 2;
      while (i < s.length && /[0-9a-f]/i.test(s[i])) i++;
      return { end: i, text: s.slice(start, i) };
    }
    if (prefix === "0b") {
      i += 2;
      while (i < s.length && /[01]/.test(s[i])) i++;
      return { end: i, text: s.slice(start, i) };
    }
    if (prefix === "0o") {
      i += 2;
      while (i < s.length && /[0-7]/.test(s[i])) i++;
      return { end: i, text: s.slice(start, i) };
    }
  }
  while (i < s.length && /[0-9]/.test(s[i])) i++;
  if (i < s.length && s[i] === ".") {
    i++;
    while (i < s.length && /[0-9]/.test(s[i])) i++;
  }
  if (i < s.length && /[eE]/.test(s[i])) {
    i++;
    if (i < s.length && /[+-]/.test(s[i])) i++;
    while (i < s.length && /[0-9]/.test(s[i])) i++;
  }
  return { end: i, text: s.slice(start, i) };
}

function tokenizeJavaScriptLike(source: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < source.length) {
    const c = source[i];

    if (c === " " || c === "\t" || c === "\n" || c === "\r") {
      const start = i;
      while (i < source.length && /[ \t\n\r]/.test(source[i])) i++;
      tokens.push({ kind: "plain", text: source.slice(start, i) });
      continue;
    }

    if (c === "/" && source[i + 1] === "/") {
      const start = i;
      i += 2;
      while (i < source.length && source[i] !== "\n") i++;
      tokens.push({ kind: "comment", text: source.slice(start, i) });
      continue;
    }

    if (c === "/" && source[i + 1] === "*") {
      const start = i;
      i += 2;
      let closed = false;
      while (i < source.length - 1) {
        if (source[i] === "*" && source[i + 1] === "/") {
          i += 2;
          closed = true;
          break;
        }
        i++;
      }
      if (!closed) i = source.length;
      tokens.push({ kind: "comment", text: source.slice(start, i) });
      continue;
    }

    if (c === '"') {
      const { end, text } = readStringDouble(source, i);
      tokens.push({ kind: "string", text });
      i = end;
      continue;
    }

    if (c === "'") {
      const { end, text } = readStringSingle(source, i);
      tokens.push({ kind: "string", text });
      i = end;
      continue;
    }

    if (c === "`") {
      const { end, text } = readTemplate(source, i);
      tokens.push({ kind: "string", text });
      i = end;
      continue;
    }

    if (/[0-9]/.test(c) || (c === "." && /[0-9]/.test(source[i + 1] ?? ""))) {
      const { end, text } = readNumber(source, i);
      if (text.length > 0) {
        tokens.push({ kind: "number", text });
        i = end;
        continue;
      }
    }

    if (/[a-zA-Z_$]/.test(c)) {
      const start = i;
      while (i < source.length && /[\w$]/.test(source[i])) i++;
      const word = source.slice(start, i);
      const kind = JS_KEYWORDS.has(word) ? "keyword" : "plain";
      tokens.push({ kind, text: word });
      continue;
    }

    tokens.push({ kind: "punctuation", text: c });
    i++;
  }
  return tokens;
}

/** Post-pass: color `name(` as callable (heuristic). */
function markCallables(tokens: Token[]): Token[] {
  const out: Token[] = [];
  for (let t = 0; t < tokens.length; t++) {
    const cur = tokens[t];
    const next = tokens[t + 1];
    if (
      cur.kind === "plain" &&
      next?.text === "(" &&
      /^[a-zA-Z_$][\w$]*$/.test(cur.text) &&
      !JS_KEYWORDS.has(cur.text)
    ) {
      out.push({ kind: "callable", text: cur.text });
    } else {
      out.push(cur);
    }
  }
  return out;
}

function tokenizeJson(source: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < source.length) {
    const c = source[i];
    if (/\s/.test(c)) {
      const start = i;
      while (i < source.length && /\s/.test(source[i])) i++;
      tokens.push({ kind: "plain", text: source.slice(start, i) });
      continue;
    }
    if (c === '"') {
      const { end, text } = readStringDouble(source, i);
      tokens.push({ kind: "string", text });
      i = end;
      continue;
    }
    if (/[0-9-]/.test(c)) {
      if (c === "-" && !/[0-9]/.test(source[i + 1] ?? "")) {
        tokens.push({ kind: "punctuation", text: c });
        i++;
        continue;
      }
      const { end, text } = readNumber(source, i);
      if (text.length > 0) {
        tokens.push({ kind: "number", text });
        i = end;
        continue;
      }
    }
    if ("{}[],:".includes(c)) {
      tokens.push({ kind: "punctuation", text: c });
      i++;
      continue;
    }
    if (source.startsWith("true", i)) {
      tokens.push({ kind: "keyword", text: "true" });
      i += 4;
      continue;
    }
    if (source.startsWith("false", i)) {
      tokens.push({ kind: "keyword", text: "false" });
      i += 5;
      continue;
    }
    if (source.startsWith("null", i)) {
      tokens.push({ kind: "keyword", text: "null" });
      i += 4;
      continue;
    }
    tokens.push({ kind: "plain", text: c });
    i++;
  }
  return tokens;
}

function tokenizeMarkup(source: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < source.length) {
    const lt = source.indexOf("<", i);
    if (lt === -1) {
      if (i < source.length) tokens.push({ kind: "plain", text: source.slice(i) });
      break;
    }
    if (lt > i) tokens.push({ kind: "plain", text: source.slice(i, lt) });
    let j = lt + 1;
    let quote: '"' | "'" | null = null;
    while (j < source.length) {
      const ch = source[j];
      if (quote) {
        if (ch === "\\" && j + 1 < source.length) {
          j += 2;
          continue;
        }
        if (ch === quote) quote = null;
        j++;
        continue;
      }
      if (ch === '"' || ch === "'") {
        quote = ch;
        j++;
        continue;
      }
      if (ch === ">") {
        j++;
        break;
      }
      j++;
    }
    tokens.push({ kind: "tag", text: source.slice(lt, j) });
    i = j;
  }
  return tokens;
}

function tokenizeSql(source: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < source.length) {
    const c = source[i];

    if (c === " " || c === "\t" || c === "\n" || c === "\r") {
      const start = i;
      while (i < source.length && /[ \t\n\r]/.test(source[i])) i++;
      tokens.push({ kind: "plain", text: source.slice(start, i) });
      continue;
    }

    if (c === "-" && source[i + 1] === "-") {
      const start = i;
      i += 2;
      while (i < source.length && source[i] !== "\n") i++;
      tokens.push({ kind: "comment", text: source.slice(start, i) });
      continue;
    }

    if (c === "/" && source[i + 1] === "*") {
      const start = i;
      i += 2;
      let closed = false;
      while (i < source.length - 1) {
        if (source[i] === "*" && source[i + 1] === "/") {
          i += 2;
          closed = true;
          break;
        }
        i++;
      }
      if (!closed) i = source.length;
      tokens.push({ kind: "comment", text: source.slice(start, i) });
      continue;
    }

    if (c === "'") {
      let j = i + 1;
      while (j < source.length) {
        if (source[j] === "'" && source[j + 1] === "'") {
          j += 2;
          continue;
        }
        if (source[j] === "'") {
          j++;
          break;
        }
        j++;
      }
      const end = j;
      tokens.push({ kind: "string", text: source.slice(i, end) });
      i = end;
      continue;
    }

    if (c === '"') {
      const { end, text } = readStringDouble(source, i);
      tokens.push({ kind: "string", text });
      i = end;
      continue;
    }

    if (/[a-zA-Z_$]/.test(c)) {
      const start = i;
      while (i < source.length && /[\w$]/.test(source[i])) i++;
      const word = source.slice(start, i);
      const lower = word.toLowerCase();
      const kind = SQL_KEYWORDS.has(lower) ? "keyword" : "plain";
      tokens.push({ kind, text: word });
      continue;
    }

    if (/[0-9]/.test(c) || (c === "." && /[0-9]/.test(source[i + 1] ?? ""))) {
      const { end, text } = readNumber(source, i);
      if (text.length > 0) {
        tokens.push({ kind: "number", text });
        i = end;
        continue;
      }
    }

    tokens.push({ kind: "punctuation", text: c });
    i++;
  }
  return tokens;
}

function normalizeLang(language: string): string {
  const raw = language.trim().toLowerCase().replace(/^language-/, "");
  const map: Record<string, string> = {
    js: "javascript",
    mjs: "javascript",
    cjs: "javascript",
    ts: "typescript",
    tsx: "typescript",
    jsx: "javascript",
    html: "markup",
    htm: "markup",
    xml: "markup",
    svg: "markup",
    md: "markup",
    vue: "markup",
    jsonc: "json",
    yml: "plain",
    yaml: "plain",
    sh: "plain",
    bash: "plain",
    zsh: "plain",
    shell: "plain",
  };
  return map[raw] ?? raw;
}

export function tokenizeCode(code: string, language: string): Token[] {
  const lang = normalizeLang(language);
  if (!code.length) return [];

  switch (lang) {
    case "json":
      return tokenizeJson(code);
    case "markup":
    case "html":
      return tokenizeMarkup(code);
    case "sql":
      return tokenizeSql(code);
    case "javascript":
    case "typescript":
      return markCallables(tokenizeJavaScriptLike(code));
    default:
      return [{ kind: "plain", text: code }];
  }
}

export function splitTokensIntoLines(tokens: Token[]): Token[][] {
  if (tokens.length === 0) return [[]];
  const lines: Token[][] = [[]];
  for (const t of tokens) {
    const parts = t.text.split("\n");
    for (let p = 0; p < parts.length; p++) {
      if (p > 0) lines.push([]);
      const segment = parts[p];
      if (segment.length > 0) {
        lines[lines.length - 1].push({ kind: t.kind, text: segment });
      }
    }
  }
  return lines;
}
