import type { Dispatch, SetStateAction } from "react";
import { Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  codeText: string;
  copyKey: string;
  copiedStates: Record<string, boolean>;
  setCopiedStates: Dispatch<SetStateAction<Record<string, boolean>>>;
};

export default function BlogPreBlock({ codeText, copyKey, copiedStates, setCopiedStates }: Props) {
  const handleCopyCode = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedStates((prev) => ({ ...prev, [copyKey]: true }));
    setTimeout(() => setCopiedStates((prev) => ({ ...prev, [copyKey]: false })), 2000);
  };

  return (
    <div className="my-10 rounded-xl overflow-hidden bg-[#1e1e1e] shadow-2xl border border-[#333] group max-w-[calc(100vw-2rem)] sm:max-w-full mx-auto font-sans">
      <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-[#111]">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <button
          type="button"
          onClick={() => {
            void handleCopyCode(codeText);
          }}
          className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1 font-sans"
        >
          {copiedStates[copyKey] ? (
            <span className="text-green-400 font-medium flex items-center gap-1">
              <Check className="w-3 h-3" /> Copied
            </span>
          ) : (
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">Copy Code</span>
          )}
        </button>
      </div>

      <div className="overflow-x-auto w-full">
        <SyntaxHighlighter
          language="javascript"
          style={vscDarkPlus}
          showLineNumbers
          wrapLines={false}
          customStyle={{
            margin: 0,
            padding: "1.5rem",
            background: "transparent",
            fontSize: "0.9rem",
            lineHeight: "1.6",
            fontFamily: "'SF Mono', 'JetBrains Mono', 'Fira Code', monospace",
            minWidth: "100%",
          }}
          lineNumberStyle={{
            minWidth: "2.5em",
            paddingRight: "1em",
            color: "#6e7681",
            textAlign: "right",
            userSelect: "none",
          }}
        >
          {codeText}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
