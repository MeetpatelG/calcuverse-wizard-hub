
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function solveQuadratic(a: number, b: number, c: number) {
  if (a === 0) {
    return { error: "Coefficient 'a' cannot be zero." };
  }
  const d = b * b - 4 * a * c;
  if (d < 0) {
    return { roots: [], message: "No real roots (discriminant < 0)" };
  }
  if (d === 0) {
    const root = -b / (2 * a);
    return { roots: [root], message: "One real root" };
  }
  const sqrtD = Math.sqrt(d);
  return { roots: [(-b + sqrtD) / (2 * a), (-b - sqrtD) / (2 * a)], message: "Two real roots" };
}

export default function QuadraticEquationPage() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [result, setResult] = useState<{ roots?: number[]; message?: string; error?: string } | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const aNum = Number(a), bNum = Number(b), cNum = Number(c);
    const res = solveQuadratic(aNum, bNum, cNum);
    setResult(res);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container max-w-lg mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Quadratic Equation Solver</CardTitle>
            <CardDescription>
              Solve equations of the form <b>ax² + bx + c = 0</b>.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex gap-2">
                <Input placeholder="a" value={a} onChange={e => setA(e.target.value)} required type="number" />
                <Input placeholder="b" value={b} onChange={e => setB(e.target.value)} required type="number" />
                <Input placeholder="c" value={c} onChange={e => setC(e.target.value)} required type="number" />
              </div>
              <Button type="submit">Solve</Button>
            </form>
            {result && (
              <div className="mt-4">
                {result.error && (
                  <div className="text-red-500">{result.error}</div>
                )}
                {result.message && <div>{result.message}</div>}
                {result.roots && result.roots.length > 0 && (
                  <div className="mt-2">
                    Roots: {result.roots.map((root, i) => (
                      <span key={i} className="font-mono">{root.toFixed(4)}{i === 0 && result.roots.length === 2 ? ", " : ""}</span>
                    ))}
                  </div>
                )}
                {result.roots && result.roots.length === 0 && <div>No real roots.</div>}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
