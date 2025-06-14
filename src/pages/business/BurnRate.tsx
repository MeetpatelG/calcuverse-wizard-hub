
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";

const BurnRate = () => {
  const [startBalance, setStartBalance] = useState("");
  const [endBalance, setEndBalance] = useState("");
  const [months, setMonths] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [latex, setLatex] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [batchInput, setBatchInput] = useState("");

  const renderTooltip = (text: string) => (
    <span className="inline-block align-middle ml-1" title={text}>
      <Info className="inline h-4 w-4 text-muted-foreground" />
    </span>
  );

  function calculate() {
    const s = parseFloat(startBalance);
    const e = parseFloat(endBalance);
    const m = parseInt(months);
    if (isNaN(s) || isNaN(e) || isNaN(m) || m <= 0) {
      setResult("Invalid input");
      setLatex("");
      return;
    }
    const burnRate = (s - e) / m;
    const runway = e / burnRate;
    setResult(`Burn Rate: $${burnRate.toFixed(2)}/month, Runway: ${runway.toFixed(1)} months`);
    setLatex(`\\text{Burn Rate} = \\frac{\\text{Start Balance} - \\text{End Balance}}{\\text{Months}} = \\frac{${s} - ${e}}{${m}} = ${burnRate.toFixed(2)} \\\\ \\text{Runway} = \\frac{\\text{End Balance}}{\\text{Burn Rate}} = \\frac{${e}}{${burnRate.toFixed(2)}} = ${runway.toFixed(1)}`);
    setLogs([`Start Balance: $${s}`, `End Balance: $${e}`, `Burn Rate: $${burnRate.toFixed(2)}/mo`, `Runway: ${runway.toFixed(1)} mo`]);
  }

  const handleBatch = () => {
    const rows = batchInput.trim().split("\n");
    const results: string[] = [];
    rows.forEach((row, idx) => {
      const [start, end, m] = row.split(",");
      const s = parseFloat(start as string), e = parseFloat(end as string), months = parseInt(m as string);
      if (!isNaN(s) && !isNaN(e) && !isNaN(months) && months > 0) {
        const br = (s - e) / months;
        const rw = e / br;
        results.push(`Row ${idx + 1}: Burn Rate = $${br.toFixed(2)}/mo, Runway = ${rw.toFixed(1)} mo`);
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
            <CardTitle className="text-2xl">Startup Burn Rate Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">
                  Start Balance ($){renderTooltip("Initial cash reserve")}
                </label>
                <Input value={startBalance} onChange={e => setStartBalance(e.target.value)} type="number" />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  End Balance ($){renderTooltip("Cash left after spending")}
                </label>
                <Input value={endBalance} onChange={e => setEndBalance(e.target.value)} type="number" />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Period (months){renderTooltip("Number of months elapsed")}
                </label>
                <Input value={months} onChange={e => setMonths(e.target.value)} type="number" />
              </div>
              <Button onClick={calculate} className="w-full mt-2">Calculate</Button>
              <Button variant="outline" className="w-full mt-2" onClick={() => setShowAdvanced(a => !a)}>
                {showAdvanced ? "Hide Advanced" : "Show Advanced"}
              </Button>
              {result && (
                <div className="mt-4 p-3 rounded bg-gray-50 text-sm">
                  <strong>Result:</strong> {result}
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
                    Batch Calculation Input {renderTooltip("Paste rows: Start Balance,End Balance,Months (CSV)")}
                  </label>
                  <textarea
                    className="w-full h-16 rounded border px-2 py-1 text-xs"
                    value={batchInput}
                    onChange={e => setBatchInput(e.target.value)}
                    placeholder="25000,15000,6"
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

export default BurnRate;
