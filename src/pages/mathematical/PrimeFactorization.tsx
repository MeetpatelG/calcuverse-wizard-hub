
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * Returns an array with the prime factorization (ascending order) of a positive integer n,
 * and each step as a string (for step-by-step explanation).
 */
function primeFactorizationDetails(n: number): {factors: number[], steps: string[]} {
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

export default function PrimeFactorizationPage() {
  const [num, setNum] = useState("");
  const [result, setResult] = useState<{ factors: number[], steps: string[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

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
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container max-w-md mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Prime Factorization Calculator</CardTitle>
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
              <Button type="submit">Factorize</Button>
            </form>
            {error && <div className="text-red-500 font-medium">{error}</div>}
            {result && (
              <div className="mt-4">
                <div>
                  <span className="font-semibold">Prime factors:</span>{" "}
                  {result.factors.length > 0 ? (
                    <span className="font-mono">{result.factors.join(" × ")}</span>
                  ) : (
                    <span>None</span>
                  )}
                </div>
                <details className="mt-3 bg-muted rounded p-3">
                  <summary className="cursor-pointer text-sm font-medium">Show step-by-step details</summary>
                  <ol className="pl-5 mt-2 list-decimal space-y-1 text-sm">
                    {result.steps.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </details>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
