
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function isPrime(n: number) {
  if (n <= 1) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

export default function PrimeCheckerPage() {
  const [num, setNum] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const n = Number(num);
    if (!Number.isInteger(n) || n < 0 || num === '') {
      setResult("Please enter a valid positive integer.");
      return;
    }
    setResult(isPrime(n) ? `${n} is a Prime Number` : `${n} is NOT a Prime Number`);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container max-w-md mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Prime Number Checker</CardTitle>
            <CardDescription>
              Check whether a number is prime or not.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex gap-2 mb-3">
              <Input 
                placeholder="Enter a number" 
                value={num}
                onChange={e => setNum(e.target.value.replace(/\D/, ""))}
                required min={0}
                type="number"
              />
              <Button type="submit">Check</Button>
            </form>
            {result && <div className="font-semibold mt-3">{result}</div>}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
