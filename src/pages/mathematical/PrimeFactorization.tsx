import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import LaTeXBlock from "./components/LaTeXBlock";
import ExportButtons from "./components/ExportButtons";
import { toLaTeX } from "./utils/latex";

/**
 * Returns an array with the prime factorization (ascending order) of a positive integer n,
 * and each step as a string (for step-by-step explanation).
 */
function primeFactorizationDetails(n: number): { factors: number[]; steps: string[] } {
  const steps: string[] = [];
  const factors: number[] = [];
  let num = n;
  steps.push(`Start with ${num}`);

  // Extract 2s
  while (num % 2 === 0 && num !== 0) {
    factors.push(2);
    steps.push(`${num} is divisible by 2: ${num} / 2 = ${num / 2}`);
    num = num / 2;
  }
  // Extract odd primes
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    while (num % i === 0) {
      factors.push(i);
      steps.push(`${num} is divisible by ${i}: ${num} / ${i} = ${num / i}`);
      num = num / i;
    }
  }
  // If remaining is a prime > 2
  if (num > 2) {
    factors.push(num);
    steps.push(`${num} is a prime number greater than 2, added as a factor.`);
  }
  if (n === 1) {
    steps.push("1 has no prime factors.");
  }
  return { factors, steps };
}

type LogEntry = {
  input: string;
  factors: number[];
  steps: string[];
  ts: number;
};

export default function PrimeFactorizationPage() {
  const [num, setNum] = useState("");
  const [result, setResult] = useState<{ factors: number[]; steps: string[] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const n = Number(num);
    setError(null);
    setResult(null);
    if (!Number.isInteger(n) || n < 1 || num === "") {
      setError("Please enter a positive integer greater than 0.");
      return;
    }
    const res = primeFactorizationDetails(n);
    setResult(res);
    setLog(log => [{ input: num, factors: res.factors, steps: res.steps, ts: Date.now() }, ...log].slice(0, 10));
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container max-w-md mx-auto py-10">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <CardTitle>
                  Prime Factorization Calculator
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="inline ml-2 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Enter a positive integer to find its complete prime factor breakdown, with all intermediate steps. Advanced features: export, LaTeX, logs.
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </div>
              <CardDescription>
                Find the prime factors of a positive integer, with full step-by-step details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="flex gap-2 mb-3">
                <Input
                  placeholder="Enter a positive integer"
                  value={num}
                  onChange={e => setNum(e.target.value.replace(/\D/, ""))}
                  required
                  min={1}
                  type="number"
                />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button type="submit">Factorize</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Calculate the prime factors for the entered number.
                  </TooltipContent>
                </Tooltip>
              </form>
              {error && <div className="text-red-500 font-medium">{error}</div>}
              {result && (
                <div className="mt-4">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Prime factors:</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="font-mono cursor-pointer">
                          {result.factors.length > 0 ? result.factors.join(" × ") : "None"}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        {result.factors.length
                          ? "List of all prime numbers that multiply to the input."
                          : "The input is 1, which has no prime factors."}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  {/* LaTeX output box */}
                  <LaTeXBlock latex={toLaTeX(result.factors, result.steps).result} />
                  {/* Export buttons */}
                  <ExportButtons num={Number(num)} factors={result.factors} steps={result.steps} />
                  {/* Show step details (with LaTeX) */}
                  <details className="mt-3 bg-muted rounded p-3">
                    <summary className="cursor-pointer text-sm font-medium">Show step-by-step details</summary>
                    <ol className="pl-5 mt-2 list-decimal space-y-1 text-sm">
                      {result.steps.map((step, idx) => (
                        <li key={idx}>
                          {step}
                          {/* Could add later: <span className="ml-2 text-muted-foreground font-mono">({toLaTeX([], [step]).steps[0]})</span> */}
                        </li>
                      ))}
                    </ol>
                  </details>
                  {/* Advanced toggle */}
                  <Button
                    size="sm"
                    variant="ghost"
                    type="button"
                    className="mt-4 mb-2 text-sm"
                    onClick={() => setShowAdvanced(s => !s)}
                  >
                    {showAdvanced ? "Hide Advanced Methods" : "Show Advanced Methods"}
                  </Button>
                  {showAdvanced && (
                    <div className="mb-3 p-3 border bg-muted rounded text-sm">
                      <p className="mb-1 font-semibold">Alternative Algorithms (More coming soon):</p>
                      <ul className="list-disc pl-5">
                        <li>
                          <b>Pollard's Rho Method</b>: Efficient for large numbers, especially semi-primes (not implemented here).
                        </li>
                        <li>
                          <b>Trial Division</b>: Current method, tests divisibility by increasing primes until sqrt(n).
                        </li>
                        <li>
                          <b>Wheel Factorization, Elliptic Curve Factorization, etc.</b> <span className="text-muted-foreground">(Advanced, not implemented)</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
              {/* Calculation log/history */}
              {log.length > 0 && (
                <div className="mt-8">
                  <div className="font-semibold mb-1 flex items-center gap-2">
                    Previous Calculations
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="inline text-muted-foreground cursor-pointer" size={18} />
                      </TooltipTrigger>
                      <TooltipContent>
                        Only visible for this session. Most recent at top.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="bg-muted rounded px-3 py-2 max-h-40 overflow-auto text-sm">
                    <ol className="pl-3 list-decimal space-y-0.5">
                      {log.map(entry => (
                        <li key={entry.ts}>
                          <span className="font-mono">{entry.input}</span> → <span>{entry.factors.join(" × ")}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    </TooltipProvider>
  );
}
