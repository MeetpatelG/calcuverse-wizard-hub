
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";

const EmployeeCost = () => {
  const [salary, setSalary] = useState("");
  const [taxes, setTaxes] = useState("");
  const [benefits, setBenefits] = useState("");
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
    const s = parseFloat(salary);
    const t = parseFloat(taxes);
    const b = parseFloat(benefits);
    if (isNaN(s) || isNaN(t) || isNaN(b)) {
      setResult("Invalid input");
      setLatex("");
      return;
    }
    const total = s + t + b;
    setResult(`Total Cost: $${total.toLocaleString()}`);
    setLatex(`\\text{Employee Cost} = \\text{Salary} + \\text{Taxes} + \\text{Benefits} = ${s} + ${t} + ${b} = ${total}`);
    setLogs([
      `Salary: $${s}`,
      `Taxes: $${t}`,
      `Benefits: $${b}`,
      `Total Cost: $${total}`
    ]);
  }

  const handleBatch = () => {
    const rows = batchInput.trim().split("\n");
    const results: string[] = [];
    rows.forEach((row, idx) => {
      const [salary, taxes, benefits] = row.split(",");
      const s = parseFloat(salary as string), t = parseFloat(taxes as string), b = parseFloat(benefits as string);
      if (!isNaN(s) && !isNaN(t) && !isNaN(b)) {
        const total = s + t + b;
        results.push(`Row ${idx + 1}: Employee Cost = $${total}`);
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
            <CardTitle className="text-2xl">Employee Cost Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">
                  Annual Salary ($){renderTooltip("Yearly salary paid to the employee")}
                </label>
                <Input value={salary} onChange={e => setSalary(e.target.value)} type="number" />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Taxes ($){renderTooltip("Annual employment-related taxes")}
                </label>
                <Input value={taxes} onChange={e => setTaxes(e.target.value)} type="number" />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Benefits ($){renderTooltip("Annual benefits cost (health, etc.)")}
                </label>
                <Input value={benefits} onChange={e => setBenefits(e.target.value)} type="number" />
              </div>
              <Button onClick={calculate} className="w-full mt-2">Calculate</Button>
              <Button variant="outline" className="w-full mt-2" onClick={() => setShowAdvanced(a => !a)}>
                {showAdvanced ? "Hide Advanced" : "Show Advanced"}
              </Button>
              {result && (
                <div className="mt-4 p-3 rounded bg-gray-50 text-sm">
                  <strong>Total:</strong> {result}
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
                    Batch Calculation Input {renderTooltip("Paste: Salary,Taxes,Benefits (CSV)")}
                  </label>
                  <textarea
                    className="w-full h-16 rounded border px-2 py-1 text-xs"
                    value={batchInput}
                    onChange={e => setBatchInput(e.target.value)}
                    placeholder="55000,12000,6800"
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

export default EmployeeCost;
