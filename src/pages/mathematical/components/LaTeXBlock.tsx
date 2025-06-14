
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Props = {
  latex: string;
};

export default function LaTeXBlock({ latex }: Props) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center gap-2 mt-2">
      <div className="overflow-x-auto bg-muted rounded p-2 font-mono text-base min-w-0">
        {"$" + latex + "$"}
      </div>
      <Button
        size="sm"
        variant={copied ? "secondary" : "outline"}
        onClick={() => {
          navigator.clipboard.writeText(latex);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        }}
      >
        {copied ? "Copied!" : "Copy LaTeX"}
      </Button>
    </div>
  );
}
