import type { Dispatch, SetStateAction } from "react";

type Props = {
  codeText: string;
  copyKey: string;
  copiedStates: Record<string, boolean>;
  setCopiedStates: Dispatch<SetStateAction<Record<string, boolean>>>;
};

type TokenType = "plain" | "keyword" | "string" | "comment" | "number" | "tag" | "punctuation";

type Token = {
  value: string;
  type: TokenType;
};

const TOKEN_PATTERN =
  /(\/\/.*$|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\b\d+(?:\.\d+)?\b|\b(?:const|let|var|async|await|function|return|if|else|for|while|new|class|import|from|export|try|catch|throw|true|false|null|undefined|document|window|fetch|addEventListener|type)\b|<\/?[a-zA-Z][\w-]*|[{}()[\].,;<>/=:+-])/g;

function getTokenType(token: string): TokenType {
  if (token.startsWith("//")) return "comment";
  if (/^["'`]/.test(token)) return "string";
  if (/^\d/.test(token)) return "number";
  if (/^<\/?[a-zA-Z][\w-]*/.test(token)) return "tag";
  if (/^[{}()[\].,;<>/=:+-]$/.test(token)) return "punctuation";
  if (
    /^(const|let|var|async|await|function|return|if|else|for|while|new|class|import|from|export|try|catch|throw|true|false|null|undefined|document|window|fetch|addEventListener|type)$/.test(
      token
    )
  ) {
    return "keyword";
  }
  return "plain";
}

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  TOKEN_PATTERN.lastIndex = 0;
  while ((match = TOKEN_PATTERN.exec(line)) !== null) {
    const [token] = match;
    if (match.index > lastIndex) {
      tokens.push({ value: line.slice(lastIndex, match.index), type: "plain" });
    }
    tokens.push({ value: token, type: getTokenType(token) });
    lastIndex = match.index + token.length;
  }

  if (lastIndex < line.length) {
    tokens.push({ value: line.slice(lastIndex), type: "plain" });
  }

  return tokens;
}

function tokenClassName(type: TokenType): string {
  switch (type) {
    case "keyword":
      return "text-[#7bdcff]";
    case "string":
      return "text-[#e5c07b]";
    case "comment":
      return "text-[#6a9955]";
    case "number":
      return "text-[#c586c0]";
    case "tag":
      return "text-[#56b6c2]";
    case "punctuation":
      return "text-[#d4d4d4]";
    default:
      return "text-[#d4d4d4]";
  }
}

export default function BlogPreBlock({ codeText, copyKey, copiedStates, setCopiedStates }: Props) {
  const handleCopyCode = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedStates((prev) => ({ ...prev, [copyKey]: true }));
    setTimeout(() => setCopiedStates((prev) => ({ ...prev, [copyKey]: false })), 2000);
  };

  const lines = codeText.replace(/\n$/, "").split("\n");

  return (
    <div className="my-10 overflow-hidden rounded-2xl border border-[#2e2e2e] bg-[#17181c] shadow-[0_20px_45px_-20px_rgba(0,0,0,0.75)] max-w-[calc(100vw-2rem)] sm:max-w-full mx-auto">
      <div className="flex items-center justify-between bg-[#202126] px-6 py-4 border-b border-[#2b2d33]">
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
          className="text-[0.95rem] font-medium text-[#94979f] transition-colors hover:text-white"
        >
          {copiedStates[copyKey] ? (
            <span>Copied</span>
          ) : (
            <span>Copy Code</span>
          )}
        </button>
      </div>

      <div className="w-full overflow-x-auto">
        <pre className="m-0 px-6 py-5 text-[1.05rem] leading-8 font-mono min-w-full">
          {lines.map((line, idx) => (
            <div key={`${copyKey}-${idx}`} className="grid grid-cols-[2.25rem_1fr] gap-5">
              <span className="select-none text-right text-[#78c46f]">{idx + 1}</span>
              <code className="whitespace-pre text-[#d4d4d4]">
                {tokenizeLine(line).map((token, tokenIdx) => (
                  <span key={`${copyKey}-${idx}-${tokenIdx}`} className={tokenClassName(token.type)}>
                    {token.value}
                  </span>
                ))}
              </code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
