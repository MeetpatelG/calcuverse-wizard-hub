
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";

const ROI = () => {
  const [gain, setGain] = useState("");
  const [cost, setCost] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [latex, setLatex] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [batchInput, setBatchInput] = useState("");

  const renderTooltip = (text: string) => (
    <span className="inline-block align-middle ml-1" title={text}>
      <Info className="inline h-4 w-4 text-muted-foreground" />
    </span>
  );

  function calculate() {
    const g = parseFloat(gain);
    const c = parseFloat(cost);
    if (isNaN(g) || isNaN(c) || c === 0) {
      setResult("Invalid input");
      setLatex("");
      return;
    }
    const roi = ((g - c) / c) * 100;
    setResult(`${roi.toFixed(2)}%`);
    setLatex(`\\text{ROI} = \\frac{\\text{Gain} - \\text{Cost}}{\\text{Cost}} \\times 100 = \\frac{${g} - ${c}}{${c}} \\times 100 = ${roi.toFixed(2)}\\%`);
    setLogs([
      `Gain: $${g}`,
      `Cost: $${c}`,
      `ROI: ${roi.toFixed(2)}%`
    ]);
  }

  const handleBatch = () => {
    const rows = batchInput.trim().split("\n");
    const results: string[] = [];
    rows.forEach((row, idx) => {
      const [gain, cost] = row.split(",");
      const g = parseFloat(gain as string), c = parseFloat(cost as string);
      if (!isNaN(g) && !isNaN(c) && c !== 0) {
        const roi = ((g - c) / c) * 100;
        results.push(`Row ${idx + 1}: ROI = ${roi.toFixed(2)}%`);
      }
    });
    setLogs(results);
    setResult("Batch processed — see logs");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 pt-8 pb-12">
        <Card className="max-w-xl mx-auto animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl">ROI Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">
                  Gain from Investment ($){renderTooltip("Total return or gain from investment")}
                </label>
                <Input value={gain} onChange={e => setGain(e.target.value)} type="number" />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Cost of Investment ($){renderTooltip("Total invested cost for the business")}
                </label>
                <Input value={cost} onChange={e => setCost(e.target.value)} type="number" />
              </div>
              <Button onClick={calculate} className="w-full mt-2">Calculate</Button>
              <Button variant="outline" className="w-full mt-2" onClick={() => setShowAdvanced(a => !a)}>
                {showAdvanced ? "Hide Advanced" : "Show Advanced"}
              </Button>
              {result && (
                <div className="mt-4 p-3 rounded bg-gray-50 text-sm">
                  <strong>ROI:</strong> {result}
                  {latex && (
                    <div className="mt-3 bg-white border rounded p-3 overflow-x-auto">
                      <span className="font-mono text-xs text-muted-foreground">LaTeX Output:</span>
                      <pre className="text-base mt-1 overflow-x-auto">{latex}</pre>
                    </div>
                  )}
                </div>
              )}
            </div>
            {showAdvanced && (
              <div className="mt-4 border-t pt-4">
                <div>
                  <label className="block text-sm font-medium">
                    Batch Calculation Input {renderTooltip("Paste multiple rows. Format: Gain,Cost (CSV)")}
                  </label>
                  <textarea
                    className="w-full h-16 rounded border px-2 py-1 text-xs"
                    value={batchInput}
                    onChange={e => setBatchInput(e.target.value)}
                    placeholder="10000,4000"
                  />
                  <Button size="sm" className="mt-1" onClick={handleBatch}>Process Batch</Button>
                </div>
                <div className="mt-3">
                  <strong>Calculation Log:</strong>
                  <ul className="list-disc list-inside text-xs mt-1 text-muted-foreground">
                    {logs.map((log, i) => <li key={i}>{log}</li>)}
                  </ul>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(latex || "")}>Copy LaTeX</Button>
                  <Button size="sm" variant="outline" onClick={() => window.print()}>Export PDF</Button>
                  <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(logs.join("\n"))}>Export CSV</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default ROI;
