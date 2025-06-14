
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function calculateProbability(event: number, total: number) {
  if (total === 0) return 0;
  return (event / total) * 100;
}

export default function ProbabilityPage() {
  const [event, setEvent] = useState("");
  const [total, setTotal] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const eventNum = Number(event), totalNum = Number(total);
    if (event === "" || total === "" || totalNum === 0) {
      setResult("Please enter valid numbers (total > 0).");
      return;
    }
    const probability = calculateProbability(eventNum, totalNum);
    setResult(`Probability: ${probability.toFixed(2)}%`);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container max-w-lg mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Probability Calculator</CardTitle>
            <CardDescription>
              Calculate the probability of an event occurring.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex gap-2 mb-3">
              <Input
                placeholder="Number of Favorable Outcomes"
                value={event}
                onChange={e => setEvent(e.target.value)}
                required
                type="number"
              />
              <Input
                placeholder="Total Possible Outcomes"
                value={total}
                onChange={e => setTotal(e.target.value)}
                required
                type="number"
                min={1}
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
