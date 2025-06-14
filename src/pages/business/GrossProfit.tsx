
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";
import { ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, Legend, Line } from "recharts";

const GrossProfit = () => {
  const [revenue, setRevenue] = useState("");
  const [cogs, setCogs] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [latex, setLatex] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [batchInput, setBatchInput] = useState("");
  const [chartData, setChartData] = useState<any[]>([]);

  const renderTooltip = (text: string) => (
    <span className="inline-block align-middle ml-1" title={text}>
      <Info className="inline h-4 w-4 text-muted-foreground" />
    </span>
  );

  function calculate() {
    const rev = parseFloat(revenue);
    const c = parseFloat(cogs);
    if (isNaN(rev) || isNaN(c)) {
      setResult("Invalid input");
      setLatex("");
      setChartData([]);
      return;
    }
    const profit = rev - c;
    setResult(`$${profit.toLocaleString()}`);
    setLatex(
      `\\text{Gross Profit} = \\text{Revenue} - \\text{COGS} = ${rev} - ${c} = ${profit}`
    );
    setLogs([
      `Revenue: $${rev}`,
      `COGS: $${c}`,
      `Gross Profit: $${profit}`,
    ]);
    setChartData([
      { name: "Revenue", value: rev },
      { name: "COGS", value: c },
      { name: "Gross Profit", value: profit }
    ]);
  }

  const handleBatch = () => {
    const rows = batchInput.trim().split("\n");
    const results: string[] = [];
    rows.forEach((row, idx) => {
      const [revenue, cogs] = row.split(",");
      const r = parseFloat(revenue as string),
        c = parseFloat(cogs as string);
      if (!isNaN(r) && !isNaN(c)) {
        const profit = r - c;
        results.push(`Row ${idx + 1}: Gross Profit = $${profit}`);
      }
    });
    setLogs(results);
    setResult("Batch processed — see logs");
    setChartData([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 pt-8 pb-12">
        <Card className="max-w-xl mx-auto animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl">Gross Profit Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">
                  Revenue ($)
                  {renderTooltip("Total sales/revenue for the period")}
                </label>
                <Input value={revenue} onChange={e => setRevenue(e.target.value)} type="number" />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Cost of Goods Sold (COGS) ($)
                  {renderTooltip("Direct costs of producing goods or services sold")}
                </label>
                <Input value={cogs} onChange={e => setCogs(e.target.value)} type="number" />
              </div>
              <Button onClick={calculate} className="w-full mt-2">Calculate</Button>
              <Button variant="outline" className="w-full mt-2" onClick={() => setShowAdvanced(a => !a)}>
                {showAdvanced ? "Hide Advanced" : "Show Advanced"}
              </Button>
              {result && (
                <div className="mt-4 p-3 rounded bg-gray-50 text-sm">
                  <strong>Gross Profit:</strong> {result}
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
                    Batch Calculation Input {renderTooltip("Paste: Revenue,COGS (CSV)")}
                  </label>
                  <textarea
                    className="w-full h-16 rounded border px-2 py-1 text-xs"
                    value={batchInput}
                    onChange={e => setBatchInput(e.target.value)}
                    placeholder="350000,204740"
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
                {chartData.length === 3 && (
                  <div className="mt-6 bg-background border rounded p-3">
                    <strong>Profit Breakdown</strong>
                    <ResponsiveContainer width="100%" height={220}>
                      <LineChart data={chartData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Legend />
                        <ChartTooltip />
                        <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default GrossProfit;
