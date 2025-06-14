
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";
import { BarChart, XAxis, YAxis, Tooltip as ChartTooltip, CartesianGrid, Legend, ResponsiveContainer, Line, LineChart as ReLineChart } from "recharts";

const CustomerLifetimeValue = () => {
  const [avgPurchase, setAvgPurchase] = useState("");
  const [purchaseFreq, setPurchaseFreq] = useState("");
  const [customerLifespan, setCustomerLifespan] = useState("");
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
    const avg = parseFloat(avgPurchase);
    const freq = parseFloat(purchaseFreq);
    const lifespan = parseFloat(customerLifespan);

    if (isNaN(avg) || isNaN(freq) || isNaN(lifespan)) {
      setResult("Invalid input");
      setLatex("");
      setChartData([]);
      return;
    }

    const clv = avg * freq * lifespan;
    setResult(`$${clv.toLocaleString()}`);

    setLatex(
      `\\text{CLV} = \\text{Average Purchase Value} \\times \\text{Purchase Frequency} \\times \\text{Customer Lifespan} = ${avg} \\times ${freq} \\times ${lifespan} = ${clv}`
    );
    setLogs([
      `Average Purchase: $${avg}`,
      `Purchase Frequency: ${freq}`,
      `Customer Lifespan: ${lifespan}`,
      `CLV: $${clv}`,
    ]);

    // For the graph: show CLV growth over customer lifespan years
    setChartData(
      Array.from({ length: Math.ceil(lifespan) }, (_, i) => ({
        year: i + 1,
        CLV: +(avg * freq * (i + 1)).toFixed(2),
      }))
    );
  }

  const handleBatch = () => {
    const rows = batchInput.trim().split("\n");
    const results: string[] = [];
    rows.forEach((row, idx) => {
      const [avg, freq, lifespan] = row.split(",");
      const a = parseFloat(avg as string),
        f = parseFloat(freq as string),
        l = parseFloat(lifespan as string);
      if (!isNaN(a) && !isNaN(f) && !isNaN(l)) {
        const clv = a * f * l;
        results.push(`Row ${idx + 1}: CLV = $${clv}`);
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
            <CardTitle className="text-2xl">Customer Lifetime Value Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">
                  Average Purchase Value ($)
                  {renderTooltip("Average amount a customer spends per purchase")}
                </label>
                <Input value={avgPurchase} onChange={e => setAvgPurchase(e.target.value)} type="number" />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Purchase Frequency (per year)
                  {renderTooltip("How often a customer purchases per year")}
                </label>
                <Input value={purchaseFreq} onChange={e => setPurchaseFreq(e.target.value)} type="number" />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Customer Lifespan (years)
                  {renderTooltip("How many years the average customer remains active")}
                </label>
                <Input value={customerLifespan} onChange={e => setCustomerLifespan(e.target.value)} type="number" />
              </div>
              <Button onClick={calculate} className="w-full mt-2">Calculate</Button>
              <Button variant="outline" className="w-full mt-2" onClick={() => setShowAdvanced(a => !a)}>
                {showAdvanced ? "Hide Advanced" : "Show Advanced"}
              </Button>
              {result && (
                <div className="mt-4 p-3 rounded bg-gray-50 text-sm">
                  <strong>Customer Lifetime Value:</strong> {result}
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
                    Batch Calculation Input {renderTooltip("Paste: Avg Purchase,Purchase Freq,Customer Lifespan (CSV)")}
                  </label>
                  <textarea
                    className="w-full h-16 rounded border px-2 py-1 text-xs"
                    value={batchInput}
                    onChange={e => setBatchInput(e.target.value)}
                    placeholder="120,4,5"
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
                {chartData.length > 0 && (
                  <div className="mt-6 bg-background border rounded p-3">
                    <strong>CLV Over Customer Lifespan</strong>
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart data={chartData}>
                        <XAxis dataKey="year" label={{ value: "Year", position: "insideBottom", offset: -2 }} />
                        <YAxis label={{ value: "Cumulative CLV ($)", angle: -90, position: "insideLeft" }} />
                        <Legend />
                        <CartesianGrid strokeDasharray="3 3" />
                        <ChartTooltip />
                        <BarChart.Bar dataKey="CLV" fill="#4f46e5" />
                      </BarChart>
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

export default CustomerLifetimeValue;
