import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";

type Props = {
  codeText: string;
  copyKey: string;
  copiedStates: Record<string, boolean>;
  setCopiedStates: Dispatch<SetStateAction<Record<string, boolean>>>;
};

type BlockComponent = (props: Props) => JSX.Element;

export default function BlogPreBlockGate(props: Props) {
  const [Block, setBlock] = useState<BlockComponent | null>(null);

  useEffect(() => {
    let cancelled = false;
    void import("@/components/BlogPreBlock").then((mod) => {
      if (!cancelled) {
        setBlock(() => mod.default as BlockComponent);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!Block) {
    return (
      <pre className="my-10 overflow-x-auto rounded-xl border border-[#333] bg-[#1e1e1e] p-4 font-mono text-[0.9rem] leading-relaxed text-gray-200">
        <code>{props.codeText}</code>
      </pre>
    );
  }

  return <Block {...props} />;
}
