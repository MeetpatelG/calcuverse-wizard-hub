
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function gcd(a: number, b: number): number {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return Math.abs(a);
}
function lcm(a: number, b: number): number {
  return a === 0 || b === 0 ? 0 : Math.abs((a * b) / gcd(a, b));
}

export default function GcdLcmPage() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState<{ gcd?: number, lcm?: number } | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const a = Number(num1), b = Number(num2);
    if (!Number.isInteger(a) || !Number.isInteger(b) || num1 === "" || num2 === "") return;
    setResult({
      gcd: gcd(a, b),
      lcm: lcm(a, b)
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container max-w-md mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>GCD &amp; LCM Calculator</CardTitle>
            <CardDescription>
              Calculate the Greatest Common Divisor and Least Common Multiple of two numbers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex gap-2 mb-3">
              <Input
                placeholder="First number"
                value={num1}
                onChange={e => setNum1(e.target.value.replace(/\D/, ""))}
                required type="number" min={0}
              />
              <Input
                placeholder="Second number"
                value={num2}
                onChange={e => setNum2(e.target.value.replace(/\D/, ""))}
                required type="number" min={0}
              />
              <Button type="submit">Calculate</Button>
            </form>
            {result && (
              <div>
                <div>GCD: <span className="font-mono">{result.gcd}</span></div>
                <div>LCM: <span className="font-mono">{result.lcm}</span></div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
