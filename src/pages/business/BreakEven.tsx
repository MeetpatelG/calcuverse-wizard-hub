
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";

const EXAMPLE_BATCH = `100,5000,80\n"Units Sold","Fixed Cost","Unit Price"`;

const BreakEven = () => {
  // Inputs
  const [fixedCost, setFixedCost] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [unitCost, setUnitCost] = useState("");
  // Advanced & logs
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [batchInput, setBatchInput] = useState("");
  const [latex, setLatex] = useState("");
  const [result, setResult] = useState<string | null>(null);

  // Tooltip
  const renderTooltip = (text: string) => (
    <span className="inline-block align-middle ml-1" title={text}>
      <Info className="inline h-4 w-4 text-muted-foreground" />
    </span>
  );

  function calculate() {
    const fc = parseFloat(fixedCost);
    const up = parseFloat(unitPrice);
    const uc = parseFloat(unitCost);
    setLogs([
      `Fixed Cost: $${fc}`,
      `Unit Price: $${up}`,
      `Unit Cost: $${uc}`
    ]);
    if (isNaN(fc) || isNaN(up) || isNaN(uc) || (up - uc) === 0) {
      setResult("Invalid input");
      setLatex("");
      return;
    }
    const beUnits = fc / (up - uc);
    setResult(beUnits.toFixed(2));
    setLatex(`\\text{Break-even point} = \\frac{\\text{Fixed Cost}}{\\text{Unit Price} - \\text{Unit Cost}} = \\frac{${fc}}{${up} - ${uc}} = ${beUnits.toFixed(2)}`);
  }

  const handleBatch = () => {
    const rows = batchInput.trim().split("\n");
    const results: string[] = [];
    rows.forEach((row, idx) => {
      const [units, fc, up] = row.replace(/"/g, "").split(",");
      if (units && fc && up) {
        const be = parseFloat(fc) / (parseFloat(up) - (parseFloat(units)/parseFloat(fc)));
        results.push(`Row ${idx + 1}: Break-even = ${be.toFixed(2)}`);
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
            <CardTitle className="text-2xl">Break-even Point Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">
                  Fixed Cost ($) {renderTooltip("All fixed expenses that do not change with production")}
                </label>
                <Input value={fixedCost} onChange={e => setFixedCost(e.target.value)} type="number" />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Unit Price ($) {renderTooltip("Selling price per unit")}
                </label>
                <Input value={unitPrice} onChange={e => setUnitPrice(e.target.value)} type="number" />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Unit Cost ($) {renderTooltip("Cost incurred to produce one unit")}
                </label>
                <Input value={unitCost} onChange={e => setUnitCost(e.target.value)} type="number" />
              </div>
              <Button onClick={calculate} className="w-full mt-2">Calculate</Button>
              <Button variant="outline" className="w-full mt-2" onClick={() => setShowAdvanced(a => !a)}>
                {showAdvanced ? "Hide Advanced" : "Show Advanced"}
              </Button>
              {result && (
                <div className="mt-4 p-3 rounded bg-gray-50 text-sm">
                  <strong>Break-even Point:</strong> {result}
                  {latex && (
                    <div className="mt-3 bg-white border rounded p-3 overflow-x-auto">
                      <div>
                        <span className="font-mono text-xs text-muted-foreground">LaTeX Output:</span>
                        <pre className="text-base mt-1 overflow-x-auto">{latex}</pre>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            {showAdvanced && (
              <div className="mt-4 border-t pt-4">
                <div>
                  <label className="block text-sm font-medium">
                    Batch Calculation Input {renderTooltip("Paste multiple calculations. Format: Units Sold,Fixed Cost,Unit Price (CSV)")}
                  </label>
                  <textarea
                    className="w-full h-16 rounded border px-2 py-1 text-xs"
                    value={batchInput}
                    onChange={e => setBatchInput(e.target.value)}
                    placeholder={EXAMPLE_BATCH}
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

export default BreakEven;
