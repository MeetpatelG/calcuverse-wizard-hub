
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function factorial(n: number): number | string {
  if (n < 0) return "Invalid input";
  if (n > 170) return "Too large (overflow)"; // JS Number limit
  let res = 1;
  for (let i = 2; i <= n; ++i) res *= i;
  return res;
}

export default function FactorialPage() {
  const [num, setNum] = useState("");
  const [result, setResult] = useState<string | number | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const n = Number(num);
    if (!Number.isInteger(n) || n < 0 || num === "") {
      setResult("Enter a valid non-negative integer.");
      return;
    }
    setResult(factorial(n));
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container max-w-md mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Factorial Calculator</CardTitle>
            <CardDescription>
              Compute the factorial of a non-negative integer (n!).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex gap-2 mb-3">
              <Input
                placeholder="Enter a number"
                value={num}
                onChange={e => setNum(e.target.value.replace(/\D/, ""))}
                required type="number" min={0}
              />
              <Button type="submit">Calculate</Button>
            </form>
            {result !== null && (
              <div className="mt-3 break-all">
                Result: <span className="font-mono">{result}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
