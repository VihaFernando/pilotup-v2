import type { Dispatch, SetStateAction } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

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

  return (
    <div className="group my-10 overflow-hidden rounded-[14px] border border-[#2a2d34] bg-[#1b1d22] shadow-[0_20px_45px_-20px_rgba(0,0,0,0.75)] max-w-[calc(100vw-2rem)] sm:max-w-full mx-auto">
      <div className="flex items-center justify-between bg-[#22242b] px-6 py-2 border-b border-[#2a2d34]">
        <div className="flex gap-2.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <button
          type="button"
          onClick={() => {
            void handleCopyCode(normalizedCode);
          }}
          className="text-xs font-medium text-[#b3b9c6] transition-all opacity-0 group-hover:opacity-100 hover:text-white"
          style={{ fontFamily: "'Poppins', 'Google Sans', 'Segoe UI', sans-serif" }}
        >
          {copiedStates[copyKey] ? (
            <span>Copied</span>
          ) : (
            <span>Copy Code</span>
          )}
        </button>
      </div>

      <div className="w-full overflow-x-auto">
        <SyntaxHighlighter
          language={highlightedLanguage}
          style={vscDarkPlus}
          showLineNumbers={true}
          wrapLines={false}
          customStyle={{
            margin: 0,
            padding: "1.5rem 2.5rem",
            background: "transparent",
            fontSize: "0.95rem",
            lineHeight: "1.75",
            fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', Menlo, Monaco, Consolas, monospace",
            minWidth: "100%",
            tabSize: 2,
          }}
          lineNumberStyle={{
            minWidth: "2.5em",
            paddingRight: "1.25em",
            color: "#6a9955",
            textAlign: "right",
            userSelect: "none",
            marginRight: "0.5em",
          }}
        >
          {normalizedCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
