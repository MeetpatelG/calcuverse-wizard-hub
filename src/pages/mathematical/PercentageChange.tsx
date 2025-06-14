
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function calculatePercentageChange(from: number, to: number) {
  if (from === 0) return "Cannot calculate change from 0.";
  const change = ((to - from) / Math.abs(from)) * 100;
  return change.toFixed(2);
}

export default function PercentageChangePage() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const from = Number(start), to = Number(end);
    if (start === "" || end === "") return;
    const change = calculatePercentageChange(from, to);
    setResult(typeof change === "string" ? change : `Change: ${change}%`);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container max-w-lg mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Percentage Increase/Decrease Calculator</CardTitle>
            <CardDescription>
              Calculate percentage change between two values.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex gap-2 mb-3">
              <Input
                placeholder="Initial Value"
                value={start}
                onChange={e => setStart(e.target.value)}
                required
                type="number"
              />
              <Input
                placeholder="Final Value"
                value={end}
                onChange={e => setEnd(e.target.value)}
                required
                type="number"
              />
              <Button type="submit">Calculate</Button>
            </form>
            {result && <div className="mt-3">{result}</div>}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
