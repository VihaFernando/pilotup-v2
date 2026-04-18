import type { Dispatch, SetStateAction } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  codeText: string;
  language?: string;
  copyKey: string;
  copiedStates: Record<string, boolean>;
  setCopiedStates: Dispatch<SetStateAction<Record<string, boolean>>>;
};

export default function BlogPreBlock({ codeText, language = "javascript", copyKey, copiedStates, setCopiedStates }: Props) {
  const handleCopyCode = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedStates((prev) => ({ ...prev, [copyKey]: true }));
    setTimeout(() => setCopiedStates((prev) => ({ ...prev, [copyKey]: false })), 2000);
  };

  return (
    <div className="my-10 overflow-hidden rounded-[1.5rem] border border-[#272b34] bg-[#0f1216] shadow-[0_25px_45px_-20px_rgba(0,0,0,0.85)] max-w-[calc(100vw-2rem)] sm:max-w-full mx-auto">
      <div className="flex items-center justify-between bg-[#181c21] px-5 py-4 border-b border-[#2d3138]">
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <button
          type="button"
          onClick={() => {
            void handleCopyCode(codeText);
          }}
          className="rounded-full border border-[#30343c] bg-[#111316] px-3 py-1 text-sm font-medium text-[#d0d4dc] transition-colors hover:bg-[#1f242c] hover:text-white"
        >
          {copiedStates[copyKey] ? "Copied" : "Copy Code"}
        </button>
      </div>

      <div className="w-full overflow-x-auto bg-[#0f1216]">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          showLineNumbers
          wrapLongLines={false}
          customStyle={{
            margin: 0,
            padding: "1.5rem",
            background: "transparent",
            fontSize: "0.975rem",
            lineHeight: 1.7,
            fontFamily: "'SF Mono', 'JetBrains Mono', 'Fira Code', monospace",
            minWidth: "100%",
          }}
          lineNumberStyle={{
            minWidth: "2.5rem",
            paddingRight: "1rem",
            color: "#5b7e99",
            userSelect: "none",
          }}
        >
          {codeText.trimEnd()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
