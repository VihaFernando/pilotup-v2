import type { Dispatch, SetStateAction } from "react";

type Props = {
  codeText: string;
  copyKey: string;
  copiedStates: Record<string, boolean>;
  setCopiedStates: Dispatch<SetStateAction<Record<string, boolean>>>;
  language?: string;
};

function detectLanguage(source: string): string {
  const trimmed = source.trimStart();
  if (/^<(!doctype|html|[a-z][\w:-]*)(\s|>)/i.test(trimmed) || /<\/[a-z][\w:-]*>/i.test(source)) {
    return "markup";
  }
  if (/^\s*\{[\s\S]*\}\s*$/.test(trimmed) && /:\s*/.test(trimmed)) {
    return "json";
  }
  if (/^\s*(SELECT|WITH|INSERT|UPDATE|DELETE)\b/i.test(trimmed)) {
    return "sql";
  }
  return "javascript";
}

export default function BlogPreBlock({ codeText, copyKey, copiedStates, setCopiedStates, language }: Props) {
  const handleCopyCode = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedStates((prev) => ({ ...prev, [copyKey]: true }));
    setTimeout(() => setCopiedStates((prev) => ({ ...prev, [copyKey]: false })), 2000);
  };

  const normalizedCode = codeText.replace(/\r\n?/g, "\n").replace(/\u00a0/g, " ");
  const highlightedLanguage = language || detectLanguage(normalizedCode);
  const lines = normalizedCode.length === 0 ? [""] : normalizedCode.split("\n");
  const gutterMinCh = Math.max(2, String(lines.length).length) + 0.25;

  const mono =
    "'JetBrains Mono', 'Fira Code', 'SF Mono', Menlo, Monaco, Consolas, monospace";

  return (
    <div className="group my-10 overflow-hidden rounded-[14px] border border-[#2a2d34] bg-[#1b1d22] shadow-[0_20px_45px_-20px_rgba(0,0,0,0.75)] max-w-[calc(100vw-2rem)] sm:max-w-full mx-auto">
      <div className="flex items-center justify-between bg-[#22242b] px-6 py-2 border-b border-[#2a2d34]">
        <div className="flex gap-2.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex items-center gap-4 min-w-0">
          <span
            className="text-[10px] uppercase tracking-wider text-[#858b98] truncate max-w-[120px] sm:max-w-none"
            title={highlightedLanguage}
          >
            {highlightedLanguage}
          </span>
          <button
            type="button"
            onClick={() => {
              void handleCopyCode(normalizedCode);
            }}
            className="text-xs font-medium text-[#b3b9c6] transition-all opacity-0 group-hover:opacity-100 hover:text-white shrink-0"
            style={{ fontFamily: "'Poppins', 'Google Sans', 'Segoe UI', sans-serif" }}
          >
            {copiedStates[copyKey] ? <span>Copied</span> : <span>Copy Code</span>}
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto px-6 py-6">
        <div className="flex gap-0 min-w-0" style={{ fontFamily: mono, fontSize: "0.95rem", lineHeight: 1.75, tabSize: 2 }}>
          <div
            className="select-none shrink-0 text-right text-[#6a9955] pr-5 border-r border-[#2a2d34]"
            style={{ minWidth: `${gutterMinCh}ch` }}
            aria-hidden
          >
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <pre className="m-0 flex-1 min-w-0 overflow-x-auto text-[#d4d4d4]">
            <code>
              {lines.map((line, i) => (
                <span key={i} className="block whitespace-pre">
                  {line}
                </span>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
