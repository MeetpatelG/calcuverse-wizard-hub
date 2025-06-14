
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function toScientific(numStr: string): { result: string, explanation: string } | null {
  // Remove commas, handle input errors
  let n = Number(numStr.replace(/,/g, ''));
  if (isNaN(n)) return null;

  if (n === 0) {
    return {
      result: "0 × 10⁰",
      explanation: "Zero in scientific notation is always 0 × 10⁰."
    };
  }
  const exponent = Math.floor(Math.log10(Math.abs(n)));
  const coefficient = n / Math.pow(10, exponent);
  return {
    result: `${coefficient.toPrecision(6)} × 10^${exponent}`,
    explanation: `Move the decimal ${exponent} place${Math.abs(exponent) !== 1 ? 's' : ''} to the left to get ${coefficient.toPrecision(6)}.\nSo, ${n} = ${coefficient.toPrecision(6)} × 10^${exponent}.`
  };
}

function fromScientific(input: string): { result: string, explanation: string } | null {
  // Accept inputs like "a × 10^b" or variations
  const regex = /^\s*(-?\d+(\.\d+)?)(\s*[×x*]\s*10\s*\^?\s*(-?\d+))\s*$/i;
  const match = input.match(regex);
  if (!match) return null;

  const coeff = Number(match[1]);
  const exp = Number(match[4]);
  if (isNaN(coeff) || isNaN(exp)) return null;

  const value = coeff * Math.pow(10, exp);
  return {
    result: value.toString(),
    explanation: `${input.trim()} means ${coeff} × 10^${exp} = ${value}.`
  };
}

export default function ScientificNotationPage() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"to" | "from">("to");
  const [result, setResult] = useState<{ result: string, explanation: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (input.trim() === "") {
      setError("Please enter a number.");
      return;
    }

    if (mode === "to") {
      const res = toScientific(input);
      if (!res) {
        setError("Enter a valid number.");
        return;
      }
      setResult(res);
    } else {
      const res = fromScientific(input);
      if (!res) {
        setError("Please enter a valid scientific notation (e.g., 2.3 × 10^5).");
        return;
      }
      setResult(res);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container max-w-md mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Scientific Notation Converter</CardTitle>
            <CardDescription>
              Convert numbers between decimal and scientific notation with explanations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={mode === "to" ? "secondary" : "outline"}
                  onClick={() => { setMode("to"); setResult(null); setError(null); }}
                >
                  Decimal → Scientific
                </Button>
                <Button
                  type="button"
                  variant={mode === "from" ? "secondary" : "outline"}
                  onClick={() => { setMode("from"); setResult(null); setError(null); }}
                >
                  Scientific → Decimal
                </Button>
              </div>
              <Input
                placeholder={mode === "to" ? "Enter a decimal number" : "Enter scientific notation (e.g. 2.3 × 10^5)"}
                value={input}
                onChange={e => setInput(e.target.value)}
                required
                type="text"
                autoComplete="off"
              />
              <Button type="submit">Convert</Button>
            </form>
            {error && <div className="text-red-500 font-medium mt-3">{error}</div>}
            {result && (
              <div className="mt-4">
                <div>
                  <span className="font-semibold">Result:</span>{" "}
                  <span className="font-mono">{result.result}</span>
                </div>
                <div className="mt-2 text-sm bg-muted rounded p-2">
                  {result.explanation}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
